using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.Core.Models.Activities;

namespace Api.Infrastructure.Persistence.Activities
{
  public interface IActivitiesRepository
  {
    Task<IEnumerable<Activity>> GetActivitiesByStudentAndCourse(string id, string courseId);
    Task<Activity> GetActivityByActivityIdAndStudent(string activityId, string studentId);
    Task<Activity> GetActivityById(string id);
    Task<Activity> CreateActivity(Activity activity);
    Task UpdateStatus(string id, string status);
    Task UpdateDateSent(string id, string dateSent);
    Task UpdateTimer(string id, float timer);
  }
}
