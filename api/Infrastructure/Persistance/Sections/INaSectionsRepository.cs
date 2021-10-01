using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models.Fields;
using Api.Core.Models.Forms;
using Api.Core.Models.Sections;
using Api.Core.Models.Activities;

namespace Api.Infrastructure.Persistence.Sections
{
  public interface INaSectionsRepository
  {
    Task<IEnumerable<NaSection>> GetAllSections();
    Task<Section> CreateSection(Section section);
    Task<IEnumerable<NaSection>> GetSectionsByActivity(Activity activity);
    Task<NaField> UpdateFieldInSection(NaField field);
    Task<NaField> AddFieldToSection(NaField field);
  }
}
