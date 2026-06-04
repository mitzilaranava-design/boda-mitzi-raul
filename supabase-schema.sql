-- Tabla invitados para Boda Mitzi & Raúl
-- Ejecutar en el SQL Editor de Supabase

create table if not exists invitados (
  id text primary key default gen_random_uuid()::text,
  nombre text not null,
  celular text,
  num_invitados int default 1,
  num_confirmados int default 0,
  confirmado boolean default false,
  creado_at timestamptz default now(),
  actualizado_at timestamptz default now()
);

-- Habilitar RLS (Row Level Security)
alter table invitados enable row level security;

-- Permitir lectura/escritura para usuarios anónimos (el anon key)
-- Ajustar políticas según tu seguridad
create policy "Lectura pública" on invitados for select using (true);
create policy "Actualizar confirmación" on invitados for update using (true);

-- UUID como default en id (si la tabla ya existe, ejecutar esta línea)
alter table invitados alter column id set default gen_random_uuid()::text;

-- Columnas para recordatorios y Save the Date (agregar si la tabla ya existe)
alter table invitados add column if not exists recordatorios_enviados int default 0;
alter table invitados add column if not exists ultimo_recordatorio timestamptz;
alter table invitados add column if not exists auto_confirmado boolean default false;
alter table invitados add column if not exists save_the_date_enviado boolean default false;
alter table invitados add column if not exists save_the_date_leido boolean default false;
alter table invitados add column if not exists no_asiste boolean default false;
alter table invitados add column if not exists enviar_save_the_date boolean default false;

-- Datos de prueba (UUIDs generados — reemplazar con los IDs reales de producción)
insert into invitados (id, nombre, celular, num_invitados)
values
  ('35867478-4c13-4760-a8e4-2cc8f467e07c', 'Juan Pérez', '+521234567890', 2),
  ('1211463d-e6a6-41c7-bf40-3e50853eea30', 'María García', '+529876543210', 4)
on conflict (id) do nothing;

-- Para agregar invitados reales, omitir el campo id y se generará automáticamente:
-- insert into invitados (nombre, celular, num_invitados) values ('Nombre', '+52...', 2);

-- ─────────────────────────────────────────────────────────────────────────────
-- Galería de Fotos — Boda Mitzi & Raúl
-- ─────────────────────────────────────────────────────────────────────────────

-- Tabla: fotos subidas por los invitados
create table if not exists galeria_fotos (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  nombre text,           -- nombre del invitado (opcional, puede ser null)
  invitado_id text,      -- FK lógica a invitados.id; null si viene de QR externo
  created_at timestamptz default now()
);

-- Si la tabla ya existía, agregar la columna:
alter table galeria_fotos add column if not exists invitado_id text;

-- RLS: lectura pública, insert anónimo, sin delete/update
alter table galeria_fotos enable row level security;
create policy "Lectura pública galería" on galeria_fotos for select using (true);
create policy "Subir fotos" on galeria_fotos for insert with check (true);

-- Tabla: configuración (1 fila, el admin activa/desactiva la galería)
create table if not exists galeria_config (
  id int primary key default 1,
  activa boolean default false,
  constraint single_row check (id = 1)
);

insert into galeria_config (id, activa) values (1, false) on conflict do nothing;

-- RLS: lectura pública, update solo via service role (o anónimo si se prefiere)
alter table galeria_config enable row level security;
create policy "Lectura config galería" on galeria_config for select using (true);
create policy "Actualizar config galería" on galeria_config for update using (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- Supabase Storage — Bucket "galeria"
-- Crear manualmente desde el Dashboard de Supabase:
--   Storage → New bucket → Name: "galeria" → Public: true
-- Policies (desde Dashboard → Storage → galeria → Policies):
--   SELECT: "Lectura pública" → allow for all users (anon)
--   INSERT: "Subir fotos" → allow for all users (anon)
-- ─────────────────────────────────────────────────────────────────────────────
