using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Api.Core.Models.Forms;
using Api.Core.Models.Dtos;
using Api.Application.Forms;

namespace Api.Controllers
{
  [ApiController]
  [Route("api/v1/")]
  public class FormsController : ControllerBase
  {
    private readonly ILogger<SectionsController> _logger;

    private readonly IFormsService _service;

    public FormsController(
      ILogger<SectionsController> logger,
      IFormsService service)
    {
      _logger = logger;
      _service = service;
      _logger.LogInformation("Forms Controller was created!");
    }

    [HttpPut("forms/{id}")]
    public async Task<ActionResult> UpdateForm(UpdateFormDto dto) {
      await _service.UpdateForm(dto.Form, dto.Timer);
      return Ok();
    }
  }
}
