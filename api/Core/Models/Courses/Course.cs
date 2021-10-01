using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Models.Courses
{
  public class Course
  {
    public Course(string id, string name, string student)
    {
      Id = id;
      Name = name;
      StudentId = student;
    }
    public Course()
    {
    }

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("name")] public string Name { get; set; }

    [BsonElement("studentId")] public string StudentId { get; set; }

    [BsonElement("teacherName")] public string TeacherName { get; set; }

    [BsonElement("schedules")] public IList<string> Schedules { get; set; }

    public override string ToString()
    {
      return $"{Id}: {Name} - {StudentId}, {TeacherName}. {Schedules.ToString()}";
    }
  }
}
