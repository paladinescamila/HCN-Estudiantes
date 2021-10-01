using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Api.Core.Models.Activities;
using Api.Core.Models.Aids;
using Api.Core.Models.Fields;
using Api.Core.Models.Forms;
using Api.Core.Models.Sections;
using Api.Infrastructure.Config;
using Api.Infrastructure.Persistence.Activities;
using Api.Infrastructure.Persistence.Aids;
using Api.Infrastructure.Persistence.Fields;
using Api.Infrastructure.Persistence.Forms;
using Api.Infrastructure.Persistence.Sections;
using Moq;

namespace Api.Test
{
  public static class TestsHelper
  {
    public static string GetBaseDirectory()
    {
      var enviroment = Environment.CurrentDirectory;
      return Directory.GetParent(enviroment).Parent.Parent.FullName;
    }

    public static MongoConnection GetMongoConnectionMock()
    {
      return new Mock<MongoConnection>().Object;
    }

    public static IActivitiesRepository GetActivitiesRepositoryMock()
    {
      var mockRepository = new Mock<IActivitiesRepository>();
     mockRepository.Setup(g => g.GetActivitiesByStudentAndCourse(It.IsAny<string>(), It.IsAny<string>()))
        .Returns(Task.FromResult<IEnumerable<Activity>>(GetActivitiesData(0)));
      mockRepository.Setup(g => g.GetActivityById(It.IsAny<string>()))
        .Returns(Task.FromResult(GetActivityData()));
      return mockRepository.Object;
    }

    public static IAidsRepository GetAidsRepositoryMock()
    {
      var mockRepository = new Mock<IAidsRepository>();
      mockRepository.Setup(g => g.GetAidsByFieldIdsAndLevel(Mock.Of<List<string>>(), It.IsAny<string>()))
        .Returns(Task.FromResult(GetAidsData(10)));
      return mockRepository.Object;
    }

    public static IFieldsRepository GetFieldsRepositoryMock()
    {
      var mockRepository = new Mock<IFieldsRepository>();
      mockRepository.Setup(g => g.GetFieldsBySections(new List<string>()))
        .Returns(Task.FromResult(GetFieldsData(10)));
      mockRepository.Setup(g => g.GetFieldById(It.IsAny<string>()))
        .Returns(Task.FromResult(GetFieldData()));
      mockRepository.Setup(g => g.CreateField(Mock.Of<Field>()))
        .Returns(Task.FromResult(GetFieldData()));
      return mockRepository.Object;
    }

    public static INaFieldsRepository GetNaFieldsRepositoryMock()
    {
      var mockRepository = new Mock<INaFieldsRepository>();
      mockRepository.Setup(g => g.CreateField(Mock.Of<Field>()))
        .Returns(Task.FromResult(new Field()));
      return mockRepository.Object;
    }

    public static ISectionsRepository GetSectionsRepositoryMock()
    {
      var mockRepository = new Mock<ISectionsRepository>();
      mockRepository.Setup(g => g.GetAllSections())
        .Returns(Task.FromResult(GetNaSectionsData(10)));
      mockRepository.Setup(g => g.GetSectionsByActivity(Mock.Of<Activity>()))
        .Returns(Task.FromResult(GetNaSectionsData(0)));
      return mockRepository.Object;
    }

    public static INaSectionsRepository GetNaSectionsRepositoryMock()
    {
      var mockRepository = new Mock<INaSectionsRepository>();
      mockRepository.Setup(g => g.GetAllSections())
        .Returns(Task.FromResult(GetNaSectionsData(10)));
      mockRepository.Setup(g => g.GetSectionsByActivity(Mock.Of<Activity>()))
        .Returns(Task.FromResult(GetNaSectionsData(0)));
      return mockRepository.Object;
    }

    public static IFormsRepository GetFormsRepositoryMock()
    {
      var mockRepository = new Mock<IFormsRepository>();
      mockRepository.Setup(g => g.GenerateForm(Mock.Of<NaForm>()))
        .Returns(Task.FromResult(GetNaFormData()));
      mockRepository.Setup(g => g.GetFormById(It.IsAny<string>()))
        .Returns(Task.FromResult(GetNaFormData()));
      return mockRepository.Object;
    }

    private static IEnumerable<Activity> GetActivitiesData(int quantity)
    {
      var activities = new List<Activity>();
      for (var i = 0; i < quantity; i++) activities.Add(Mock.Of<Activity>());
      return activities;
    }

    private static Activity GetActivityData()
    {
      return new Activity("{activityId}"){
        Name = "Test Activity",
        ActivityId = "activityId",
        StudentId = "studentId",
        Description = "Test description",
        PublishDate = "02-02-2022",
        Deadline = "10-02-2022",
        DifficultyLevel = "2",
        Status = "Nueva",
        Sections = new List<string>(),
        Timer = 0,
      };
    }

    private static Field GetFieldData()
    {
      return new Field("{fieldId}"){
        Name = "Field",
        Description = "Field",
        Section = "G",
        Type = "simple",
        CellName = "Field",
        RequiresInterpretation = false
      };
    }

    private static IEnumerable<Aid> GetAidsData(int quantity)
    {
      var aids = new List<Aid>();
      for (var i = 0; i < quantity; i++) aids.Add(Mock.Of<Aid>());
      return aids;
    }

    private static IEnumerable<Field> GetFieldsData(int quantity)
    {
      var fields = new List<Field>();
      for (var i = 0; i < quantity; i++) fields.Add(Mock.Of<Field>());
      return fields;
    }

    private static IEnumerable<NaField> GetNaFieldsData(int quantity)
    {
      var naFields = new List<NaField>();
      for (var i = 0; i < quantity; i++) naFields.Add(Mock.Of<NaField>());
      return naFields;
    }

    private static IEnumerable<Section> GetSectionsData(int quantity)
    {
      var sections = new List<Section>();
      for (var i = 0; i < quantity; i++) sections.Add(Mock.Of<Section>());
      return sections;
    }

    private static IEnumerable<NaSection> GetNaSectionsData(int quantity)
    {
      var naSections = new List<NaSection>();
      for (var i = 0; i < quantity; i++) naSections.Add(Mock.Of<NaSection>());
      return naSections;
    }

    private static IEnumerable<NaForm> GetNaFormsData(int quantity)
    {
      var naForms = new List<NaForm>();
      for (var i = 0; i < quantity; i++) naForms.Add(Mock.Of<NaForm>());
      return naForms;
    }

    private static NaForm GetNaFormData()
    {
      return new NaForm("{formId}"){
        Sections = new List<NaSection>(),
        ActivityId = "123",
        StudentId = ""
      };
    }
  }
}
