using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using System.Linq;
using Api.Infrastructure.Config;
using Api.Core.Models.Sections;
using Api.Core.Models.Fields;
using Api.Core.Models.Activities;

namespace Api.Infrastructure.Persistence.Sections
{
  public class MongoNaSectionsRepository : INaSectionsRepository
  {
    private readonly IMongoCollection<NaSection> _naSections;

    public MongoNaSectionsRepository(MongoConnection connection)
    {
      _naSections = connection.GetCollection<NaSection>("naSections");
    }

    /// <summary>
    /// This method supports fetching all registered naSections.
    /// </summary>
    public async Task<IEnumerable<NaSection>> GetAllSections()
    {
      return await _naSections.Find(section => true).ToListAsync();
    }

    /// <summary>
    /// This method supports creation of a section.
    /// </summary>
    public async Task<Section> CreateSection(Section section)
    {
      NaSection naSection = section.ConvertToNaSection();
      await _naSections.InsertOneAsync(naSection);
      return section;
    }

    /// <summary>
    /// This method supports addition of first degree fields over specified section.
    /// </summary>
    public async Task<NaField> AddFieldToSection(NaField field)
    {
      var filter = Builders<NaSection>.Filter.Eq(section => section.Name, field.Section);
      var update = Builders<NaSection>.Update.Push(section => section.Fields, field);
      var result = await _naSections.UpdateOneAsync(filter, update);
      return field;
    }

    /// <summary>
    /// This method supports replacement of first degree and second degree fields over specified section.
    /// </summary>
    public async Task<NaField> UpdateFieldInSection(NaField field)
    {
      if (field.ParentId == null)
      {
        await _naSections.FindOneAndUpdateAsync(
        section => section.Name == field.Section && section.Fields.Any(f => f.Id == field.Id),
        Builders<NaSection>.Update.Set(section => section.Fields[-1], field));
        return field;
      }
      var opResult = await _naSections.FindOneAndUpdateAsync(
      Builders<NaSection>.Filter.Where(section => section.Name == field.Section
      &&  section.Fields.Any(f => f.Id == field.ParentId)),
      Builders<NaSection>.Update.Push(section => section.Fields[-1].Subfields, field));
      return field;
    }

    /// <summary>
    /// This method returns a list of naSections depending on activity's sections.
    /// </summary>
    public async Task<IEnumerable<NaSection>> GetSectionsByActivity(Activity activity)
    {
      return await _naSections.Find(section => activity.Sections.Contains(section.Name)).ToListAsync();
    }
  }
}
