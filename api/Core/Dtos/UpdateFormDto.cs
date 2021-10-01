using Api.Core.Models.Forms;

namespace Api.Core.Models.Dtos
{
    public class UpdateFormDto
  {
    public UpdateFormDto()
    {
    }

    public NaForm Form { get; set; }
    public float Timer { get; set; }
  }
}
