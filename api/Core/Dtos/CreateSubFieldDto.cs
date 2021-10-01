namespace Api.Core.Models.Dtos
{
    public class CreateSubFieldDto
  {
    public CreateSubFieldDto()
    {
    }

    public string Name { get; set; }
    public string CellName { get; set; }
    public string Description { get; set; }
    public bool RequiresInterpretation { get; set; }
  }
}
