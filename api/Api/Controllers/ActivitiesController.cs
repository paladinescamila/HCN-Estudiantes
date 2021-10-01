using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Api.Application.Activities;
using Api.Core.Models.Activities;
using Api.Core.Models.Dtos;
using Api.Core.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{
  [ApiController]
  [Route("api/v1/activities/")]
  public class ActivitiesController : ControllerBase
  {
    private readonly ILogger<ActivitiesController> _logger;

    private readonly IActivitiesService _service;

    private readonly IMapper _mapper;

    public ActivitiesController(
      ILogger<ActivitiesController> logger,
      IActivitiesService service,
      IMapper mapper)
    {
      _logger = logger;
      _service = service;
      _mapper = mapper;
      _logger.LogInformation("Activities Controller was created!");
    }

    [HttpGet("courses/{courseId}")]
    public async Task<ActionResult> GetActivitiesByCourse(string courseId)
    {
      var activities = await _service.GetActivitiesByCourse(courseId);
      if (activities == null) return NoContent();
      return Ok(activities);
    }

    [HttpGet("students/{studentId}/courses/{courseId}")]
    public async Task<ActionResult> GetActivitiesByStudentAndCourse(string studentId, string courseId)
    {
      var response = await _service.GetActivitiesByStudentAndCourse(studentId, courseId);
      if (response == null) return NoContent();
      return Ok(response);
    }

    [HttpGet("students/{studentId}/courses/{courseId}/completed")]
    public async Task<ActionResult> GetCompletedActivitiesByStudentAndCourse(string studentId, string courseId)
    {
      try{
        var response = await _service.GetCompletedActivitiesByStudentAndCourse(studentId, courseId);
        if (response == null) return NoContent();
        return Ok(response);
      }catch(Exception ex)
      {
        return Conflict(ex.ToString());
      }

    }

    [HttpGet("{id}/form")]
    public async Task<ActionResult> CreateOrUpdateForm(string id)
    {
      FormDto dto = await _service.LoadForm(id);
      return Ok(dto);
    }

    [HttpPost("{id}/end")]
    public async Task<ActionResult> EndActivity(string id, EndActivityDto dto)
    {
      ActivityTimerDto timerDto = await _service.EndActivity(id, dto.EndActivity, dto.Timer);
      return Ok(timerDto);
    }

    [HttpPut("{id}/next-status")]
    public async Task<ActionResult> UpdateNextStatus(string id)
    {
      await _service.UpdateNextStatus(id);
      return Ok();
    }

    [HttpPut("{id}/timer")]
    public async Task<ActionResult> UpdateTimer(ActivityTimerDto dto)
    {
      Activity activity = _mapper.Map<Activity>(dto);
      await _service.UpdateTimer(activity);
      return Ok();
    }

    [HttpPost]
    public async Task<ActionResult> CreateActivity(CreateActivityDto dto)
    {
      Activity activity = _mapper.Map<Activity>(dto);
      var createdActivity = await _service.CreateActivity(activity);
      return new ObjectResult(createdActivity) { StatusCode = 201 };
    }
  }
}
