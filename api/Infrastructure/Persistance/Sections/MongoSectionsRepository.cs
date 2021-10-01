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
  public class MongoSectionsRepository : ISectionsRepository
  {
    private readonly IMongoCollection<Section> _sections;
    private readonly INaSectionsRepository _naSectionsRepository;


    public MongoSectionsRepository(
      MongoConnection connection,
      INaSectionsRepository naSectionsRepository)
    {
      _sections = connection.GetCollection<Section>("sections");
      _naSectionsRepository = naSectionsRepository;
    }

    /// <summary>
    /// This method supports fetching all registered naSections.
    /// </summary>
    public async Task<IEnumerable<NaSection>> GetAllSections()
    {
        return await _naSectionsRepository.GetAllSections();
    }

    /// <summary>
    /// This method supports creation of a section.
    /// </summary>
    public async Task<Section> CreateSection(Section section)
    {
      await _sections.InsertOneAsync(section);
      await _naSectionsRepository.CreateSection(section);
      return section;
    }

    /// <summary>
    /// This method supports addition of first degree fields over specified section.
    /// </summary>
    public async Task<NaField> AddFieldToSection(NaField field)
    {
      await _naSectionsRepository.AddFieldToSection(field);
      return field;
    }

    /// <summary>
    /// This method supports replacement of first degree and second degree fields over specified section.
    /// </summary>
    public async Task<NaField> UpdateFieldInSection(NaField field)
    {
      await _naSectionsRepository.UpdateFieldInSection(field);
      return field;
    }

    /// <summary>
    /// This method returns a list of naSections depending on activity's sections.
    /// </summary>
    public async Task<IEnumerable<NaSection>> GetSectionsByActivity(Activity activity)
    {
      return await _naSectionsRepository.GetSectionsByActivity(activity);
    }
  }
}
