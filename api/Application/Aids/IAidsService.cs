using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models.Aids;
using Api.Core.Models.Activities;

namespace Api.Application.Aids
{
  public interface IAidsService
  {
    Task<Aid> CreateAid(Aid aid);
    Task<IEnumerable<Aid>> GetAidsByActivity(Activity activity);
  }
}
