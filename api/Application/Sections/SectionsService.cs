using Api.Core.Exceptions;
using Api.Core.Models.Sections;
using Api.Infrastructure.Persistence.Sections;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace Api.Application.Sections
{
  public class SectionsService : ISectionsService
  {
    private readonly ISectionsRepository _repository;
    private readonly ILogger<SectionsService> _logger;


    public SectionsService(
      ISectionsRepository repository,
      ILogger<SectionsService> logger)
    {
      this._repository = repository;
      _logger = logger;
      _logger.LogInformation("Sections Service was created");
    }

    public async Task<Section> CreateSection(Section section)
    {
      await this._repository.CreateSection(section);
      return section;
    }
  }
}
