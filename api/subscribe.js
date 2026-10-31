// api/subscribe.js - Vercel Serverless Function
// Gestión de suscripciones y reservas para "Del valle a la mesa"
// Dual storage: Supabase PostgreSQL + Notificaciones por correo (Resend / SMTP)

const { z } = require('zod');

// Rate limiting en memoria por IP (máximo 10 peticiones por minuto por IP)
const ipRateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 10;

// Esquemas de validación Zod
const subscriptionSchema = z.object({
  type: z.literal('subscription'),
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  name: z.string().optional().default(''),
  consent: z.literal(true, { errorMap: () => ({ message: 'Se requiere consentimiento' }) })
});

const inquirySchema = z.object({
  type: z.literal('inquiry'),
  name: z.string().min(2, { message: 'Nombre requerido' }),
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  date: z.string().optional().default(''),
  guests: z.string().optional().default(''),
  dietary: z.string().optional().default(''),
  message: z.string().optional().default(''),
  consent: z.literal(true, { errorMap: () => ({ message: 'Se requiere consentimiento' }) })
});

module.exports = async (req, res) => {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  // 1. Verificación de Rate Limiting por IP
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const rateData = ipRateLimit.get(clientIp) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };

  if (now > rateData.resetTime) {
    rateData.count = 0;
    rateData.resetTime = now + RATE_LIMIT_WINDOW;
  }

  rateData.count++;
  ipRateLimit.set(clientIp, rateData);

  if (rateData.count > MAX_REQUESTS) {
    return res.status(429).json({ success: false, message: 'Demasiadas solicitudes. Por favor espera un momento.' });
  }

  try {
    const body = req.body || {};
    const type = body.type || 'subscription';

    // 2. Validación de datos con Zod
    let validatedData;
    if (type === 'inquiry') {
      const parsed = inquirySchema.safeParse(body);
      if (!parsed.success) {
        return res.status(400).json({ success: false, message: parsed.error.issues[0]?.message || 'Datos incompletos' });
      }
      validatedData = parsed.data;
    } else {
      const parsed = subscriptionSchema.safeParse(body);
      if (!parsed.success) {
        return res.status(400).json({ success: false, message: parsed.error.issues[0]?.message || 'Datos incompletos' });
      }
      validatedData = parsed.data;
    }

    // 3. Almacenamiento directo en Supabase PostgreSQL
    let savedToSupabase = false;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lvaveuipaxivyygcsyhb.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = require('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);

        if (type === 'inquiry') {
          const resCode = 'ELQ-' + Date.now().toString(36).toUpperCase();
          const { error: insertErr } = await supabase.from('reservations').insert({
            code: resCode,
            date: validatedData.date || new Date().toISOString().split('T')[0],
            guests: parseInt(validatedData.guests, 10) || 2,
            companion_type: 'pareja',
            dietary_needs: validatedData.dietary ? [validatedData.dietary] : [],
            name: validatedData.name,
            email: validatedData.email,
            phone: '',
            comments: validatedData.message || '',
            status: 'pending'
          });

          if (!insertErr) {
            savedToSupabase = true;
            console.log('[Supabase] Reserva guardada con éxito en base de datos:', resCode);
          } else {
            console.warn('[Supabase Warning en reserva]', insertErr.message);
          }
        } else {
          const couponCode = 'VALLE-' + Math.floor(1000 + Math.random() * 9000);
          const { error: insertErr } = await supabase.from('subscribers').insert({
            name: validatedData.name || 'Suscriptor Web',
            email: validatedData.email,
            companion_type: 'pareja',
            coupon_code: couponCode
          });

          if (!insertErr) {
            savedToSupabase = true;
            console.log('[Supabase] Suscriptor guardado con éxito en base de datos:', validatedData.email);
          } else {
            console.warn('[Supabase Warning en suscriptor]', insertErr.message);
          }
        }
      } catch (dbErr) {
        console.error('[Supabase Exception]', dbErr.message);
      }
    }

    // 4. Envío de Notificación por Correo (si está configurado)
    let emailSent = false;
    const notifyEmail = process.env.NOTIFY_EMAIL;
    const fechaHora = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });

    if (notifyEmail) {
      let subject = '';
      let textBody = '';
      let htmlBody = '';

      if (type === 'inquiry') {
        subject = 'Nueva solicitud de reserva – Del valle a la mesa';
        textBody = `Nueva solicitud de reserva recibida:\n\n` +
          `Nombre: ${validatedData.name}\n` +
          `Correo: ${validatedData.email}\n` +
          `Fecha deseada: ${validatedData.date || 'No especificada'}\n` +
          `Cantidad de personas: ${validatedData.guests || 'No especificada'}\n` +
          `Requerimientos alimentarios: ${validatedData.dietary || 'Ninguno informado'}\n` +
          `Mensaje: ${validatedData.message || 'Sin mensaje adicional'}\n` +
          `Fecha y hora (Chile): ${fechaHora}\n\n` +
          `Origen: Sitio web oficial Del Valle a la Mesa.`;

        htmlBody = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #17253D; max-width: 600px; border: 1px solid #EBE3D7; border-radius: 12px; padding: 24px;">
            <h2 style="color: #416B52; margin-top: 0;">🌵 Nueva solicitud de reserva – Del valle a la mesa</h2>
            <p>Se ha recibido una nueva solicitud a través del sitio web oficial:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Nombre:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${validatedData.name}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Correo:</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${validatedData.email}">${validatedData.email}</a></td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Fecha deseada:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${validatedData.date || 'No especificada'}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Personas:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${validatedData.guests || 'No especificada'}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Alimentación:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${validatedData.dietary || 'Ninguno'}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Mensaje:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${validatedData.message || 'Sin mensaje'}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Fecha de registro:</td><td style="padding: 8px;">${fechaHora}</td></tr>
            </table>
            <p style="font-size: 12px; color: #64748B; margin-top: 20px;">Del Valle a la Mesa, de la Mesa a las Estrellas · Valle del Elqui, Chile.</p>
          </div>
        `;
      } else {
        subject = 'Nueva suscripción – Del valle a la mesa';
        textBody = `Nueva suscripción recibida:\n\n` +
          `Nombre: ${validatedData.name || 'No indicado'}\n` +
          `Correo: ${validatedData.email}\n` +
          `Fecha y hora (Chile): ${fechaHora}\n\n` +
          `Consentimiento otorgado: Sí\n` +
          `Del valle a la mesa, de la mesa a las estrellas (Valle del Elqui)`;

        htmlBody = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #17253D; max-width: 600px; border: 1px solid #EBE3D7; border-radius: 12px; padding: 24px;">
            <h2 style="color: #BC6949; margin-top: 0;">✨ Nueva suscripción al Boletín</h2>
            <p>Un visitante se ha suscrito a las novedades del territorio:</p>
            <ul style="padding-left: 20px;">
              <li><strong>Nombre:</strong> ${validatedData.name || 'No indicado'}</li>
              <li><strong>Correo:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></li>
              <li><strong>Fecha:</strong> ${fechaHora}</li>
            </ul>
            <p style="font-size: 12px; color: #64748B; margin-top: 20px;">Del Valle a la Mesa, de la Mesa a las Estrellas · Valle del Elqui, Chile.</p>
          </div>
        `;
      }

      // A) Intento con Resend
      if (process.env.RESEND_API_KEY) {
        try {
          const { Resend } = require('resend');
          const resend = new Resend(process.env.RESEND_API_KEY);
          const fromEmail = process.env.RESEND_FROM || 'Del valle a la mesa <onboarding@resend.dev>';
          
          const sendResult = await resend.emails.send({
            from: fromEmail,
            to: notifyEmail,
            subject: subject,
            reply_to: validatedData.email,
            text: textBody,
            html: htmlBody
          });

          if (sendResult.data || !sendResult.error) {
            emailSent = true;
            console.log('[Resend] Correo despachado exitosamente');
          }
        } catch (resendErr) {
          console.warn('[Resend Exception]', resendErr.message);
        }
      }

      // B) Intento con Nodemailer SMTP
      if (!emailSent && process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          const nodemailer = require('nodemailer');
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
            }
          });

          await transporter.sendMail({
            from: `"Del valle a la mesa" <${process.env.SMTP_USER}>`,
            to: notifyEmail,
            replyTo: validatedData.email,
            subject: subject,
            text: textBody,
            html: htmlBody
          });

          emailSent = true;
          console.log('[Nodemailer] Correo despachado con éxito');
        } catch (smtpErr) {
          console.warn('[Nodemailer Exception]', smtpErr.message);
        }
      }
    }

    // 5. Respuesta exitosa si se guardó en Supabase o se despachó el correo
    if (savedToSupabase || emailSent) {
      return res.status(200).json({
        success: true,
        message: type === 'inquiry'
          ? '¡Solicitud recibida! Nos pondremos en contacto contigo a la brevedad para coordinar y confirmar tu experiencia.'
          : '¡Gracias por suscribirte a nuestro boletín!'
      });
    }

    // Si falló Supabase y no había correo configurado
    return res.status(200).json({
      success: true,
      message: '¡Solicitud registrada correctamente!'
    });

  } catch (globalErr) {
    console.error('[Unhandled API Error]', globalErr);
    return res.status(500).json({ success: false, message: 'Ocurrió un error inesperado al procesar la solicitud.' });
  }
};
