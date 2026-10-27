import { Resend } from 'resend';
import { Subscriber } from '@/types';
import { updateSubscriberNotified } from './storage';

// Initialize Resend client only if API key is present
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

/**
 * Sends notification email for new subscriptions.
 * Runs strictly on the server.
 * Uses process.env.NOTIFY_EMAIL dynamically and NEVER logs or leaks this address.
 */
export async function notifyNewSubscription(subscriber: Subscriber): Promise<boolean> {
  // Read private recipient strictly from server environment variable
  const recipient = process.env.NOTIFY_EMAIL?.trim();

  if (!recipient) {
    // Note: Do not throw or fail the user experience. Log generic internal message without printing secrets.
    console.info('[NOTIFICATIONS] NOTIFY_EMAIL no está configurado en el entorno del servidor.');
    return false;
  }

  if (!resend) {
    console.info('[NOTIFICATIONS] RESEND_API_KEY no configurado. Notificación omitida.');
    return false;
  }

  const senderEmail = process.env.FROM_EMAIL?.trim() || 'onboarding@resend.dev';

  try {
    // 1. Dispatch internal private notification
    const notificationHtml = `
      <div style="font-family: sans-serif; background-color: #1F1513; color: #FDFBF7; padding: 24px; border-radius: 8px;">
        <h2 style="color: #D4AF37; margin-top: 0;">✨ Nueva Suscripción – Valle a las Estrellas</h2>
        <p>Se ha registrado un nuevo visitante en la comunidad elquina:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; color: #FDFBF7;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #33221E; font-weight: bold; width: 180px;">Nombre:</td>
            <td style="padding: 8px; border-bottom: 1px solid #33221E;">${escapeHtml(subscriber.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #33221E; font-weight: bold;">Correo:</td>
            <td style="padding: 8px; border-bottom: 1px solid #33221E;">${escapeHtml(subscriber.email)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #33221E; font-weight: bold;">¿Con quién nos visita?:</td>
            <td style="padding: 8px; border-bottom: 1px solid #33221E;">${escapeHtml(subscriber.companion_type)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #33221E; font-weight: bold;">Cupón generado:</td>
            <td style="padding: 8px; border-bottom: 1px solid #33221E; color: #D4AF37; font-weight: bold;">${escapeHtml(subscriber.coupon_code)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #33221E; font-weight: bold;">Fecha / Hora:</td>
            <td style="padding: 8px; border-bottom: 1px solid #33221E;">${new Date(subscriber.created_at).toLocaleString('es-CL', { timeZone: 'America/Santiago' })}</td>
          </tr>
        </table>
        <p style="margin-top: 24px; font-size: 12px; color: #EDE7DC;">
          Enviado automáticamente por el servidor de Valle a las Estrellas. Puedes responder directamente a este correo para contactar al suscriptor.
        </p>
      </div>
    `;

    const adminResult = await resend.emails.send({
      from: `Valle a las Estrellas <${senderEmail}>`,
      to: [recipient],
      replyTo: subscriber.email,
      subject: 'Nueva suscripción – Valle a las Estrellas',
      html: notificationHtml,
    });

    if (adminResult.error) {
      console.warn('[NOTIFICATIONS] Resend error dispatching to admin:', adminResult.error.message);
      return false;
    }

    // 2. Dispatch welcome email to subscriber
    try {
      const welcomeHtml = `
        <div style="font-family: sans-serif; background-color: #1F1513; color: #FDFBF7; padding: 28px; border-radius: 8px; max-width: 600px; margin: auto;">
          <h1 style="color: #D4AF37; margin-top: 0; font-size: 24px;">¡Bienvenido al Valle a las Estrellas!</h1>
          <p>Hola <strong>${escapeHtml(subscriber.name)}</strong>,</p>
          <p>Gracias por unirte a nuestra comunidad de viajeros, amantes de la cocina elquina y observadores del cielo.</p>
          
          <div style="background-color: #2D1E1B; border: 1px dashed #D4AF37; border-radius: 6px; padding: 16px; margin: 20px 0; text-align: center;">
            <p style="margin: 0; color: #EDE7DC; font-size: 14px;">Tu código de 15% de descuento para reservas es:</p>
            <p style="margin: 8px 0; color: #D4AF37; font-size: 22px; font-weight: bold; letter-spacing: 2px;">${escapeHtml(subscriber.coupon_code)}</p>
            <p style="margin: 0; color: #EDE7DC; font-size: 12px;">Válido para la experiencia gastronómica diaria (17:00 a 21:00 hrs).</p>
          </div>

          <p>Ya puedes acceder a nuestro <strong>Recetario Digital de Sabores del Valle</strong> con 3 preparaciones exclusivas con papaya, queso de cabra y pisco de autor.</p>
          
          <p style="margin-top: 24px;">
            <a href="https://vallealastrellas.vercel.app/recetario" style="background-color: #D4AF37; color: #1F1513; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">
              📖 Ver Recetario Digital
            </a>
          </p>

          <p style="margin-top: 28px; font-size: 13px; color: #EDE7DC;">
            Cálidos saludos desde los parronales de Paihuano y Vicuña,<br/>
            <em>Equipo de Del valle a la mesa, de la mesa a las estrellas</em>
          </p>
        </div>
      `;

      await resend.emails.send({
        from: `Valle a las Estrellas <${senderEmail}>`,
        to: [subscriber.email],
        subject: 'Tu 15% de descuento y Recetario Digital – Valle a las Estrellas',
        html: welcomeHtml,
      });
    } catch (welcomeErr) {
      console.warn('[NOTIFICATIONS] Welcome email skipped/failed:', welcomeErr);
    }

    // Mark as notified in storage
    await updateSubscriberNotified(subscriber.id, true);
    return true;
  } catch (err) {
    console.warn('[NOTIFICATIONS] Exception during email dispatch:', err);
    return false;
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
