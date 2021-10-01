using System.Threading.Tasks;
using Api.Core.Models.Fields;

namespace Api.Infrastructure.Persistence.Fields
{
  public interface INaFieldsRepository
  {
    Task<Field> UpdateField (Field field);
    Task<Field> CreateField(Field field);
    Task<bool> DeleteField(string id);
  }
}
