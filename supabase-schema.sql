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

-- Datos de prueba (UUIDs generados — reemplazar con los IDs reales de producción)
insert into invitados (id, nombre, celular, num_invitados)
values
  ('35867478-4c13-4760-a8e4-2cc8f467e07c', 'Juan Pérez', '+521234567890', 2),
  ('1211463d-e6a6-41c7-bf40-3e50853eea30', 'María García', '+529876543210', 4)
on conflict (id) do nothing;

-- Para agregar invitados reales, omitir el campo id y se generará automáticamente:
-- insert into invitados (nombre, celular, num_invitados) values ('Nombre', '+52...', 2);
