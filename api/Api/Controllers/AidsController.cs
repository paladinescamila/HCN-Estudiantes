using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Api.Core.Models.Aids;
using Api.Application.Aids;

namespace Api.Controllers
{
  [ApiController]
  [Route("api/v1/aids")]
  public class AidsController : ControllerBase
  {
    private readonly ILogger<AidsController> _logger;

    private readonly IAidsService _service;

    public AidsController(
      ILogger<AidsController> logger,
      IAidsService service)
    {
      _logger = logger;
      _service = service;
      _logger.LogInformation("Aids Controller was created!");
    }

    [HttpPost]
    public async Task<ActionResult> CreateAid(Aid aid)
    {
      var created = await _service.CreateAid(aid);
      return new ObjectResult(created) { StatusCode = 201 };
    }
  }
}
