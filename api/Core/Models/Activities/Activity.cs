namespace Api.Core.Models.Activities
{
  using System.Collections.Generic;
  using MongoDB.Bson;
  using MongoDB.Bson.Serialization.Attributes;
  public class Activity
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("activityId")]
    public string ActivityId { get; set; }

    [BsonElement("courseId")]
    public string CourseId { get; set; }

    //TODO: Delete this field when the teacher's module is integrated. With just the activityId should be enough to consult and bring the Clinic case.
    [BsonElement("clinicCase")]
    public string ClinicCase { get; set; }

    [BsonElement("studentId")]
    public string StudentId { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("publishDate")]
    public string PublishDate { get; set; }


    [BsonElement("deadline")]
    public string Deadline { get; set; }

    [BsonElement("dateSent")]
    public string DateSent { get; set; }

    [BsonElement("status")]
    public string Status { get; set; }

    [BsonElement("timer")]
    public float Timer { get; set; } = 0;


    [BsonElement("difficultyLevel")]
    public string DifficultyLevel { get; set; }


    [BsonElement("sections")]
    public IList<string> Sections { get; set; }

    public Activity(string id)
    {
      this.Id = id;
    }

    public Activity()
    {
    }

    public override string ToString()
    {
      return $"{Id}: {Name} - {Status} - {DifficultyLevel} - {Sections}";
    }
  }
}
