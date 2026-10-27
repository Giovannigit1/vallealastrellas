import fs from 'fs';
import path from 'path';
import { Reservation, ReservationInput, Subscriber, SubscriberInput } from '@/types';
import { SITE_CONFIG } from '@/data/site';

const DATA_DIR = path.join(process.cwd(), '.data');
const RESERVATIONS_FILE = path.join(DATA_DIR, 'reservations.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

// Ensure directory exists
function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn('[STORAGE] Could not create .data directory, running in-memory fallback:', err);
  }
}

// In-memory fallback in case filesystem is restricted (e.g. read-only serverless environment)
let memoryReservations: Reservation[] = [
  {
    id: 'res-seed-1',
    code: 'ELQ-2026-A101',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    guests: 4,
    companion_type: 'familia',
    dietary_needs: ['alergico_celiaco', 'menu_infantil'],
    name: 'Carolina Morales',
    email: 'carolina.morales@ejemplo.cl',
    phone: '+56 9 9123 4567',
    comments: 'Una persona es celíaca estricta, favor extremar precauciones.',
    discount_code: 'VALLE15',
    discount_applied: 15,
    status: 'confirmed',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'res-seed-2',
    code: 'ELQ-2026-B204',
    date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    guests: 2,
    companion_type: 'pareja',
    dietary_needs: ['adulto_mayor_movilidad'],
    name: 'Ignacio Valenzuela',
    email: 'ignacio.v@ejemplo.cl',
    phone: '+56 9 8456 7890',
    comments: 'Aniversario de matrimonio. Por favor mesa cercana para mi madre.',
    discount_code: undefined,
    status: 'confirmed',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
];

let memorySubscribers: Subscriber[] = [
  {
    id: 'sub-seed-1',
    name: 'Marcela Arancibia',
    email: 'marcela.arancibia@ejemplo.cl',
    companion_type: 'amigos',
    coupon_code: 'ELQUI15-7K9W',
    notified: true,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'sub-seed-2',
    name: 'Rodrigo Fuentes',
    email: 'rodrigo.fuentes@ejemplo.cl',
    companion_type: 'pareja',
    coupon_code: 'ELQUI15-M3P8',
    notified: true,
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    ensureDataDir();
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
      return fallback;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    ensureDataDir();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn(`[STORAGE] Could not write to ${filePath}, kept in memory:`, err);
  }
}

export function generateReservationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ELQ-2026-${rand}`;
}

export function generateCouponCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ELQUI15-${rand}`;
}

export async function getLocalReservations(): Promise<Reservation[]> {
  const list = readJsonFile<Reservation[]>(RESERVATIONS_FILE, memoryReservations);
  memoryReservations = list;
  return list;
}

export async function getLocalAvailability(date: string): Promise<{ booked: number; remaining: number }> {
  const list = await getLocalReservations();
  const bookedForDate = list
    .filter((r) => r.date === date && r.status === 'confirmed')
    .reduce((acc, curr) => acc + curr.guests, 0);

  const maxCapacity = SITE_CONFIG.experience.maxDailyCapacity;
  const remaining = Math.max(0, maxCapacity - bookedForDate);

  return { booked: bookedForDate, remaining };
}

export async function saveLocalReservation(input: ReservationInput): Promise<Reservation> {
  const list = await getLocalReservations();
  const { remaining } = await getLocalAvailability(input.date);

  if (input.guests > remaining) {
    throw new Error(`Solo quedan ${remaining} cupos disponibles para la fecha seleccionada (${input.date}).`);
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

  list.unshift(newReservation);
  memoryReservations = list;
  writeJsonFile(RESERVATIONS_FILE, list);

  return newReservation;
}

export async function getLocalSubscribers(): Promise<Subscriber[]> {
  const list = readJsonFile<Subscriber[]>(SUBSCRIBERS_FILE, memorySubscribers);
  memorySubscribers = list;
  return list;
}

export async function saveLocalSubscriber(input: SubscriberInput): Promise<Subscriber> {
  const list = await getLocalSubscribers();
  const cleanEmail = input.email.trim().toLowerCase();

  // Check if already subscribed
  const existing = list.find((s) => s.email === cleanEmail);
  if (existing) {
    return existing;
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

  list.unshift(newSubscriber);
  memorySubscribers = list;
  writeJsonFile(SUBSCRIBERS_FILE, list);

  return newSubscriber;
}

export async function updateLocalSubscriberNotified(id: string, notified: boolean): Promise<void> {
  const list = await getLocalSubscribers();
  const item = list.find((s) => s.id === id);
  if (item) {
    item.notified = notified;
    memorySubscribers = list;
    writeJsonFile(SUBSCRIBERS_FILE, list);
  }
}
