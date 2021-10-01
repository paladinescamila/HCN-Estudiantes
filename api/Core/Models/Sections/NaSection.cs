namespace Api.Core.Models.Sections
{
  using Api.Core.Models.Fields;
  using MongoDB.Bson;
  using MongoDB.Bson.Serialization.Attributes;
  using System.Collections.Generic;
  using System;
  using System.Collections;

  public class NaSection : Section
  {
    [BsonElement("fields")]
    public IList<NaField> Fields { get; set;}


    [BsonElement("comment")]
    public string Comment { get; set;}

    public NaSection()
    {
    }

    public NaSection(string id) : base(id)
    {
    }
  }
}
