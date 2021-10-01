using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Core.Models.Activities;
using Api.Core.Exceptions;
using Api.Core.Models.Dtos;
using Api.Infrastructure.Persistence.Activities;
using Api.Infrastructure.TeacherApp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Api.Application.Forms;
using Api.Infrastructure.Mail;

namespace Api.Application.Activities
{
  public class ActivitiesService : IActivitiesService
  {
    private readonly TeacherEndpointsController _repositoryController;
    private readonly MailController _mailController;
    private readonly IActivitiesRepository _repositoryActivities;
    private readonly IFormsService _formsService;
    private readonly ILogger<ActivitiesService> _logger;
    private readonly Dictionary<string, string> _nextStatusDict = new ()
    {
      { "Nueva", "En progreso" }, { "En progreso", "Finalizada" }, { "Finalizada", "Calificada" }
    };

    public ActivitiesService(
      TeacherEndpointsController repositoryController,
      MailController mailController,
      IActivitiesRepository repositoryActivities,
      ILogger<ActivitiesService> logger,
      IFormsService formsService)
    {
      _repositoryController = repositoryController;
      _mailController = mailController;
      _repositoryActivities = repositoryActivities;
      _formsService = formsService;
      _logger = logger;
      _logger.LogInformation("Activities Service was created");
    }

    public async Task<IEnumerable<Activity>> GetActivitiesByCourse(string courseId)
    {
      var response = (ObjectResult) (await _repositoryController.GetActivitiesByCourse(courseId)).Result;
      if (!response.StatusCode.Equals(200)) return new List<Activity>();

      var result = (List<Activity>) response.Value;
      return result;
    }

    public async Task<IEnumerable<Activity>> GetActivitiesByStudentAndCourse(string studentId, string courseId)
    {
      var activities = (await _repositoryActivities.GetActivitiesByStudentAndCourse(studentId, courseId)).ToList();
      // Delete the results that have status not wanted to show
      if (activities != null && activities.Count > 0 && !activities.Any(a => a == null))
      {
        foreach (var act in activities.ToList())
        {
          if (act.Status == "Calificada" || act.Status == "Finalizada" || DateTime.ParseExact(act.PublishDate, "dd-MM-yyyy", null) > DateTime.Now || DateTime.ParseExact(act.Deadline, "dd-MM-yyyy", null) < DateTime.Now)
          {
            activities.Remove(act);
          }
        }
        activities = activities.OrderBy(i => DateTime.ParseExact(i.Deadline, "dd-MM-yyyy", null)).ToList();
      }
      return activities;
    }

    public async Task<IEnumerable<Activity>> GetCompletedActivitiesByStudentAndCourse(string studentId, string courseId)
    {
      var activities = (await _repositoryActivities.GetActivitiesByStudentAndCourse(studentId, courseId)).ToList();
      if (activities != null && activities.Count > 0 && !activities.Any(a => a == null))
      {
        // Delete the results that have STATUS not wanted to show
        foreach (Activity act in activities.ToList())
        {
          if (act.Status == "Nueva" || act.Status == "En progreso")
            activities.Remove(act);
        }
        activities = activities.OrderBy(i => i.Status).ThenByDescending(i => DateTime.ParseExact(i.DateSent, "dd-MM-yyyy", null)).ToList();
      }
      return activities;
    }

    public async Task<Activity> CreateActivity(Activity activity)
    {
      //Because the activity is new, has to have the some data by default.
      activity.Status = "Nueva";
      activity.DateSent = "";
      activity.Timer = 0;

      if (await _repositoryActivities.GetActivityByActivityIdAndStudent(activity.ActivityId, activity.StudentId) != null)
      {
        throw new AlreadyExistsException($"Activity with activity Id {activity.ActivityId} already exists");
      }
      var activityCreated = await _repositoryActivities.CreateActivity(activity);
      return activityCreated;
    }

    public async Task<FormDto> LoadForm(string id)
    {
      Activity prevActivity = await _repositoryActivities.GetActivityById(id);
      if (prevActivity == null)
      {
        throw new NotFoundException($"Activity with id {id} was not found");
      }
      FormDto form;
      if (prevActivity.Status ==  "Nueva")
      {
        form = await _formsService.GenerateForm(prevActivity);
        if (form == null)
        {
          throw new NotFoundException($"Could not generate form");
        }
        await UpdateNextStatus(id);
        return form;
      }
      if (prevActivity.Status == "En progreso" || prevActivity.Status == "Calificada")
      {
        return await GetFormByActivity(prevActivity);
      }
      throw new NotFoundException($"Activity is already delivered");
    }

    public async Task<FormDto> GetFormByActivity(Activity activity)
    {
      FormDto form = await _formsService.GetFormByActivity(activity);
      if (form == null)
      {
        throw new NotFoundException($"Could not load form");
      }
      return form;
    }

    public async Task<ActivityTimerDto> EndActivity(string id, EndActivity data, float timer)
    {
      Activity activity = await _repositoryActivities.GetActivityById(id);
      if (activity == null || String.IsNullOrEmpty(data.Email))
      {
        throw new NotFoundException("¡Ha ocurrido un error enviado la actividad! Por favor, inténtelo de nuevo.");
      }
      var response = _mailController.SendEmailConfirmation(data, activity.Name) as StatusCodeResult;
      await UpdateNextStatus(id);
      await UpdateDateSent(id);
      await _repositoryActivities.UpdateTimer(id, activity.Timer + timer);
      ActivityTimerDto dto = new ()
      {
        Id = activity.Id,
        Timer = activity.Timer + timer,
      };
      return dto;
    }

    public async Task UpdateNextStatus(string id)
    {
      Activity activity = await _repositoryActivities.GetActivityById(id);
      if (activity == null)
      {
        throw new NotFoundException($"Activity with id {id} was not found");
      }
      if (activity.Status == "Calificada")
      {
        throw new Exception($"Activity is already rated");
      }
      string nextStatus = _nextStatusDict[activity.Status];
      await _repositoryActivities.UpdateStatus(id, nextStatus);
    }

    public async Task UpdateDateSent(string id)
    {
      Activity activity = await _repositoryActivities.GetActivityById(id);
      if (activity == null) throw new NotFoundException($"Activity with id {id} not found");

      string currentDate = DateTime.Now.ToString("dd'-'MM'-'yyyy");
      await _repositoryActivities.UpdateDateSent(id, currentDate);
    }

    public async Task UpdateTimer(Activity activity)
    {
      float timer = activity.Timer + activity.Timer;
      await _repositoryActivities.UpdateTimer(activity.Id, timer);
    }
  }
}
