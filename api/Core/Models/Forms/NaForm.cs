namespace Api.Core.Models.Forms
{
  using Api.Core.Models.Fields;
  using Api.Core.Models.Sections;
  using MongoDB.Bson;
  using MongoDB.Bson.Serialization.Attributes;
  using System.Collections.Generic;

  public class NaForm
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }


    [BsonElement("activityId")]
    public string ActivityId { get; set; }


    [BsonElement("studentId")]
    public string StudentId { get; set; }

    [BsonElement("sections")]
    public IList<NaSection> Sections { get; set;}

    public NaForm()
    {
    }

    public NaForm(string id)
    {
      Id = id;
    }
  }
}
