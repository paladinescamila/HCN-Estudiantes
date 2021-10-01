using System;
using AutoMapper;
using Api.Core.Models.Dtos;
using Api.Core.Models.Fields;

namespace Api.Mappers
{
  public class FieldProfile : Profile
  {
    public FieldProfile()
    {
      this.CreateMap<CreateFieldDto, Field>();
      this.CreateMap<CreateSubFieldDto, Field>();
    }
  }
}
