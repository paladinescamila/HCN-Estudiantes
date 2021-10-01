using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Api.Application.Activities;
using Api.Application.Forms;
using Api.Application.Sections;
using Api.Application.Fields;
using Api.Application.Aids;
using Api.Core.Models.Forms;
using Api.Core.Models.Sections;
using Api.Core.Models.Dtos;
using Api.Infrastructure.Mail;
using Api.Infrastructure.TeacherApp;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Xunit;

namespace Api.Test.Controllers
{
  public class Forms_Should : IDisposable
  {
    public Forms_Should()
    {
    }

    public void Dispose()
    {
      GC.SuppressFinalize(this);
    }

    [Fact(Timeout = 1000)]
    public async Task UpdateForm()
    {
      var client = GetClientMock();
      NaForm form = new ("{formId}"){
        Sections = new List<NaSection>(),
        ActivityId = "507f191e810c19729de860ea",
        StudentId = "278f191e110c45729de86il9"
      };
      UpdateFormDto dto = new ()
      {
        Form = form,
        Timer = 5,
      };
      string json = JsonConvert.SerializeObject(dto);
      var stringContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");
      var response = await client.PutAsync("/api/v1/forms/{formId}", stringContent);
      Assert.True(response.IsSuccessStatusCode);
    }

    private static HttpClient GetClientMock()
    {
      var hostBuilder = new WebHostBuilder()
        .UseStartup<Startup>()
        .ConfigureServices(services =>
        {
          services.AddSingleton(TestsHelper.GetMongoConnectionMock());
          services.AddSingleton(TestsHelper.GetNaFieldsRepositoryMock());
          services.AddSingleton(TestsHelper.GetNaSectionsRepositoryMock());
          services.AddSingleton(TestsHelper.GetFieldsRepositoryMock());
          services.AddSingleton(TestsHelper.GetSectionsRepositoryMock());
          services.AddSingleton(TestsHelper.GetAidsRepositoryMock());
          services.AddSingleton(TestsHelper.GetFormsRepositoryMock());
          services.AddSingleton(TestsHelper.GetActivitiesRepositoryMock());
          services.AddSingleton<MailController>();
          services.AddSingleton<TeacherEndpointsController>();
          services.AddSingleton<IFieldsService, FieldsService>();
          services.AddSingleton<ISectionsService, SectionsService>();
          services.AddSingleton<IFormsService, FormsService>();
          services.AddSingleton<IAidsService, AidsService>();
          services.AddSingleton<IActivitiesService, ActivitiesService>();
        });
      var server = new TestServer(hostBuilder);
      var client = server.CreateClient();
      client.DefaultRequestHeaders.Accept.Add(
        new MediaTypeWithQualityHeaderValue("application/json"));
      return client;
    }
  }
}
