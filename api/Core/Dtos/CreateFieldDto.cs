namespace Api.Core.Models.Dtos
{
    public class CreateFieldDto
  {
    public CreateFieldDto()
    {
    }

    public string Name { get; set; }

    public string Description { get; set; }

    public string Section { get; set; }

    public string Type { get; set; }

    public string CellName { get; set; }

    public bool RequiresInterpretation { get; set; }
  }
}
