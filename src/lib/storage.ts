import { Reservation, ReservationInput, Subscriber, SubscriberInput } from '@/types';
import {
  isSupabaseConfigured,
  getSupabaseReservations,
  getSupabaseAvailability,
  saveSupabaseReservation,
  getSupabaseSubscribers,
  saveSupabaseSubscriber,
  updateSupabaseSubscriberNotified,
} from './storage-supabase';
import {
  getLocalReservations,
  getLocalAvailability,
  saveLocalReservation,
  getLocalSubscribers,
  saveLocalSubscriber,
  updateLocalSubscriberNotified,
} from './storage-local';

export function getStorageMode(): 'supabase' | 'local' {
  return isSupabaseConfigured ? 'supabase' : 'local';
}

export async function getReservations(): Promise<Reservation[]> {
  if (isSupabaseConfigured) {
    try {
      return await getSupabaseReservations();
    } catch (err) {
      console.warn('[STORAGE] Supabase fetch failed, falling back to local storage:', err);
    }
  }
  return await getLocalReservations();
}

export async function getAvailability(date: string): Promise<{ booked: number; remaining: number }> {
  if (isSupabaseConfigured) {
    try {
      return await getSupabaseAvailability(date);
    } catch (err) {
      console.warn('[STORAGE] Supabase availability failed, falling back to local storage:', err);
    }
  }
  return await getLocalAvailability(date);
}

export async function saveReservation(input: ReservationInput): Promise<Reservation> {
  if (isSupabaseConfigured) {
    try {
      return await saveSupabaseReservation(input);
    } catch (err) {
      console.warn('[STORAGE] Supabase save failed, falling back to local storage:', err);
    }
  }
  return await saveLocalReservation(input);
}

export async function getSubscribers(): Promise<Subscriber[]> {
  if (isSupabaseConfigured) {
    try {
      return await getSupabaseSubscribers();
    } catch (err) {
      console.warn('[STORAGE] Supabase fetch subscribers failed, falling back to local storage:', err);
    }
  }
  return await getLocalSubscribers();
}

export async function saveSubscriber(input: SubscriberInput): Promise<Subscriber> {
  if (isSupabaseConfigured) {
    try {
      return await saveSupabaseSubscriber(input);
    } catch (err) {
      console.warn('[STORAGE] Supabase save subscriber failed, falling back to local storage:', err);
    }
  }
  return await saveLocalSubscriber(input);
}

export async function updateSubscriberNotified(id: string, notified: boolean): Promise<void> {
  if (isSupabaseConfigured) {
    try {
      await updateSupabaseSubscriberNotified(id, notified);
      return;
    } catch (err) {
      console.warn('[STORAGE] Supabase update notified failed:', err);
    }
  }
  await updateLocalSubscriberNotified(id, notified);
}
