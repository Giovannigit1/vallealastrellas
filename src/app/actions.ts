'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { saveReservation, getAvailability, saveSubscriber } from '@/lib/storage';
import { notifyNewSubscription } from '@/lib/notifications';
import { checkRateLimit } from '@/lib/rate-limit';
import { CompanionType, DietaryNeed, Reservation, Subscriber } from '@/types';
import { cookies } from 'next/headers';

// Validation Schemas
const ReservationSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
  guests: z.coerce.number().min(1, 'Mínimo 1 persona').max(12, 'Máximo 12 comensales por grupo'),
  companion_type: z.enum(['pareja', 'familia', 'amigos', 'solo', 'corporativo'] as const, {
    message: 'Selecciona con quién nos visitas',
  }),
  dietary_needs: z.array(z.string()).optional(),
  name: z.string().min(2, 'Por favor ingresa tu nombre y apellido').max(100),
  email: z.string().email('Por favor ingresa un correo electrónico válido'),
  phone: z.string().min(8, 'Ingresa un número de contacto o WhatsApp válido').max(20),
  comments: z.string().max(500).optional(),
  discount_code: z.string().max(30).optional(),
});

const SubscriberSchema = z.object({
  name: z.string().min(2, 'Por favor ingresa tu nombre').max(100),
  email: z.string().email('Por favor ingresa un correo electrónico válido'),
  companion_type: z.enum(['pareja', 'familia', 'amigos', 'solo', 'corporativo'] as const, {
    message: 'Selecciona con quién nos visitas',
  }),
  website_url: z.string().optional(), // Honeypot anti-spam
});

export type ActionResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function createReservationAction(formData: FormData): Promise<ActionResponse<Reservation>> {
  try {
    const rawDietary = formData.getAll('dietary_needs') as DietaryNeed[];

    const rawData = {
      date: formData.get('date'),
      guests: formData.get('guests'),
      companion_type: formData.get('companion_type'),
      dietary_needs: rawDietary,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      comments: formData.get('comments') || undefined,
      discount_code: formData.get('discount_code') || undefined,
    };

    const parsed = ReservationSchema.safeParse(rawData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        const path = err.path[0]?.toString();
        if (path) fieldErrors[path] = err.message;
      });
      return {
        success: false,
        error: 'Por favor revisa los campos señalados.',
        fieldErrors,
      };
    }

    const { date, guests, companion_type, dietary_needs, name, email, phone, comments, discount_code } = parsed.data;

    // Check availability
    const { remaining } = await getAvailability(date);
    if (guests > remaining) {
      return {
        success: false,
        error: `Lo sentimos, para el día ${date} solo quedan ${remaining} cupos disponibles de un máximo de 12.`,
      };
    }

    const reservation = await saveReservation({
      date,
      guests,
      companion_type: companion_type as CompanionType,
      dietary_needs: (dietary_needs || []) as DietaryNeed[],
      name,
      email,
      phone,
      comments,
      discount_code,
    });

    return {
      success: true,
      data: reservation,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error inesperado al procesar la reserva';
    return {
      success: false,
      error: message,
    };
  }
}

export async function subscribeAction(formData: FormData): Promise<ActionResponse<Subscriber>> {
  try {
    // 1. Check IP rate limit
    const headerList = await headers();
    const forwardedFor = headerList.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    const rateLimit = checkRateLimit(ip, 8, 3600000);
    if (!rateLimit.success) {
      return {
        success: false,
        error: 'Demasiadas solicitudes desde tu conexión. Por favor intenta más tarde.',
      };
    }

    // 2. Validate input
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      companion_type: formData.get('companion_type'),
      website_url: formData.get('website_url') || '',
    };

    // Honeypot trap check
    if (rawData.website_url && rawData.website_url.toString().trim() !== '') {
      // Silently pretend success to deceive spam bots
      return {
        success: true,
        data: {
          id: 'bot-sink',
          name: 'Visitante',
          email: 'bot@sink.local',
          companion_type: 'solo',
          coupon_code: 'ELQUI15-BOT',
          notified: true,
          created_at: new Date().toISOString(),
        },
      };
    }

    const parsed = SubscriberSchema.safeParse(rawData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        const path = err.path[0]?.toString();
        if (path) fieldErrors[path] = err.message;
      });
      return {
        success: false,
        error: 'Revisa los datos ingresados.',
        fieldErrors,
      };
    }

    const { name, email, companion_type } = parsed.data;

    // 3. Save subscriber first (guarantees coupon generation)
    const subscriber = await saveSubscriber({
      name,
      email,
      companion_type: companion_type as CompanionType,
    });

    // 4. Dispatch private server-side email notifications in background
    // (Never reveals or exposes NOTIFY_EMAIL to client)
    notifyNewSubscription(subscriber).catch((err) => {
      console.warn('[SUBSCRIBE ACTION] Notification task error:', err);
    });

    return {
      success: true,
      data: subscriber,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al registrar suscripción';
    return {
      success: false,
      error: message,
    };
  }
}

export async function checkDateAvailabilityAction(date: string) {
  try {
    return await getAvailability(date);
  } catch {
    return { booked: 0, remaining: 12 };
  }
}

export async function adminLoginAction(password: string): Promise<{ success: boolean; error?: string }> {
  const adminSecret = process.env.ADMIN_PASSWORD || 'elqui2026';
  if (password === adminSecret) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated_valle', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600 * 8, // 8 hours
      path: '/',
    });
    return { success: true };
  }
  return { success: false, error: 'Contraseña de administrador incorrecta' };
}

export async function adminLogoutAction(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return { success: true };
}
