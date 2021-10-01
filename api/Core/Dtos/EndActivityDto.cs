namespace Api.Core.Models.Dtos
{
  using Api.Core.Models.Activities;

  public class EndActivityDto
  {
    public EndActivityDto()
    {
    }

    public EndActivity EndActivity { get; set; }

    public float Timer { get; set; }
  }
}
