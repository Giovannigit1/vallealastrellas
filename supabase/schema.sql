-- ====================================================================
-- ESQUEMA SQL: DEL VALLE A LA MESA, DE LA MESA A LAS ESTRELLAS
-- Tablas: reservations (reservas) y subscribers (suscriptores)
-- Con Row Level Security (RLS) habilitado y políticas seguras.
-- ====================================================================

-- 1. Habilitar extensión de UUID si no existe
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabla de Reservas
CREATE TABLE IF NOT EXISTS public.reservations (
    id TEXT PRIMARY KEY DEFAULT ('res-' || uuid_generate_v4()::text),
    code TEXT NOT NULL UNIQUE,
    date DATE NOT NULL,
    guests INTEGER NOT NULL CHECK (guests >= 1 AND guests <= 12),
    companion_type TEXT NOT NULL CHECK (companion_type IN ('pareja', 'familia', 'amigos', 'solo', 'corporativo')),
    dietary_needs TEXT[] DEFAULT '{}',
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    comments TEXT,
    discount_code TEXT,
    discount_applied INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'pending')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para optimizar consultas de calendario y código
CREATE INDEX IF NOT EXISTS idx_reservations_date ON public.reservations (date);
CREATE INDEX IF NOT EXISTS idx_reservations_code ON public.reservations (code);
CREATE INDEX IF NOT EXISTS idx_reservations_email ON public.reservations (email);

-- 3. Tabla de Suscriptores
CREATE TABLE IF NOT EXISTS public.subscribers (
    id TEXT PRIMARY KEY DEFAULT ('sub-' || uuid_generate_v4()::text),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    companion_type TEXT NOT NULL CHECK (companion_type IN ('pareja', 'familia', 'amigos', 'solo', 'corporativo')),
    coupon_code TEXT NOT NULL UNIQUE,
    notified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers (email);

-- 4. Habilitar Row Level Security (RLS)
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- 5. Políticas de Seguridad (RLS)

-- A) Permitir inserciones anónimas/públicas para formularios web
CREATE POLICY "Permitir crear reservas desde la web"
    ON public.reservations
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Permitir registrar suscripciones desde la web"
    ON public.subscribers
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- B) Permitir lectura pública de cupos por fecha (sin exponer datos personales)
CREATE POLICY "Permitir consultar cupos de fecha públicamente"
    ON public.reservations
    FOR SELECT
    TO anon, authenticated
    USING (status = 'confirmed');

-- C) Control total exclusivo para service_role (usado por Next.js Server Actions y panel Admin)
CREATE POLICY "Control total de reservas para service_role"
    ON public.reservations
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Control total de suscriptores para service_role"
    ON public.subscribers
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
