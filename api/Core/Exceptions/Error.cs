namespace Api.Core.Exceptions
{
  public class Error
  {
    public string Message { get; set; }

    public Error(string error)
    {
      this.Message = error;
    }
  }
}
