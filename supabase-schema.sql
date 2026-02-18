-- Tabla invitados para Boda Mitzi & Raúl
-- Ejecutar en el SQL Editor de Supabase

create table if not exists invitados (
  id text primary key,
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

-- Datos de prueba
insert into invitados (id, nombre, celular, num_invitados)
values
  ('inv-001', 'Juan Pérez', '+521234567890', 2),
  ('inv-002', 'María García', '+529876543210', 4)
on conflict (id) do nothing;
