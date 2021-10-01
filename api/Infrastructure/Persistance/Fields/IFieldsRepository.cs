using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models.Fields;

namespace Api.Infrastructure.Persistence.Fields
{
  public interface IFieldsRepository
  {
    Task<Field> GetFieldById(string id);
    Task<IEnumerable<Field>> GetFieldsBySections(IList<string> sections);
    Task<Field> UpdateField (Field field);
    Task<Field> CreateField(Field field);
    Task<bool> DeleteField(string id);
  }
}
