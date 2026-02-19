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
