using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Api.Core.Models.Announcements;
using Api.Core.Models.Activities;
using Core.Models.Courses;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Api.Infrastructure.TeacherApp
{
  public class TeacherEndpointsController : ControllerBase
  {
    private const string BaseUrl1 = "https://demo4903601.mockable.io/";
    private const string BaseUrl2 = "http://demo6450917.mockable.io/";

    public async Task<ActionResult<List<Activity>>> GetActivitiesByCourse(string courseId)
    {
      var client = new HttpClient
      {
        //service base url
        BaseAddress = new Uri(BaseUrl1)
      };

      client.DefaultRequestHeaders.Clear();
      //Define request data format
      client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

      //Sending request to find web api REST service resource getActivitiesByCourse using HttpClient
      var response = await client.GetAsync("courses/1/activities");

      if (!response.IsSuccessStatusCode) return NotFound();
      //Storing the response details received from web api
      var activitiesResult = response.Content.ReadAsStringAsync().Result;

      //Deserializing the response received from web api and storing into the activities list
      var activities = JsonConvert.DeserializeObject<List<Activity>>(activitiesResult);

      if (activities == null) return Ok();

      //Delete the results that have STATUS not wanted to show
      for (var index = 0; index < activities.Count; index++)
        if (activities[index].Status == "Calificada")
          activities.RemoveAt(index);

      return Ok(activities);
    }

    public async Task<ActionResult<List<Announcement>>> GetAnnouncementsByCourse(string courseId)
    {
      var client = new HttpClient
      {
        //service base url
        BaseAddress = new Uri(BaseUrl2)
      };

      client.DefaultRequestHeaders.Clear();
      //Define request data format
      client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

      //Sending request to find web api REST service resource getActivitiesByCourse using HttpClient
      var response = await client.GetAsync($"courses/{courseId}/announcements");

      if (!response.IsSuccessStatusCode) return NotFound();
      //Storing the response details received from web api
      var annResult = response.Content.ReadAsStringAsync().Result;

      //Deserializing the response received from web api and storing into the activities list
      var announcements = JsonConvert.DeserializeObject<List<Announcement>>(annResult);

      if (announcements == null) return Ok();

      //Order from most recent to less recent
      var announcementsSort = announcements.OrderByDescending(i => DateTime.ParseExact(i.PublishDate, "dd-MM-yyyy", null)).ToList();

      return Ok(announcementsSort);
    }
    public async Task<ActionResult<List<Course>>> GetCoursesByStudent(string studentId)
    {
      var client = new HttpClient
      {
        //service base url
        BaseAddress = new Uri(BaseUrl2)
      };

      client.DefaultRequestHeaders.Clear();
      //Define request data format
      client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

      //Sending request to find web api REST service resource getCoursesbyStudent using HttpClient
      var response = await client.GetAsync("courses/students/23");

      if (!response.IsSuccessStatusCode) return NotFound();
      //Storing the response details received from web api
      var courseResult = response.Content.ReadAsStringAsync().Result;

      //Deserializing the response received from web api and storing into the courses list
      var courses = JsonConvert.DeserializeObject<List<Course>>(courseResult);

      if (courses == null) return Ok();

      return Ok(courses);
    }
  }
}
