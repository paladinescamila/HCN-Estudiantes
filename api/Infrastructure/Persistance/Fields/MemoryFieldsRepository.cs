using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Api.Core.Models.Fields;

namespace Api.Infrastructure.Persistence.Fields
{
  public class MemoryFieldsRepository : IFieldsRepository
  {
    private List<Field> _fields;
    private readonly INaFieldsRepository _naFieldsRepository;

    public MemoryFieldsRepository(INaFieldsRepository naFieldsRepository)
    {
      _fields = new List<Field>();
      _naFieldsRepository = naFieldsRepository;
    }

    /// <summary>
    /// This method supports fetching fields by section codes
    /// </summary>
    public async Task<IEnumerable<Field>> GetFieldsBySections(IList<string> sections)
    {
      await Task.CompletedTask;
      return _fields.FindAll(field => sections.Contains(field.Section));
    }

    public async Task<Field> GetFieldById(string id)
    {
      await Task.CompletedTask;
      return _fields.Find(field => field.Id == id);
    }

    /// <summary>
    /// This method supports replacement of first degree and second degree fields.
    /// </summary>
    public async Task<Field> UpdateField (Field field)
    {
      int index = _fields.FindIndex(f => f.Id == field.Id);
      _fields[index] = field;
      await Task.CompletedTask;
      if (index == -1)
      {
        return field;
      }
      await _naFieldsRepository.UpdateField(field);
      return field;
    }

    /// <summary>
    /// This method supports creation of first degree and second degree fields.
    /// </summary>
    public async Task<Field> CreateField(Field field)
    {
      _fields = _fields.Append(field).ToList();
      await Task.CompletedTask;
      await _naFieldsRepository.CreateField(field);
      return field;
    }

    /// <summary>
    /// This method supports deleting only first degree fields.
    /// </summary>
    public async Task<bool> DeleteField(string id)
    {
      int index = _fields.FindIndex(field => field.Id == id);
      _fields.RemoveAt(index);
      await _naFieldsRepository.DeleteField(id);
      await Task.CompletedTask;
      return index != -1;
    }
  }
}
