# Changelog — Boda Mitzi & Raúl

Control de cambios para trabajo en equipo (2 personas). Ordenado por fecha, más reciente primero.

---

## Formato de entradas

```markdown
### YYYY-MM-DD HH:MM — [Resumen del cambio]
- **Quién**: Nombre o iniciales
- **Qué**: Descripción breve
- **Archivos**: archivos modificados (opcional)
```

---

## Registro

### 2026-02-20 — Bloqueo de invitación para asistencia ya confirmada y auto-confirmada
- **Quién**: Claude
- **Qué**: Si el invitado ya confirmó su asistencia (`confirmado=true`), al reabrir su link ve un mensaje de agradecimiento con el número de personas y la fecha del evento, sin posibilidad de modificar. Si fue auto-confirmado por el admin, ve el mensaje de plazo vencido. El formulario de confirmación solo aparece a invitados aún pendientes.
- **Archivos**: src/pages/Invitation.jsx, src/App.css

---

### 2026-02-20 — Mensaje de plazo vencido en invitación auto-confirmada
- **Quién**: Claude
- **Qué**: Si el admin auto-confirmó a un invitado (tras 3 recordatorios sin respuesta) y el invitado intenta abrir su link de invitación, ve un mensaje cálido indicando que el plazo concluyó y que se comunique con los novios. No se muestra el formulario de confirmación.
- **Archivos**: src/pages/Invitation.jsx, src/App.css

---

### 2026-02-20 — Tracking de lectura del Save the Date
- **Quién**: Claude
- **Qué**: Al abrir el link del Save the Date (`/?t=TOKEN&id=UUID`) se registra automáticamente `save_the_date_leido=true` en Supabase (fire-and-forget, silencioso para el invitado). El panel admin muestra "Leído: Sí ✓ / No" en cada tarjeta y agrega la stat "STD Leídos" al resumen. `TokenGate` ahora preserva params extra (como `id`) al hacer el redirect. Nueva función `marcarSaveTheDateLeido` en el API. Nueva columna en Supabase.
- **Archivos**: src/components/TokenGate.jsx, src/pages/SaveTheDate.jsx, src/pages/Admin.jsx, src/api/invitations.js, supabase-schema.sql, docs/CAMBIOS-Y-REQUISITOS.txt

---

### 2026-02-20 — Optimización mobile-first
- **Quién**: Claude
- **Qué**: Breakpoint 360px añadido (Galaxy A, iPhone SE). Reducción de `letter-spacing` en `.save` y `.date` en móvil. Gap del countdown ajustado. Grid de estadísticas del Admin cambiado de 5 columnas fijas a responsivo (5 → 3 → 2 cols). Touch targets de botones del Admin aumentados a mínimo 44px (iOS/Android).
- **Archivos**: src/App.css, src/pages/Admin.jsx

---

### 2026-02-20 11:00 — Save the Date desde el panel de administración
- **Quién**: —
- **Qué**: Botón "Enviar Save the Date" en cada tarjeta del panel admin. Mensaje diferenciado (anuncia la boda, no confirmación). Link a `/?t=ACCESS_TOKEN` (página informativa). Se envía una única vez por persona; tras el envío el botón queda deshabilitado ("Ya enviado"). Nueva columna `save_the_date_enviado` en Supabase. Estadística de Save the Date añadida al resumen del panel (5 columnas). Nueva función `marcarSaveTheDate(id)` en el API.
- **Archivos**: src/pages/Admin.jsx, src/api/invitations.js, supabase-schema.sql

---

### 2026-02-20 10:00 — Migración de IDs a UUID
- **Quién**: —
- **Qué**: IDs de invitados migrados de `inv-001` a UUID. La columna `id` ahora tiene `DEFAULT gen_random_uuid()::text` — al insertar un invitado sin especificar id, Supabase genera el UUID automáticamente. Mock de desarrollo actualizado con UUIDs reales. Mensaje del 1er envío de WhatsApp diferenciado como invitación (vs recordatorio).
- **Archivos**: supabase-schema.sql, src/api/invitations.js, src/pages/Admin.jsx, docs/CAMBIOS-Y-REQUISITOS.txt

---

### 2026-02-19 18:00 — Panel de administración con recordatorios y WhatsApp
- **Quién**: —
- **Qué**: Panel admin en `/admin?t=ADMIN_TOKEN` con listado de invitados, stats (total/confirmados/pendientes/auto-conf.), botón "Enviar recordatorio" (abre wa.me con mensaje pre-llenado), registro en Supabase del envío, intervalo configurable por `VITE_REMINDER_INTERVAL_MINUTES` (default 10080 min = 1 semana, 1 para testing). Tras 3 recordatorios sin respuesta: botón "Auto-confirmar". Nuevas columnas en Supabase: `recordatorios_enviados`, `ultimo_recordatorio`, `auto_confirmado`.
- **Archivos**: src/pages/Admin.jsx (nuevo), src/App.jsx, src/api/invitations.js, supabase-schema.sql, .env, .env.example

---

### 2026-02-19 17:00 — Seguridad con token en URL
- **Quién**: —
- **Qué**: Token de acceso en la URL (`?t=TOKEN`) para proteger la página `/`. El token se valida contra `VITE_ACCESS_TOKEN` del `.env` y se guarda en sessionStorage. Links inválidos en `/inv/:id` ya no muestran navegación ni redirigen. Ruta 404 sin links. Validación de formato de ID antes de llamar a Supabase. Comentario con SQL de RLS en invitations.js. Pendientes documentados: migrar IDs a UUID y auto-confirmación futura.
- **Archivos**: src/components/TokenGate.jsx (nuevo), src/App.jsx, src/pages/Invitation.jsx, src/api/invitations.js, .env, .env.example, docs/CAMBIOS-Y-REQUISITOS.txt

---

### 2026-02-19 16:00 — Actualización de fecha y texto del Save the Date
- **Quién**: —
- **Qué**: Fecha del evento corregida a 21 de noviembre 2026 (14:00h). Texto "SAVE THE DATE" cambiado a "RESERVA LA FECHA". Footer simplificado a "By ❤️ Mitzi & Raúl".
- **Archivos**: src/components/Countdown.jsx, src/components/Hero.jsx, src/pages/SaveTheDate.jsx

---

### 2026-02-18 — Música en Save the Date con enlace Spotify
- **Quién**: —
- **Qué**: Widget incrustado de Spotify en la página Save the Date. Se configura pegando un enlace de canción, playlist o álbum en la constante `SPOTIFY_LINK` en `SaveTheDate.jsx`. El reproductor aparece fijo en la esquina inferior derecha.
- **Archivos**: SaveTheDate.jsx, App.css

---

### 2026-02-18 — Hero quitado, .ics, Supabase
- **Quién**: —
- **Qué**: Invitation sin Hero (header mínimo). Botón calendario descarga .ics. Integración Supabase con fallback a mock.
- **Archivos**: Invitation.jsx, Hero.jsx, utils/calendar.js, api/invitations.js, lib/supabase.js, .env.example, supabase-schema.sql

---

### 2026-02-18 — Creación de CHANGELOG y complemento de requisitos
- **Quién**: —
- **Qué**: Revisión de cambios-boda-mitzi-raul.txt. Respuestas y estructura añadida.
- **Archivos**: CHANGELOG.md, docs/CAMBIOS-Y-REQUISITOS.txt

---

### 2026-02-18 — Migración proyecto unificado boda-mitzi-raul
- **Quién**: —
- **Qué**: Proyecto basado en save-date-react. Rutas / y /inv/:id. Formulario de confirmación.
- **Archivos**: boda-mitzi-raul/*

---

*Agregar nuevas entradas arriba de esta línea.*
