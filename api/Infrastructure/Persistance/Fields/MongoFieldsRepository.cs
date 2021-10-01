using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using System.Linq;
using Api.Infrastructure.Config;
using Api.Core.Models.Fields;

namespace Api.Infrastructure.Persistence.Fields
{
  public class MongoFieldsRepository : IFieldsRepository
  {
    private readonly IMongoCollection<Field> _fields;
    private readonly INaFieldsRepository _naFieldsRepository;

    public MongoFieldsRepository(
      MongoConnection connection,
      INaFieldsRepository naFieldsRepository)
    {
      _fields = connection.GetCollection<Field>("fields");
      _naFieldsRepository = naFieldsRepository;
    }

    /// <summary>
    /// This method supports fetching fields by section codes
    /// </summary>
    public async Task<IEnumerable<Field>> GetFieldsBySections(IList<string> sections)
    {
      return await _fields.Find(field => sections.Contains(field.Section)).ToListAsync();
    }

    public async Task<Field> GetFieldById(string id)
    {
      Field field = await _fields.Find(field => field.Id == id).FirstOrDefaultAsync();
      return field;
    }

    /// <summary>
    /// This method supports replacement of first degree and second degree fields.
    /// </summary>
    public async Task<Field> UpdateField (Field field)
    {
      var opResult = await this._fields.ReplaceOneAsync(f => f.Id == field.Id, field);
      if (opResult.ModifiedCount == 0)
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
      await _fields.InsertOneAsync(field);
      await _naFieldsRepository.CreateField(field);
      return field;
    }

    /// <summary>
    /// This method supports deleting only first degree fields.
    /// </summary>
    public async Task<bool> DeleteField(string id)
    {
      var opResult = await _fields.DeleteOneAsync(field => field.Id == id);
      await _naFieldsRepository.DeleteField(id);
      return opResult.DeletedCount == 1;
    }
  }
}
