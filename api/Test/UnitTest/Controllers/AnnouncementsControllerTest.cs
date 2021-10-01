using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Api.Application.Announcements;
using Api.Controllers;
using Api.Core.Models.Announcements;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace Test.UnitTest.Controllers
{
  public class AnnouncementsControllerTest
  {
    private readonly AnnouncementsController _controller;
    private readonly Mock<IAnnouncementService> _getAnnouncementsListMock;

    public AnnouncementsControllerTest()
    {
      _getAnnouncementsListMock = new Mock<IAnnouncementService>();
      _controller = new AnnouncementsController(Mock.Of<ILogger<AnnouncementsController>>(), _getAnnouncementsListMock.Object);
    }

    [Fact]
    public async Task GetAnnouncementsByCourse()
    {
      const string courseId = "1";
      var announcementResponse = new Announcement("122334", "Anuncio 1", "", "25-02-2020");

      List<Announcement> announcements = new() {announcementResponse};

      _getAnnouncementsListMock.Setup(a => a.GetAnnouncementsByCourse(courseId)).ReturnsAsync(announcements);

      var result = (ObjectResult) await _controller.GetAnnouncementsByCourse(courseId);
      var announcementsList = (List<Announcement>) result.Value;

      Assert.NotNull(result);
      Assert.Equal((int) HttpStatusCode.OK, result.StatusCode);
      Assert.True(announcements.All(aExpected => announcementsList
        .Any(aResponse => aExpected.Name == aResponse.Name)));

      _getAnnouncementsListMock.Verify(a => a.GetAnnouncementsByCourse(courseId), Times.Once);
    }
  }
}
