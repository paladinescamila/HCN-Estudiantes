using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Api.Mappers;
using Api.Application.Activities;
using Api.Application.Forms;
using Api.Application.Sections;
using Api.Application.Fields;
using Api.Application.Aids;
using Api.Core.Models.Activities;
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
  public class Activities_Should : IDisposable
  {
    public Activities_Should()
    {
    }

    public void Dispose()
    {
      GC.SuppressFinalize(this);
    }

    [Fact(Timeout = 3000)]
    public async Task GetActivitiesByStudentAndCourse()
    {
      var client = GetClientMock();
      var response = await client.GetAsync("/api/v1/activities/students/{studentId}/courses/{courseId}");
      Assert.True(response.IsSuccessStatusCode);
    }

    [Fact(Timeout = 3000)]
    public async Task GetCompletedActivitiesByStudentAndCourse()
    {
      var client = GetClientMock();
      var response = await client.GetAsync("/api/v1/activities/students/{studentId}/courses/{courseId}/completed");
      Assert.True(response.IsSuccessStatusCode);
    }

    [Fact(Timeout = 1000)]
    public async Task CreateOrUpdateFormByActivityId()
    {
      var client = GetClientMock();
      var response = await client.GetAsync("/api/v1/activities/{activityId}/form");
      Assert.True(response.IsSuccessStatusCode);
    }

    [Fact(Timeout = 3000)]
    public async Task UpdateTimer()
    {
      var client = GetClientMock();
      var dto = new ActivityTimerDto()
      {
        Id = "{activityId}",
        Timer = 5,
      };
      var json = JsonConvert.SerializeObject(dto);
      var stringContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");
      var response = await client.PutAsync("/api/v1/activities/{activityId}/timer", stringContent);
      Assert.True(response.IsSuccessStatusCode);
    }

    [Fact]
    public async Task EndActivity()
    {
      var client = GetClientMock();
      var endActivity = new EndActivity()
      {
        Email = "user@yopmail.com",
        RecipientName = "User"
      };
      EndActivityDto dto = new ()
      {
        EndActivity = endActivity,
        Timer = 5,
      };
      var json = JsonConvert.SerializeObject(dto);
      var stringContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");
      var response = await client.PostAsync("/api/v1/activities/{activityId}/end", stringContent);
      Assert.True(response.IsSuccessStatusCode);
    }


    [Fact(Timeout = 1000)]
    public async Task UpdateNextStatus()
    {
      var client = GetClientMock();
      var stringContent = new StringContent("", UnicodeEncoding.UTF8, "application/json");
      var response = await client.PutAsync("/api/v1/activities/{activityId}/next-status", stringContent);
      Assert.True(response.IsSuccessStatusCode);
    }

    [Fact(Timeout = 1000)]
    public async Task Create()
    {
      var client = GetClientMock();
      var dto = new CreateActivityDto()
      {
        Name = "Test Activity #1",
        ActivityId = "123",
        StudentId = "123",
        Description = "Test description",
        PublishDate = "02-02-2022",
        Deadline = "10-02-2022",
        DifficultyLevel = "",
        Sections = new List<string>()
      };
      var json = JsonConvert.SerializeObject(dto);
      var stringContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");
      var response = await client.PostAsync($"/api/v1/activities", stringContent);
      Assert.True(response.IsSuccessStatusCode);
    }

    private static HttpClient GetClientMock()
    {
      var hostBuilder = new WebHostBuilder()
        .UseStartup<Startup>()
        .ConfigureServices(services =>
        {
          services.AddSingleton(TestsHelper.GetMongoConnectionMock());
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
