using System.Threading.Tasks;
using System.Collections.Generic;
using Api.Core.Models.Fields;
using Api.Core.Models.Activities;

namespace Api.Application.Fields
{
  public interface IFieldsService
  {
      Task<Field> CreateField(string parentId, Field field);
      void DeleteField(string id);
      Task<IList<Field>> GetFieldsByActivity(Activity activity);
  }
}
