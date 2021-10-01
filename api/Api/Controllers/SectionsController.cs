using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AutoMapper;
using Api.Core.Models.Fields;
using Api.Core.Models.Sections;
using Api.Core.Models.Dtos;
using Api.Application.Fields;
using Api.Application.Sections;

namespace Api.Controllers
{
  [ApiController]
  [Route("api/v1/sections")]
  public class SectionsController : ControllerBase
  {
    private readonly ILogger<SectionsController> _logger;

    private readonly ISectionsService _service;

    public SectionsController(
      ILogger<SectionsController> logger,
      ISectionsService service)
    {
      _logger = logger;
      _service = service;
      _logger.LogInformation("Sections Controller was created!");
    }

    [HttpPost]
    public async Task<ActionResult> CreateSection(Section section)
    {
      Section createdSection = await _service.CreateSection(section);
      return Ok(createdSection);
    }
  }
}
