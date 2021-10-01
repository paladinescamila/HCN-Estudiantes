using Api.Application.Aids;
using Api.Core.Exceptions;
using Api.Core.Models.Sections;
using Api.Core.Models.Forms;
using Api.Core.Models.Aids;
using Api.Core.Models.Dtos;
using Api.Infrastructure.Persistence.Activities;
using Api.Infrastructure.Persistence.Forms;
using Api.Infrastructure.Persistence.Sections;
using Api.Core.Models.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace Api.Application.Forms
{
  public class FormsService : IFormsService
  {
    private readonly IFormsRepository _repository;
    private readonly ISectionsRepository _sectionsRepository;
    private readonly IActivitiesRepository _activitiesRepository;
    private readonly IAidsService _aidsService;
    private readonly ILogger<FormsService> _logger;


    public FormsService(
      IFormsRepository repository,
      ISectionsRepository sectionsRepository,
      IActivitiesRepository activitiesRepository,
      IAidsService aidsService,
      ILogger<FormsService> logger)
    {
      this._repository = repository;
      this._sectionsRepository = sectionsRepository;
      this._activitiesRepository = activitiesRepository;
      this._aidsService = aidsService;
      _logger = logger;
      _logger.LogInformation("Forms Service was created");
    }

    public async Task<FormDto> GetFormByActivity(Activity activity)
    {
      NaForm form = await _repository.GetFormByActivityId(activity.Id);
      if (form == null)
      {
        throw new NotFoundException("No form was found for activity");
      }
      FormDto dto = new ()
      {
        NaForm = form,
        Aids = (List<Aid>) await _aidsService.GetAidsByActivity(activity)
      };
      return dto;
    }

    public async Task<NaForm> GetEmptyForm()
    {
      NaForm form = new () {
        Sections = (List<NaSection>)await _sectionsRepository.GetAllSections()
      };
      return form;
    }

    public async Task UpdateForm(NaForm form, float timer)
    {
      Activity activity = await _activitiesRepository.GetActivityById(form.ActivityId);
       if (activity == null)
      {
        throw new NotFoundException($"Activity with id {form.ActivityId} was not found");
      }
      var formResponse = await _repository.GetFormById(form.Id);
      if (formResponse == null) throw new NotFoundException("Could not find form to update");
      await _activitiesRepository.UpdateTimer(form.ActivityId, activity.Timer + timer);
      await _repository.UpdateForm(form);
    }

    public async Task<FormDto> GenerateForm(Activity activity)
    {
      var sections = await _sectionsRepository.GetSectionsByActivity(activity);
      NaForm form = new (){
        ActivityId = activity.Id,
        StudentId = activity.StudentId,
        Sections = sections.ToList()
      };
      form = await _repository.GenerateForm(form);
      var aids = await _aidsService.GetAidsByActivity(activity);
      FormDto dto = new ()
      {
        NaForm = form,
        Aids = aids.ToList()
      };
      return dto;
    }
  }
}
