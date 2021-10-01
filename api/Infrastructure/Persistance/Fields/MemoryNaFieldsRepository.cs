using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Api.Core.Models.Fields;

namespace Api.Infrastructure.Persistence.Fields
{
  public class MemoryNaFieldsRepository : INaFieldsRepository
  {
    private List<NaField> _naFields;

    public MemoryNaFieldsRepository()
    {
      _naFields = new List<NaField>();
    }

    /// <summary>
    /// This method supports replacement of first degree and second degree fields.
    /// </summary>
    public async Task<Field> UpdateField (Field field)
    {
      int index;
      await Task.CompletedTask;
      NaField naField = field.ConvertToNaField();
      if (field.ParentId == null)
      {
        index = _naFields.FindIndex(f => f.Id == naField.Id);
        _naFields[index] = naField;
        return field;
      }
      index = _naFields.FindIndex(
        parent => parent.Id == naField.ParentId && parent.Subfields.Any(sub => sub.Id == naField.Id));
      int subIndex = _naFields[index].Subfields.ToList().FindIndex(sub => sub.Id == naField.Id);
      _naFields[index].Subfields[subIndex] = naField;
      return field;
    }

    /// <summary>
    /// This method supports creation of first degree and second degree fields.
    /// </summary>
    public async Task<Field> CreateField(Field field)
    {
      await Task.CompletedTask;
      NaField naField = field.ConvertToNaField();

      if (naField.ParentId == null)
      {
        _naFields = _naFields.Append(naField).ToList();
        return field;
      }
      int index = _naFields.FindIndex(parent => parent.Id == naField.ParentId);
      _naFields = _naFields[index].Subfields.Append(naField).ToList();
      return field;
    }

    /// <summary>
    /// This method supports deleting only first degree fields.
    /// </summary>
    public async Task<bool> DeleteField(string id)
    {
      int index = _naFields.FindIndex(field => field.Id == id);
      _naFields.RemoveAt(index);
      await Task.CompletedTask;
      return index != -1;
    }
  }
}
