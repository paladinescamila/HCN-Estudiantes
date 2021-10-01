using System;
using System.Collections.Generic;
using System.Collections;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using System.Linq;
using Api.Infrastructure.Config;
using Api.Core.Models.Sections;
using Api.Core.Models.Fields;
using Api.Core.Models.Activities;
using Api.Core.Models.Forms;
using Api.Core.Models.Aids;
using System.Text.Json.Serialization;
using Api.Infrastructure.Persistence.Fields;
using Api.Infrastructure.Persistence.Sections;

namespace Api.Infrastructure.Persistence.Forms
{
  public class MongoFormsRepository : IFormsRepository
  {
    private readonly IMongoCollection<NaForm> _forms;

    public MongoFormsRepository(MongoConnection connection)
    {
      _forms = connection.GetCollection<NaForm>("forms");
    }

    public async Task<NaForm> GenerateForm(NaForm form)
    {
      await _forms.InsertOneAsync(form);
      return form;
    }

    public async Task<bool> UpdateForm(NaForm form)
    {
      var opResult = await _forms.ReplaceOneAsync(f => f.Id == form.Id, form);
      return opResult.ModifiedCount > 0;
    }

    public async Task<NaForm> GetFormById(string id)
    {
      return await _forms.Find(form => form.Id == id).FirstOrDefaultAsync();
    }

    public async Task<NaForm> GetFormByActivityId(string activityId)
    {
      return await _forms.Find(form => form.ActivityId == activityId).FirstOrDefaultAsync();
    }
  }
}
