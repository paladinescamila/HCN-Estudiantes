namespace Api.Core.Models.Fields
{
  using System;
  using MongoDB.Bson;
  using MongoDB.Bson.Serialization.Attributes;
  using System.Collections.Generic;

  public class Field
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("type")]
    public string Type { get; set; }

    [BsonElement("requiresInterpretation")]
    public bool RequiresInterpretation { get; set; }

    [BsonElement("section")]
    public string Section { get; set; }

    [BsonElement("cellName")]
    public string CellName { get; set; }

    [BsonElement("parentId")]
    #nullable enable
    public string? ParentId { get; set; }

    public Field()
    {
    }

    public Field(string id)
    {
      this.Id = id;
    }

    public void SetType(string type)
    {
        this.Type = type;
    }

    public override string ToString()
    {
      return $"{Id}: {Name} - {Description} - {RequiresInterpretation} - {Section} - {Type} - {ParentId}";
    }

    public NaField ConvertToNaField(){
      return new (this.Id)
      {
        Name = this.Name,
        Type = this.Type,
        Section = this.Section,
        ParentId = this.ParentId,
        Description = this.Description,
        RequiresInterpretation = this.RequiresInterpretation,
        Subfields = new List<NaField>(),
        Index = 0,
        Value = "",
        Interpretation = ""
      };
    }
  }
}
