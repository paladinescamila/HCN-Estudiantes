using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Application.Aids;
using Api.Core.Models.Aids;
using Application.Courses;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{
  [ApiController]
  [Route("api/v1/courses")]
  public class CoursesController : ControllerBase
  {
  private readonly ILogger<CoursesController> _logger;

  private readonly ICourseService _service;

  public CoursesController(ILogger<CoursesController> logger, ICourseService service)
  {
  _logger = logger;
  _service = service;
  _logger.LogInformation("Courses Controller was created!");
  }

  [HttpGet("students/{studentId}")]
  public async Task<ActionResult> GetCourseByStudent(string studentId)
  {
    var courses = await _service.GetCoursesByStudent(studentId);
    return Ok(courses);
  }
}
}
