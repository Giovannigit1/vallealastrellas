---
name: supabase-adapter-fallback
description: Dual storage architecture coupling Supabase PostgreSQL with an infallible local storage fallback to ensure rock-solid live demonstrations.
---

# Supabase & Resilient Fallback Storage Architecture

## Architecture Goal
In live client demonstrations, missing credentials, network firewalls, or expired API tokens must **NEVER** crash the application or show error dialogs. The application dynamically detects if Supabase credentials exist and switches transparently between:
1. **Remote Cloud Storage**: Supabase Postgres via official `@supabase/supabase-js`.
2. **Local Fallback Storage**: Secure server-side local JSON file / in-memory store in temporary or data directory (`data/reservations.json`, `data/subscribers.json`).

## Dual-Driver Pattern
```typescript
interface StorageDriver {
  saveReservation(data: ReservationInput): Promise<ReservationResult>;
  getReservations(): Promise<Reservation[]>;
  saveSubscriber(data: SubscriberInput): Promise<SubscriberResult>;
  getSubscribers(): Promise<Subscriber[]>;
  getAvailability(date: string): Promise<{ booked: number; remaining: number }>;
}
```

## Security & Privacy Rules
- For Supabase: execute queries strictly with Row Level Security (RLS) enabled.
- For Notifications: handle private email notifications asynchronously after storage write.
- Store failure state (`notificado: false`) if email notification fails, but return success to visitor so their booking or subscription is guaranteed.
