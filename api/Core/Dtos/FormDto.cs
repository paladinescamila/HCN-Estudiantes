namespace Api.Core.Models.Dtos
{
  using Api.Core.Models.Forms;
  using Api.Core.Models.Aids;
  using System.Collections.Generic;

  public class FormDto
  {
    public FormDto()
    {
    }

    public NaForm NaForm { get; set; }

    public IList<Aid> Aids { get; set; }
  }
}
