import { createClient } from '@supabase/supabase-js';
import { Reservation, ReservationInput, Subscriber, SubscriberInput } from '@/types';
import { generateReservationCode, generateCouponCode } from './storage-local';
import { SITE_CONFIG } from '@/data/site';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('placeholder') &&
    supabaseKey.length > 20
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseKey!, {
      auth: { persistSession: false },
    })
  : null;

export async function getSupabaseReservations(): Promise<Reservation[]> {
  if (!supabase) throw new Error('Supabase no configurado');
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Reservation[];
}

export async function getSupabaseAvailability(date: string): Promise<{ booked: number; remaining: number }> {
  if (!supabase) throw new Error('Supabase no configurado');
  const { data, error } = await supabase
    .from('reservations')
    .select('guests')
    .eq('date', date)
    .eq('status', 'confirmed');

  if (error) throw error;
  const booked = (data || []).reduce((acc: number, curr: { guests: number }) => acc + curr.guests, 0);
  const remaining = Math.max(0, SITE_CONFIG.experience.maxDailyCapacity - booked);
  return { booked, remaining };
}

export async function saveSupabaseReservation(input: ReservationInput): Promise<Reservation> {
  if (!supabase) throw new Error('Supabase no configurado');

  const { remaining } = await getSupabaseAvailability(input.date);
  if (input.guests > remaining) {
    throw new Error(`Solo quedan ${remaining} cupos para la fecha seleccionada.`);
  }

  const isDiscount =
    input.discount_code &&
    (input.discount_code.trim().toUpperCase() === SITE_CONFIG.experience.discountCouponDefault ||
      input.discount_code.trim().toUpperCase().startsWith('ELQUI15-'));

  const newReservation: Reservation = {
    id: `res-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    code: generateReservationCode(),
    date: input.date,
    guests: input.guests,
    companion_type: input.companion_type,
    dietary_needs: input.dietary_needs || [],
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    comments: input.comments?.trim(),
    discount_code: input.discount_code?.trim().toUpperCase(),
    discount_applied: isDiscount ? 15 : 0,
    status: 'confirmed',
    created_at: new Date().toISOString(),
  };

  const { error } = await supabase.from('reservations').insert(newReservation);
  if (error) throw error;

  return newReservation;
}

export async function getSupabaseSubscribers(): Promise<Subscriber[]> {
  if (!supabase) throw new Error('Supabase no configurado');
  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Subscriber[];
}

export async function saveSupabaseSubscriber(input: SubscriberInput): Promise<Subscriber> {
  if (!supabase) throw new Error('Supabase no configurado');
  const cleanEmail = input.email.trim().toLowerCase();

  // Check existing
  const { data: existing } = await supabase
    .from('subscribers')
    .select('*')
    .eq('email', cleanEmail)
    .maybeSingle();

  if (existing) {
    return existing as Subscriber;
  }

  const newSubscriber: Subscriber = {
    id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: input.name.trim(),
    email: cleanEmail,
    companion_type: input.companion_type,
    coupon_code: generateCouponCode(),
    notified: false,
    created_at: new Date().toISOString(),
  };

  const { error } = await supabase.from('subscribers').insert(newSubscriber);
  if (error) throw error;

  return newSubscriber;
}

export async function updateSupabaseSubscriberNotified(id: string, notified: boolean): Promise<void> {
  if (!supabase) return;
  await supabase.from('subscribers').update({ notified }).eq('id', id);
}
