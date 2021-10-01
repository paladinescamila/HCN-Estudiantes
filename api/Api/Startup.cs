using Api.Infrastructure.Config;
using AutoMapper;
using Api.Mappers;
using Api.Infrastructure.Persistence.Fields;
using Api.Infrastructure.Persistence.Sections;
using Api.Infrastructure.Persistence.Forms;
using Api.Infrastructure.Persistence.Aids;
using Api.Infrastructure.Persistence.Activities;
using Api.Infrastructure.TeacherApp;
using Api.Application.Fields;
using Api.Application.Sections;
using Api.Application.Forms;
using Api.Application.Aids;
using Api.Application.Activities;
using Api.Application.Announcements;
using Api.Handlers;
using Application.Courses;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Api.Infrastructure.Mail;

namespace Api
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {

      MapperConfiguration mapperConfig = new (mc =>
      {
          mc.AddProfile(new FieldProfile());
          mc.AddProfile(new ActivityProfile());
      });
      IMapper mapper = mapperConfig.CreateMapper();
      services.AddSingleton(mapper);
      services.Configure<MongoSettings>(this.Configuration.GetSection("MongoSettings"));
      services.AddCors();
      services.AddControllers();
      services.AddSwaggerGen(c =>
      {
          c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api", Version = "v1" });
      });
      services.TryAddSingleton(sp => sp.GetRequiredService<IOptions<MongoSettings>>().Value);
      services.TryAddSingleton<MongoConnection>();
      services.TryAddSingleton<IFieldsRepository, MongoFieldsRepository>();
      services.TryAddSingleton<INaFieldsRepository, MongoNaFieldsRepository>();
      services.TryAddSingleton<ISectionsRepository, MongoSectionsRepository>();
      services.TryAddSingleton<INaSectionsRepository, MongoNaSectionsRepository>();
      services.TryAddSingleton<IFormsRepository, MongoFormsRepository>();
      services.TryAddSingleton<IAidsRepository, MongoAidsRepository>();
      services.TryAddSingleton<IFieldsService, FieldsService>();
      services.TryAddSingleton<ISectionsService, SectionsService>();
      services.TryAddSingleton<IFormsService, FormsService>();
      services.TryAddSingleton<IAidsService, AidsService>();
      services.TryAddSingleton<TeacherEndpointsController>();
      services.TryAddSingleton<MailController>();
      services.TryAddSingleton<IActivitiesRepository, MongoActivitiesRepository>();
      services.TryAddSingleton<IActivitiesService, ActivitiesService>();
      services.TryAddSingleton<IAnnouncementService, AnnouncementService>();
      services.TryAddSingleton<ICourseService, CourseService>();
    }

     public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      app.UseSwagger();
      app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Api v1"));
      app.UseMiddleware<ExceptionHandlerMiddleware>();
      //For the CORS policity
      app.UseCors(options =>
      {
        options.AllowAnyOrigin();
        options.AllowAnyMethod();
        options.AllowAnyHeader();
      });


      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
    }
  }
}
