namespace Api.Core.Models.Fields
{
  using Api.Core.Models.Fields;
  using System;
  using MongoDB.Bson;
  using MongoDB.Bson.Serialization.Attributes;
  using System.Text.Json.Serialization;
  using System.Collections.Generic;
  using System.Collections;

  public class NaField : Field
  {
    [BsonElement("value")]
    public string Value { get; set; }

    [BsonElement("interpretation")]
    public string Interpretation { get; set; }

    [BsonElement("index")]
    public int Index { get; set; }

    [BsonElement("subfields")]
    public IList<NaField> Subfields { get; set;}

    public NaField()
    {
    }

    public NaField(string id) : base(id)
    {
    }

    public override string ToString()
    {
      return $"{Id}: {Name} - {Description} - {RequiresInterpretation} - {Section} - {Type} - {ParentId}";
    }
  }
}
