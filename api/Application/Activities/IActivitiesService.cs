using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models.Activities;
using Api.Core.Models.Dtos;


namespace Api.Application.Activities
{
  public interface IActivitiesService
  {
    Task<IEnumerable<Activity>> GetActivitiesByCourse(string courseId);
    Task<IEnumerable<Activity>> GetActivitiesByStudentAndCourse(string studentId, string courseId);
    Task<IEnumerable<Activity>> GetCompletedActivitiesByStudentAndCourse(string studentId, string courseId);
    Task<Activity> CreateActivity(Activity activity);
    Task<FormDto> LoadForm(string id);
    Task<ActivityTimerDto> EndActivity(string id, EndActivity data, float timer);
    Task UpdateNextStatus(string id);
    Task UpdateDateSent(string id);
    Task UpdateTimer(Activity activity);
    Task<FormDto> GetFormByActivity(Activity activity);

  }
}
