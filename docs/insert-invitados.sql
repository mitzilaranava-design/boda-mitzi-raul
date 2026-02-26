-- ============================================================
-- Script de inserción de invitados — Boda Mitzi & Raúl
-- Generado desde docs/lista-save-the-date.csv
--
-- ⚠️  Ejecutar UNA SOLA VEZ en el SQL Editor de Supabase.
--     Los IDs se generan automáticamente (gen_random_uuid()).
--     enviar_save_the_date: true  = habilitado para envío
--                           false = pendiente de activar
-- ============================================================

INSERT INTO invitados (nombre, celular, num_invitados, enviar_save_the_date) VALUES
  ('Rosa Nava',              '+527331447442', 1,  true),
  ('Elizabeth y Juan',       '+527331480883', 3,  true),
  ('Naydelin Sotelo',        '+527331529800', 1,  true),
  ('Evi y Sheila Lara',      '+525568860763', 2,  true),
  ('Levi Lara',              '+527331334504', 1,  true),
  ('Graciela Navarrete',     '+522461246255', 2,  true),
  ('Mayra Lara',             '+527333391829', 1,  true),
  ('Evaristo Antúnez',       '+527331260227', 1,  true),
  ('Alejandro Lara',         '+527443707066', 1,  true),
  ('Cirila & Bianca Loeza',  '+527771859428', 3,  true),
  ('Dalia Loeza',            '+527774772337', 3,  true),
  ('Leticia Loeza',          '+527775032186', 2,  true),
  ('Karla Torres',           '+527772570444', 5,  true),
  ('Karen Torres',           '+527774516196', 2,  true),
  ('Tania Torres',           '+527775013892', 3,  true),
  ('Francisco Torres',       '+527771903155', 1,  true),
  ('Javier García',          '+527777032224', 2,  true),
  ('Itzel Garcia',           '+527772325226', 2,  true),
  ('Patricia Loeza',         '+527773679231', 3,  true),
  ('Daniela Alarcón',        '+527773875875', 4,  true),
  ('Aurelio Loeza',          NULL,            2,  false),
  ('Francisco Nava',         NULL,            2,  false),
  ('Graciela & Ofelia',      '+527772536225', 2,  true),
  ('Denisse Vargas',         '+525551030159', 5,  true),
  ('Aldo Vargas',            '+527772311171', 3,  true),
  ('Aida Ramírez',           '+529982277160', 2,  true),
  ('Benjamín Ramírez',       '+527771205692', 3,  true),
  ('Alfredo Ramírez',        '+527771055770', 4,  true),
  ('Micaela Esquivel',       '+527777883052', 1,  true),
  ('Octavio Ramírez',        '+527772406381', 1,  true),
  ('Brisa Esquivel',         '+527775143314', 3,  true),
  ('Olga Ramírez',           '+527774494680', 1,  true),
  ('David Ramírez',          '+527772132889', 2,  true),
  ('Daniel Ramírez',         '+527773633802', 2,  true),
  ('Edgar Ramírez',          '+524612540932', 3,  true),
  ('Ulises Ramírez',         '+527771033429', 2,  true),
  ('Olga Ramírez',           '+527772253856', 2,  true),
  ('Claudia Esquivel',       '+18326595315',  3,  true),
  ('Edgar Pineda',           '+529985789170', 2,  true),
  ('Diego Pineda',           '+529981438311', 2,  true),
  ('Braulio Godinez',        '+527772177574', 2,  true),
  ('Julio Vera',             '+527777872863', 2,  true),
  ('Karen Chavez',           '+527352194953', 2,  true),
  ('Carlos Martinez',        '+527771914107', 5,  true),
  ('Gabriela Cuevas',        '+525587942773', 2,  true),
  ('Yair Rodríguez',         '+523231325277', 2,  false),
  ('Armando Armenta',        '+526688617982', 2,  false),
  ('Eric Silva',             '+524423267127', 3,  true),
  ('Fernando Martinez',      '+527773746182', 2,  true),
  ('Rosa Manzanarez',        '+527341051252', 2,  true),
  ('Alejandro Hernandez',    '+527351396650', 2,  false),
  ('Jonathan Cuevas',        '+527772949702', 2,  false),
  ('Angel Ayala',            '+527352630157', 3,  true),
  ('Abner Sánchez',          '+525527260839', 2,  true),
  ('Samuel Pérez',           '+527774890012', 4,  true),
  ('Elder Jaimes',           '+527772258319', 2,  false),
  ('Jorge Pinzón',           '+527321119950', 3,  false),
  ('Miguel Alba',            '+527772592565', 2,  true),
  ('Emmanuel Frías',         '+527775645283', 3,  false),
  ('Carlos Elizalde',        '+525633295090', 2,  true),
  ('Felipe Tun',             '+529831044319', 2,  true),
  ('Raúl García',            '+525578492776', 2,  true),
  ('Cristian Tavera',        '+527771684539', 2,  true),
  ('Carlos Álvarez',         '+525511347616', 2,  true),
  ('Cesar Jerónimo',         '+525620133983', 3,  true);

-- ============================================================
-- Resumen:
--   Total insertados  : 65
--   Habilitados  (true) : 56
--   Pendientes  (false) :  9
--     · Aurelio Loeza       (sin teléfono)
--     · Francisco Nava      (sin teléfono)
--     · Yair Rodríguez
--     · Armando Armenta
--     · Alejandro Hernandez
--     · Jonathan Cuevas
--     · Elder Jaimes
--     · Jorge Pinzón
--     · Emmanuel Frías
--
-- Para habilitar uno en específico:
--   UPDATE invitados SET enviar_save_the_date = true
--   WHERE nombre = 'Nombre Apellido';
--
-- Para ver todos los pendientes:
--   SELECT nombre, celular FROM invitados
--   WHERE enviar_save_the_date = false;
-- ============================================================
