using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Api.Infrastructure.Config;
using Api.Core.Models.Sections;
using Api.Core.Models.Fields;
using Api.Core.Models.Aids;
using Api.Core.Models.Activities;
using System.Text.Json.Serialization;
using Api.Infrastructure.Persistence.Fields;

namespace Api.Infrastructure.Persistence.Aids
{
  public class MemoryAidsRepository : IAidsRepository
  {
    private List<Aid> _aids;

    public MemoryAidsRepository()
    {
    }

    /// <summary>
    /// This method supports creation of aid by levels.
    /// </summary>
    public async Task<Aid> CreateAid(Aid aid)
    {
      _aids = _aids.Append(aid).ToList();
      await Task.CompletedTask;
      return aid;
    }

     /// <summary>
    /// This method supports fetching aid by specified activity.
    /// </summary>
    public async Task<IEnumerable<Aid>> GetAidsByFieldIdsAndLevel(IList<string> fieldIds, string level)
    {
      await Task.CompletedTask;
      return _aids.FindAll(aid => fieldIds.Contains(aid.FieldId) && aid.Levels.Contains(level));
    }
  }
}
