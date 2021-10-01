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
  public class MemoryNaSectionsRepository : INaSectionsRepository
  {
    private List<NaSection> _naSections;


    public MemoryNaSectionsRepository()
    {
      _naSections = new List<NaSection>();
    }

    /// <summary>
    /// This method supports fetching all registered naSections.
    /// </summary>
    public async Task<IEnumerable<NaSection>> GetAllSections()
    {
      await Task.CompletedTask;
      return _naSections;
    }

    /// <summary>
    /// This method supports creation of a section.
    /// </summary>
    public async Task<Section> CreateSection(Section section)
    {
      await Task.CompletedTask;
      NaSection naSection = section.ConvertToNaSection();
      _naSections = _naSections.Append(naSection).ToList();
      return section;
    }

    /// <summary>
    /// This method supports addition of first degree fields over specified section.
    /// </summary>
    public async Task<NaField> AddFieldToSection(NaField field)
    {
      await Task.CompletedTask;
      int index = _naSections.FindIndex(section => section.Name == field.Section);
      _naSections[index].Fields = _naSections[index].Fields.Append(field).ToList();
      return field;
    }

    /// <summary>
    /// This method supports replacement of first degree and second degree fields over specified section.
    /// </summary>
    public async Task<NaField> UpdateFieldInSection(NaField field)
    {
      int index;
      int fieldIndex;
      await Task.CompletedTask;
      if (field.ParentId == null)
      {
        index = _naSections.FindIndex(
        section => section.Name == field.Section && section.Fields.Any(f => f.Id == field.Id));
        fieldIndex = _naSections[index].Fields.ToList().FindIndex(f => f.Id == field.Id);
        _naSections[index].Fields[fieldIndex] = field;
        return field;
      }
      index = _naSections.FindIndex(
      section => section.Name == field.Section && section.Fields.Any(f => f.Id == field.ParentId));
      fieldIndex = _naSections[index].Fields.ToList().FindIndex(f => f.Id == field.ParentId);
      _naSections[index].Fields = _naSections[index].Fields.Append(field).ToList();
      return field;
    }

    /// <summary>
    /// This method returns a list of naSections depending on activity's sections.
    /// </summary>
    public async Task<IEnumerable<NaSection>> GetSectionsByActivity(Activity activity)
    {
      await Task.CompletedTask;
      return _naSections.FindAll(section => activity.Sections.Contains(section.Name));
    }
  }
}
