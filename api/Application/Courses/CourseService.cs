using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models.Announcements;
using Api.Infrastructure.TeacherApp;
using Core.Models.Courses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Application.Courses
{
  public class CourseService : ICourseService
  {
    private readonly TeacherEndpointsController _controller;
    private readonly ILogger<CourseService> _logger;

    public CourseService(TeacherEndpointsController controller, ILogger<CourseService> logger)
    {
      _controller = controller;
      _logger = logger;
      _logger.LogInformation("Course Service was created");
    }

    public async Task<IEnumerable<Course>> GetCoursesByStudent(string studentId)
    {
      var response = (ObjectResult) (await _controller.GetCoursesByStudent(studentId)).Result;
      if (!response.StatusCode.Equals(200)) throw new Exception("An error has occured while fetching the courses");

      var courses = (List<Course>) response.Value;
      return courses;
    }
  }
}
