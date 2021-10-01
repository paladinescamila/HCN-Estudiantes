using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Api.Core.Models.Forms;

namespace Api.Infrastructure.Persistence.Forms
{
  public class MemoryFormsRepository : IFormsRepository
  {
    private List<NaForm> _forms;

    public MemoryFormsRepository()
    {
      _forms = new List<NaForm>();
    }

    public async Task<NaForm> GenerateForm(NaForm form)
    {
      _forms = _forms.Append(form).ToList();
      await Task.CompletedTask;
      return form;
    }

    public async Task<bool> UpdateForm(NaForm form)
    {
      int index = _forms.FindIndex(f => f.Id == form.Id);
      _forms[index] = form;
      await Task.CompletedTask;
      return index != -1;
    }

    public async Task<NaForm> GetFormById(string id)
    {
      await Task.CompletedTask;
      return _forms.Find(form => form.Id == id);
    }

    public async Task<NaForm> GetFormByActivityId(string activityId)
    {
      await Task.CompletedTask;
      return _forms.Find(form => form.ActivityId == activityId);
    }
  }
}
