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
using Api.Core.Models.Aids;
using Api.Core.Models.Activities;
using System.Text.Json.Serialization;
using Api.Infrastructure.Persistence.Fields;

namespace Api.Infrastructure.Persistence.Aids
{
  public class MongoAidsRepository : IAidsRepository
  {
    private readonly IMongoCollection<Aid> _aids;

    public MongoAidsRepository(MongoConnection connection)
    {
      _aids = connection.GetCollection<Aid>("aids");
    }

    /// <summary>
    /// This method supports creation of aid by levels.
    /// </summary>
    public async Task<Aid> CreateAid(Aid aid)
    {
      await _aids.InsertOneAsync(aid);
      return aid;
    }

     /// <summary>
    /// This method supports fetching aid by specified activity.
    /// </summary>
    public async Task<IEnumerable<Aid>> GetAidsByFieldIdsAndLevel(IList<string> fieldIds, string level)
    {
      return await _aids.Find(aid => fieldIds.Contains(aid.FieldId) && aid.Levels.Contains(level)).ToListAsync();
    }
  }
}
