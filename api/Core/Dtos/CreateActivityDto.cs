namespace Api.Core.Models.Dtos
{
  using System.Collections.Generic;

  public class CreateActivityDto
  {
    public string Name { get; set; }

    public string ActivityId { get; set; }

    public string CourseId { get; set; }

    //TODO: Delete this field when the teacher's module is integrated. With just the activityId should be enough to consult and bring the Clinic case.
    public string ClinicCase { get; set; }

    public string StudentId { get; set; }

    public string Description { get; set; }

    public string PublishDate { get; set; }

    public string Deadline { get; set; }

    public string DifficultyLevel { get; set; }

    public IList<string> Sections { get; set; }
  }
}
