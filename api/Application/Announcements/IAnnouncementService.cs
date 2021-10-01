using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models.Announcements;

namespace Api.Application.Announcements
{
  public interface IAnnouncementService
  {
    Task<IEnumerable<Announcement>> GetAnnouncementsByCourse(string courseId);
  }
}
