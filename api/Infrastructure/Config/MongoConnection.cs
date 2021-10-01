using MongoDB.Driver;
using System;

namespace Api.Infrastructure.Config
{
  public class MongoConnection
  {
    private readonly IMongoDatabase _db;

    public MongoConnection(MongoSettings settings)
    {
      var mongoClient = new MongoClient(settings.Server);
      this._db = mongoClient.GetDatabase(settings.Database);
    }

    public IMongoCollection<T> GetCollection<T>(string collection)
    {
      return _db.GetCollection<T>(collection);
    }

    public MongoConnection()
    {
    }
  }
}
