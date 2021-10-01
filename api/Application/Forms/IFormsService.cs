using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models.Forms;
using Api.Core.Models.Dtos;
using Api.Core.Models.Activities;
using Api.Core.Models.Aids;

namespace Api.Application.Forms
{
  public interface IFormsService
  {
    Task<NaForm> GetEmptyForm();
    Task<FormDto> GetFormByActivity(Activity activity);
    Task<FormDto> GenerateForm(Activity activity);
    Task UpdateForm(NaForm form, float timer);
  }
}
