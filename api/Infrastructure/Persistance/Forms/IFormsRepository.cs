using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models.Fields;
using Api.Core.Models.Forms;
using Api.Core.Models.Activities;
using Api.Core.Models.Sections;

namespace Api.Infrastructure.Persistence.Forms
{
  public interface IFormsRepository
  {
    Task<NaForm> GenerateForm(NaForm form);
    Task<bool> UpdateForm(NaForm form);
    Task<NaForm> GetFormById(string id);
    Task<NaForm> GetFormByActivityId(string activityId);
  }
}
