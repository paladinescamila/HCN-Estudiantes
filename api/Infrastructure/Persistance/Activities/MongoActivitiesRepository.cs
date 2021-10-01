using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Infrastructure.Config;
using Api.Core.Models.Activities;

using MongoDB.Driver;

namespace Api.Infrastructure.Persistence.Activities
{
  public class MongoActivitiesRepository : IActivitiesRepository
  {
    private readonly IMongoCollection<Activity> _activities;

    public MongoActivitiesRepository(MongoConnection connection)
    {
      _activities = connection.GetCollection<Activity>("activities");
    }

    public async Task<Activity> GetActivityById(string id)
    {
      return await _activities.Find(activity => activity.Id == id).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Activity>> GetActivitiesByStudentAndCourse(string id, string courseId)
    {
      return await _activities.Find(activity => activity.StudentId == id && activity.CourseId == courseId).ToListAsync();
    }

    public async Task<Activity> GetActivityByActivityIdAndStudent(string activityId, string studentId)
    {
      return await _activities.Find(activity => activity.ActivityId == activityId && activity.StudentId == studentId).FirstOrDefaultAsync();
    }

    public async Task<Activity> CreateActivity(Activity activity)
    {
      await _activities.InsertOneAsync(activity);
      return activity;
    }

    public async Task UpdateStatus(string id, string status)
    {
      var update = Builders<Activity>.Update.Set(activity => activity.Status, status);
      await _activities.UpdateOneAsync(activity => activity.Id == id, update);
    }

    public async Task UpdateDateSent(string id, string dateSent)
    {
      var update = Builders<Activity>.Update.Set(activity => activity.DateSent, dateSent);
      await _activities.UpdateOneAsync(activity => activity.Id == id, update);
    }

    public async Task UpdateTimer(string id, float timer)
    {
      var update = Builders<Activity>.Update.Set(activity => activity.Timer, timer);
      await _activities.UpdateOneAsync(activity => activity.Id == id, update);
    }
  }
}
