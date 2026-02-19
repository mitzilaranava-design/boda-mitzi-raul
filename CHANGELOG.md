# Changelog — Boda Mitzi & Raúl

Control de cambios para trabajo en equipo (2 personas). Ordenado por fecha, más reciente primero.

---

## Formato de entradas

```markdown
### YYYY-MM-DD — [Resumen del cambio]
- **Quién**: Nombre o iniciales
- **Qué**: Descripción breve
- **Archivos**: archivos modificados (opcional)
```

---

## Registro

### 2026-02-19 — Actualización de fecha y texto del Save the Date
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
