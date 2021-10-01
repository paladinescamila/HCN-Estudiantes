using Api.Core.Exceptions;
using Api.Core.Models.Fields;
using Api.Core.Models.Activities;
using Api.Infrastructure.Persistence.Fields;
using Api.Infrastructure.Persistence.Sections;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace Api.Application.Fields
{
  public class FieldsService : IFieldsService
  {
    private readonly IFieldsRepository _repository;
    private readonly ISectionsRepository _sectionsRepository;

    private readonly ILogger<FieldsService> _logger;

    public FieldsService(
      IFieldsRepository repository,
      ILogger<FieldsService> logger,
      ISectionsRepository sectionsRepository)
    {
      this._repository = repository;
      this._sectionsRepository = sectionsRepository;
      _logger = logger;
      _logger.LogInformation("Fields Service was created");
    }

    public async Task<Field> CreateField(string parentId, Field field)
    {
      field.ParentId = parentId;
      if (parentId == null) {
        field = await _repository.CreateField(field);
        if (field != null)
        {
          await _sectionsRepository.AddFieldToSection(field.ConvertToNaField());
        }
        return field;
      }
      Field parentField = await _repository.GetFieldById(parentId);
      if (parentField == null)
      {
        throw new NotFoundException("Parent field could not be found");
      }
      field.Section = parentField.Section;
      field = await _repository.CreateField(field);
      if (field != null)
      {
        await _sectionsRepository.UpdateFieldInSection(field.ConvertToNaField());
      }
      return field;
    }

    public async void DeleteField(string id)
    {
      if (!await _repository.DeleteField(id))
      {
        throw new NotFoundException($"Activity with id {id} was not found");
      }
    }

    public async Task<IList<Field>> GetFieldsByActivity(Activity activity)
    {
      List<Field> fields = (await _repository.GetFieldsBySections(activity.Sections)).ToList();
      return fields;
    }
  }
}
