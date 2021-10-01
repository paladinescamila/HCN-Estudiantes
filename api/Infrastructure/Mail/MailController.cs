namespace Api.Infrastructure.Mail
{
  using Api.Core.Models.Activities;
  using MailKit.Net.Smtp;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.Extensions.Logging;
  using MimeKit;
  using System.Globalization;
  using System;

  public class MailController : ControllerBase
  {
    private readonly ILogger<MailController> _logger;
    public MailController(ILogger<MailController> logger)
    {
      _logger = logger;
    }

    public IActionResult SendEmailConfirmation(EndActivity endActivity, string activityName)
    {
      MimeMessage message = new();

      //Configure the sender
      MailboxAddress from = new("Simulador HCN bot",
      "simhcnbot@gmail.com");
      message.From.Add(from);

      //Configure the recipient data
      MailboxAddress to = new(endActivity.RecipientName,
      endActivity.Email);
      message.To.Add(to);

      message.Subject = "¡Su actividad ha sido enviada con éxito!";

      //Construct the body message
      BodyBuilder bodyBuilder = new();
      bodyBuilder.HtmlBody ="<div><h4>¡Su actividad ha sido enviada con éxito!</h4>"+
        "<p>Una vez haya sido revisada por su docente podrá mirar los comentarios seleccionado la actividad en la sección 'Retroalimentación' de la página. </p>" +
        "<p>Igualmente, todas las actividades enviadas que aún no han sido revisadas por el docente, se encuentran en la misma sección para que pueda visualizar cuando cambia de estado. </p>" +
        "<b>Detalles de la entrega:</b>" +
        $"<ul><li><i> Nombre de la actividad: </i>{activityName} </li><li><i> Fecha de envío: </i>{DateTime.Now.ToString("dddd, dd MMMM yyyy hh:mm:ss tt", new CultureInfo("es-ES"))}</li></ul></div>";

      message.Body = bodyBuilder.ToMessageBody();

      try {
        SmtpClient client = new();
        client.Connect("smtp.gmail.com", 465, true);
        client.Authenticate("simhcnbot@gmail.com", "HCNStudents1#");
        client.Send(message);
        client.Disconnect(true);
        client.Dispose();
        return new StatusCodeResult((int)System.Net.HttpStatusCode.OK);
      } catch (Exception ex)
      {
        _logger.LogError(ex.ToString());
        return new StatusCodeResult((int)System.Net.HttpStatusCode.Conflict);
      }
    }
  }
}
