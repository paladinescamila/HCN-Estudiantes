namespace Api.Core.Models.Announcements
{
  using MongoDB.Bson;
  using MongoDB.Bson.Serialization.Attributes;

  public class Announcement
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("name")] public string Name { get; set; }

    [BsonElement("description")] public string Description { get; set; }

    [BsonElement("publishDate")] public string PublishDate { get; set; }

    public Announcement(string id, string name, string description, string publishDate)
    {
      Id = id;
      Name = name;
      Description = description;
      PublishDate = publishDate;
    }

    public Announcement()
    {
    }

    public override string ToString()
    {
      return $"{Id}: {Name} - {Description} - {PublishDate}";
    }
  }
}
