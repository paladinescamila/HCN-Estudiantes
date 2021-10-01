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
  public class MongoNaFieldsRepository : INaFieldsRepository
  {
    private readonly IMongoCollection<NaField> _naFields;

    public MongoNaFieldsRepository(MongoConnection connection)
    {
      _naFields = connection.GetCollection<NaField>("naFields");
    }

    /// <summary>
    /// This method supports replacement of first degree and second degree fields.
    /// </summary>
    public async Task<Field> UpdateField (Field field)
    {
      NaField naField = field.ConvertToNaField();
      if (field.ParentId == null)
      {
        await this._naFields.ReplaceOneAsync(f => f.Id == naField.Id, naField);
        return field;
      }
      await _naFields.FindOneAndUpdateAsync(
      parent => parent.Id == naField.ParentId && parent.Subfields.Any(sub => sub.Id == naField.Id),
      Builders<NaField>.Update.Set(f => f.Subfields[-1], naField));
      return field;
    }

    /// <summary>
    /// This method supports creation of first degree and second degree fields.
    /// </summary>
    public async Task<Field> CreateField(Field field)
    {
      NaField naField = field.ConvertToNaField();

      if (naField.ParentId == null)
      {
        await _naFields.InsertOneAsync(naField);
        return field;
      }

      var filter = Builders<NaField>.Filter.Eq(f => f.Id, naField.ParentId);
      var update = Builders<NaField>.Update.Push(f => f.Subfields, naField);
      var result = await _naFields.UpdateOneAsync(filter, update);
      return field;
    }

    /// <summary>
    /// This method supports deleting only first degree fields.
    /// </summary>
    public async Task<bool> DeleteField(string id)
    {
      var opResult = await _naFields.DeleteOneAsync(field => field.Id == id);
      return opResult.DeletedCount == 1;
    }
  }
}
