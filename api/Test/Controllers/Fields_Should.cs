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
  public class Fields_Should : IDisposable
  {
    public Fields_Should()
    {
    }

    public void Dispose()
    {
      GC.SuppressFinalize(this);
    }

    [Fact(Timeout = 2000)]
    public async Task CreateField()
    {
      var client = GetClientMock();
      CreateFieldDto field = new (){
        Name = "",
        Description = "",
        Section = "",
        Type = "",
        CellName = "",
        RequiresInterpretation = false
      };
      var json = JsonConvert.SerializeObject(field);
      var stringContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");
      var response = await client.PostAsync("/api/v1/fields", stringContent);
      Assert.True(response.IsSuccessStatusCode);
    }

    [Fact(Timeout = 1000)]
    public async Task CreateSubField()
    {
      var client = GetClientMock();
      CreateSubFieldDto form = new (){
        Name = "",
        Description = "",
        CellName = "",
        RequiresInterpretation = false
      };
      var json = JsonConvert.SerializeObject(form);
      var stringContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");
      var response = await client.PostAsync("/api/v1/fields/{parentId}/subfields", stringContent);
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
