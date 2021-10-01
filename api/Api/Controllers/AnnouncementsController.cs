using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Application.Announcements;
using Api.Core.Models.Announcements;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{
  [ApiController]
  [Route("api/v1/announcements")]
  public class AnnouncementsController : ControllerBase
  {
    private readonly ILogger<AnnouncementsController> _logger;

    private readonly IAnnouncementService _service;

    public AnnouncementsController(ILogger<AnnouncementsController> logger, IAnnouncementService service)
    {
      _logger = logger;
      _service = service;
      _logger.LogInformation("Announcements Controller was created!");
    }

    [HttpGet("courses/{courseId}")]
    public async Task<ActionResult> GetAnnouncementsByCourse(string courseId)
    {
      var announcements = await _service.GetAnnouncementsByCourse(courseId);
      return Ok(announcements);
    }
  }
}
