namespace Api.Infrastructure.Config
{
  public interface IMongoSettings
  {
    string Server { get; set; }
    string Database { get; set; }
  }
}
