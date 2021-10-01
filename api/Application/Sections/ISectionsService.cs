using System.Threading.Tasks;
using Api.Core.Models;
using Api.Core.Models.Fields;
using Api.Core.Models.Forms;
using Api.Core.Models.Sections;
using System.Collections.Generic;

namespace Api.Application.Sections
{
  public interface ISectionsService
  {
    Task<Section> CreateSection(Section section);
  }
}
