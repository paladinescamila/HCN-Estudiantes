using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models.Fields;
using Api.Core.Models.Aids;
using Api.Core.Models.Forms;
using Api.Core.Models.Sections;
using Api.Core.Models.Activities;

namespace Api.Infrastructure.Persistence.Aids
{
  public interface IAidsRepository
  {
    Task<Aid> CreateAid(Aid aid);
    Task<IEnumerable<Aid>> GetAidsByFieldIdsAndLevel(IList<string> fieldIds, string level);
  }
}
