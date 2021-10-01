namespace Api.Core.Models.Aids
{
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;
  public class Aid
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; private set; }

    [BsonElement("text")]
    public string Text { get; set; }

    [BsonElement("type")]
    public string Type { get; set; }

    [BsonElement("levels")]
    public string[] Levels { get; set; }

    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("fieldId")]
    public string FieldId{ get; set; }

    public Aid()
    {
    }

    public Aid(string id)
    {
      Id = id;
    }

    public override string ToString()
    {
      return $"{Id}: {Text} - {Type} -{Levels}";
    }
  }
}
