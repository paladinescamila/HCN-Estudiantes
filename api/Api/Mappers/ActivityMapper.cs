using System;
using AutoMapper;
using Api.Core.Models.Dtos;
using Api.Core.Models.Activities;

namespace Api.Mappers
{
  public class ActivityProfile : Profile
  {
    public ActivityProfile()
    {
      this.CreateMap<CreateActivityDto, Activity>();
      this.CreateMap<ActivityTimerDto, Activity>();
    }
  }
}
