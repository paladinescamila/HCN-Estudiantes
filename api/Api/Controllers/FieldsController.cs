using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AutoMapper;
using Api.Core.Models.Fields;
using Api.Application.Fields;
using Api.Core.Models.Dtos;

namespace Api.Controllers
{
  [ApiController]
  [Route("api/v1/fields")]
  public class FieldsController : ControllerBase
  {
    private readonly ILogger<FieldsController> _logger;

    private readonly IFieldsService _service;

    private readonly IMapper _mapper;

    public FieldsController(
      ILogger<FieldsController> logger,
      IFieldsService service,
      IMapper mapper)
    {
      _logger = logger;
       this._mapper = mapper;
      _service = service;
      _logger.LogInformation("Fields Controller was created!");
    }

    [HttpPost]
    public async Task<ActionResult> CreateField(CreateFieldDto dto)
    {
      Field field = this._mapper.Map<Field>(dto);
      var createdField = await _service.CreateField(null, field);
      return Ok(createdField);
    }

    [HttpPost("{parentId}/subfields")]
    public async Task<ActionResult> CreateSubField(string parentId, CreateSubFieldDto dto)
    {
      Field field = this._mapper.Map<Field>(dto);
      var createdField = await _service.CreateField(parentId, field);
      return Ok(createdField);
    }
  }
}
