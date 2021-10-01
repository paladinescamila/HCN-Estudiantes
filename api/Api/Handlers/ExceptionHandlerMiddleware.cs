using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Api.Core.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Api.Handlers
{
  public class ExceptionHandlerMiddleware
  {
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlerMiddleware> _logger;

    public ExceptionHandlerMiddleware(RequestDelegate next, ILogger<ExceptionHandlerMiddleware> logger)
    {
      _next = next;
      _logger = logger;
      _logger.LogInformation("Exception Middleware was created");

    }

    public async Task Invoke(HttpContext context)
    {
      try
      {
        await this._next(context);
      }
      catch (Exception ex)
      {
        var response = context.Response;
        response.ContentType = "application/json";
        response.StatusCode = ex switch
        {
          AlreadyExistsException => (int)HttpStatusCode.Conflict,
          NotFoundException => (int)HttpStatusCode.NotFound,
          BadHttpRequestException => (int)HttpStatusCode.BadRequest,
          _ => (int)HttpStatusCode.InternalServerError
        };

        _logger.LogError($"Error: {ex.Message} - of type: {ex.GetType()} - exception: {ex}");
        var result = JsonSerializer.Serialize(new Error(ex.ToString()));
        await response.WriteAsync(result);
      }
    }
  }
}
