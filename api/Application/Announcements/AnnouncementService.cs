using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.Core.Models.Announcements;
using Api.Infrastructure.TeacherApp;
using DnsClient.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Api.Application.Announcements
{
  public class AnnouncementService : IAnnouncementService
  {
    private readonly TeacherEndpointsController _controller;
    private readonly ILogger<AnnouncementService> _logger;

    public AnnouncementService(TeacherEndpointsController controller, ILogger<AnnouncementService> logger)
    {
      _controller = controller;
      _logger = logger;
      _logger.LogInformation("Announcement Service was created");
    }

    public async Task<IEnumerable<Announcement>> GetAnnouncementsByCourse(string courseId)
    {
      var response = (ObjectResult) (await _controller.GetAnnouncementsByCourse(courseId)).Result;
      if (!response.StatusCode.Equals(200)) throw new Exception("An error has occured while fetching the announcements");

      var announcements = (List<Announcement>) response.Value;
      return announcements;
    }
  }
}
