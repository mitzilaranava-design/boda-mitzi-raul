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

### 2026-02-26 — Calendario: .ics reemplazado por Google Calendar
- **Quién**: Claude
- **Qué**: Botón "Agregar a calendario" ahora abre Google Calendar en nueva pestaña en lugar de descargar un `.ics`. Fecha corregida de oct 4 → nov 21 de 2026. Horario: 2pm–12am CST (UTC-6). Se eliminó `downloadIcs` y se reemplazó por `openGoogleCalendar`.
- **Archivos**: src/utils/calendar.js, src/components/Hero.jsx

---

### 2026-02-26 — Flag enviar_save_the_date para habilitar/deshabilitar contacto
- **Quién**: Claude
- **Qué**: Nueva columna `enviar_save_the_date BOOLEAN DEFAULT false`. Cuando es `false`, la tarjeta del invitado en el Admin se muestra con opacidad reducida, badge "Pendiente de activar" y todos los botones de contacto deshabilitados (STD, invitación, recordatorio, auto-confirmar). El invitado sigue visible en el sistema. Se activa cambiando el flag a `true` desde Supabase. Mock data actualizado con `enviar_save_the_date: true` para los invitados de prueba.
- **Archivos**: supabase-schema.sql, src/api/invitations.js, src/pages/Admin.jsx

---

### 2026-02-25 — Sello eliminado del flujo Save the Date
- **Quién**: Claude
- **Qué**: El Save the Date va directo a `/?t=TOKEN&id=UUID` sin pasar por el sello (Intro). El sello solo aplica al flujo de invitación (`/intro/:id`). La ruta `/intro` (sin `:id`) fue eliminada. `SaveTheDate.jsx` vuelve a leer el `id` de tracking desde `searchParams`. `Intro.jsx` simplificado: solo maneja el caso de invitación (`:id` siempre presente).
- **Archivos**: src/pages/Admin.jsx, src/App.jsx, src/pages/SaveTheDate.jsx, src/pages/Intro.jsx

---

### 2026-02-25 — Campo `no_asiste` para invitados que declinan
- **Quién**: Claude
- **Qué**: Se separó la lógica de "no asistirá" del campo `confirmado`. Nueva columna `no_asiste BOOLEAN DEFAULT false` en la BD. Nueva función `marcarNoAsiste(id)` en el API. El Admin muestra pill "No asiste" en gris y nueva stat "No asisten" en el resumen. `puedeEnviar` bloquea recordatorios para `no_asiste=true`. Las stats "Confirmados" y "Pendientes" excluyen correctamente a quienes declinaron. La invitación detecta `no_asiste` en la DB al reabrir el link.
- **Archivos**: supabase-schema.sql, src/api/invitations.js, src/pages/Admin.jsx, src/pages/Invitation.jsx

---

### 2026-02-24 — Pregunta Sí/No en la invitación antes de confirmar
- **Quién**: Claude
- **Qué**: El formulario de confirmación ahora empieza con "¿Podrás acompañarnos?" y dos botones: "Sí, estaré" / "No podré asistir". Si elige Sí, aparece el selector de personas y el botón de confirmar asistencia (flujo existente). Si elige No, aparece un botón para confirmar la no asistencia (guarda `num_confirmados=0`). Mensajes de éxito y de revisita diferenciados para cada caso. Nuevo bloque de estilos en App.css: `.asistencia-pregunta`, `.asistencia-btns`, `.btn-si`, `.btn-no`, `.btn-no-asiste`, `.no-asiste-msg`.
- **Archivos**: src/pages/Invitation.jsx, src/App.css

---

### 2026-02-24 — Primer envío de invitación no cuenta como recordatorio
- **Quién**: Claude
- **Qué**: El botón "Enviar invitación" (primer envío) ya no incrementa `recordatorios_enviados`. Solo actualiza `ultimo_recordatorio` para respetar el cooldown entre envíos. Los recordatorios reales (2.º, 3.º, 4.º envío) sí incrementan el contador. El auto-confirmar sigue activándose a los 3 recordatorios. Nueva función `marcarInvitacionEnviada` en el API.
- **Archivos**: src/api/invitations.js, src/pages/Admin.jsx

---

### 2026-02-24 — Tracking id oculto de la URL en Save the Date (via sessionStorage)
- **Quién**: Claude
- **Qué**: El parámetro `?id=UUID` ya no aparece en la URL al navegar al Save the Date. `Intro.jsx` guarda el `id` en `sessionStorage` con clave `boda_std_tracking` antes de navegar a `/`. `SaveTheDate.jsx` lo lee de `sessionStorage`, lo borra inmediatamente y llama a `marcarSaveTheDateLeido`. La URL queda limpia como `/` y el tracking funciona de forma confiable (independiente del state del router).
- **Archivos**: src/pages/Intro.jsx, src/pages/SaveTheDate.jsx

---

### 2026-02-24 — Token obligatorio en todas las rutas (invitación, intro e inv/:id)
- **Quién**: Claude
- **Qué**: `TokenGate` ahora redirige a la ruta actual (pathname) al validar el token, en lugar de siempre ir a `/`. Esto permite proteger `/intro`, `/intro/:id` e `/inv/:id` con el mismo componente. `App.jsx` actualizado para envolver esas rutas con `TokenGate`. `buildWhatsAppLink` en Admin actualizado para incluir `?t=TOKEN` en el link de invitación/recordatorio. Flujo completo: `/intro/UUID?t=TOKEN` → TokenGate valida, guarda sessionStorage → Sello → `/inv/UUID` → TokenGate verifica sessionStorage → Invitación.
- **Archivos**: src/components/TokenGate.jsx, src/App.jsx, src/pages/Admin.jsx

---

### 2026-02-24 — Corrección merge: link Save the Date restaurado con sello y tracking
- **Quién**: Claude
- **Qué**: El merge previo resolvió mal el conflicto en `buildSaveTheDateLink` usando `/intro/${inv.id}` (ruta de invitación), haciendo que el Save the Date llevara al invitado a la invitación en lugar del Save the Date. Corregido a `/intro?t=TOKEN&id=UUID` para que el invitado vea primero el sello y al tocarlo llegue al Save the Date, preservando el tracking de lectura. También resuelto el conflicto de merge en CHANGELOG.md.
- **Archivos**: src/pages/Admin.jsx, CHANGELOG.md

---

### 2026-02-24 — Intro movido a pages/ y sello unificado para invitación y Save the Date
- **Quién**: —
- **Qué**: `Intro.jsx` movido de `components/` a `pages/` (es página completa con ruta propia). El componente ahora maneja dos flujos: si recibe `:id` en la URL navega a `/inv/:id` (invitación); si no, navega a `/` preservando el token (Save the Date). Nueva ruta `/intro/:id` en App.jsx. Links de invitación/recordatorio en el panel admin actualizados a `/intro/:id` para que el invitado vea el sello antes de su invitación.
- **Archivos**: src/pages/Intro.jsx (nuevo), src/components/Intro.jsx (eliminado), src/App.jsx, src/pages/Admin.jsx

---

### 2026-02-24 — Sello (Intro) integrado en el flujo del Save the Date
- **Quién**: —
- **Qué**: El link del Save the Date que envía el panel admin ahora apunta a `/intro?t=TOKEN&id=UUID` en lugar de `/?t=TOKEN&id=UUID`. Así el invitado ve primero el sello (monograma animado) y al tocarlo llega al Save the Date. El token se valida en TokenGate al navegar de `/intro` a `/`. El `id` se preserva en la query para el tracking de lectura.
- **Archivos**: src/pages/Admin.jsx

---

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
