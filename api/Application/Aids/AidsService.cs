using Api.Application.Fields;
using Api.Core.Models.Aids;
using Api.Core.Models.Activities;
using Api.Core.Models.Fields;
using Api.Infrastructure.Persistence.Aids;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace Api.Application.Aids
{
  public class AidsService : IAidsService
  {
    private readonly IAidsRepository _repository;
    private readonly IFieldsService _fieldsService;
    private readonly ILogger<AidsService> _logger;

    public AidsService(
      IAidsRepository repository,
      IFieldsService fieldsService,
      ILogger<AidsService> logger)
    {
      this._repository = repository;
      this._fieldsService= fieldsService;
      _logger = logger;
      _logger.LogInformation("Aids Service was created");
    }

    public async Task<Aid> CreateAid(Aid aid)
    {
      aid = await _repository.CreateAid(aid);
      return aid;
    }

    public async Task<IEnumerable<Aid>> GetAidsByActivity(Activity activity)
    {
      List<Field> fields = (await _fieldsService.GetFieldsByActivity(activity)).ToList();
      List<string> fieldIds = fields.Select(f => f.Id).ToList();
      return await _repository.GetAidsByFieldIdsAndLevel(fieldIds, activity.DifficultyLevel);
    }
  }
}
