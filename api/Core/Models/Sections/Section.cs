using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Api.Core.Models.Fields;
using System.Collections.Generic;

namespace Api.Core.Models.Sections
{
  public class Section
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get;  set; }

    [BsonElement("code")]
    public string Code { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }

    public Section()
    {
    }

    public Section(string id)
    {
      Id = id;
    }

    public NaSection ConvertToNaSection()
    {
      return new (this.Id)
      {
        Name = this.Name,
        Description = this.Description,
        Code = this.Code,
        Fields = new List<NaField>(),
        Comment = ""
      };
    }
  }
}
