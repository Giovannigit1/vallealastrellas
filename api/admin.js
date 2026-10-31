// api/admin.js - Vercel Serverless Function
// Panel de administración protegido para "Del valle a la mesa"
// Gestión de reservas y suscriptores desde Supabase PostgreSQL

const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  // Configurar CORS básico si fuera necesario
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  try {
    const { password, action = 'get_data', id, code, status } = req.body || {};
    const expectedPassword = process.env.ADMIN_PASSWORD || 'elqui2026';

    if (!password || password !== expectedPassword) {
      return res.status(401).json({ success: false, message: 'Contraseña de administrador incorrecta' });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lvaveuipaxivyygcsyhb.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ success: false, message: 'Base de datos no configurada en el servidor' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Obtener datos completos
    if (action === 'get_data') {
      const [resResult, subResult] = await Promise.all([
        supabase.from('reservations').select('*').order('created_at', { ascending: false }),
        supabase.from('subscribers').select('*').order('created_at', { ascending: false })
      ]);

      if (resResult.error) console.error('[Admin DB Error reservations]', resResult.error.message);
      if (subResult.error) console.error('[Admin DB Error subscribers]', subResult.error.message);

      const allRes = resResult.data || [];
      const normalReservations = allRes.filter(r => r.discount_code !== 'COMMUNITY_COMMENT');
      const communityComments = allRes.filter(r => r.discount_code === 'COMMUNITY_COMMENT');

      return res.status(200).json({
        success: true,
        reservations: normalReservations,
        subscribers: subResult.data || [],
        comments: communityComments
      });
    }

    // 2. Actualizar estado de una reserva
    if (action === 'update_status') {
      if (!code && !id) {
        return res.status(400).json({ success: false, message: 'Identificador de reserva faltante' });
      }

      const query = supabase.from('reservations').update({ status: status || 'confirmed' });
      if (code) query.eq('code', code);
      else if (id) query.eq('id', id);

      const { error } = await query;
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({ success: true, message: 'Estado actualizado correctamente' });
    }

    // 3. Eliminar reserva o comentario
    if (action === 'delete_reservation') {
      if (!code && !id) {
        return res.status(400).json({ success: false, message: 'Identificador de reserva faltante' });
      }

      const query = supabase.from('reservations').delete();
      if (code) query.eq('code', code);
      else if (id) query.eq('id', id);

      const { error } = await query;
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({ success: true, message: 'Registro eliminado con éxito' });
    }

    // 4. Eliminar suscriptor
    if (action === 'delete_subscriber') {
      const targetEmail = req.body.email;
      if (!id && !targetEmail) {
        return res.status(400).json({ success: false, message: 'Identificador de suscriptor faltante' });
      }

      const query = supabase.from('subscribers').delete();
      if (id) query.eq('id', id);
      else if (targetEmail) query.eq('email', targetEmail);

      const { error } = await query;
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({ success: true, message: 'Suscriptor eliminado con éxito' });
    }

    return res.status(400).json({ success: false, message: 'Acción no reconocida' });

  } catch (err) {
    console.error('[Admin Server Error]', err);
    return res.status(500).json({ success: false, message: 'Error interno del servidor administrativo' });
  }
};
