# 💍 Boda Mitzi & Raúl

Proyecto web para invitaciones de boda con confirmación de asistencia.

## 📚 Documentación y contexto

- **[CHANGELOG.md](./CHANGELOG.md)** — Control de cambios por fecha (trabajo en equipo).
- **[docs/](./docs/)** — Contexto del proyecto y flujo:
  - `docs/README.md` — Índice y resumen del flujo.
  - `docs/CAMBIOS-Y-REQUISITOS.txt` — Requisitos y pendientes.
  - `docs/PLAN-RESTRUCTURA-BODA.md` — Plan, comparativa y flujo de invitaciones.
  - `docs/PROMPT-SAVE-THE-DATE.md` — Contexto Save the Date y prompt para IA.
  - `docs/GUIA-SAVE-THE-DATE-REACT.md` — Guía técnica Save the Date en React.
  - `docs/SAVE-DATE-CLON-IDENTICO.md` — Guía para clonar invitación base.

Para dar contexto a la IA: *"Revisa docs/ y CHANGELOG.md del proyecto boda-mitzi-raul."*

## 🚀 Características

- **Save the Date**: Página pública con countdown, calendario (.ics) y música (widget Spotify con enlace configurable)
- **Invitaciones personalizadas**: Rutas `/inv/:id` con formulario de confirmación
- **Base de datos**: Supabase (PostgreSQL) con fallback a mock
- **Mobile-first**: Diseño optimizado para móviles

## 📋 Requisitos

- Node.js 20+ o 22+
- npm o yarn

## 🔧 Instalación

```bash
npm install
```

## ⚙️ Configuración

1. Copia `.env.example` a `.env`
2. Obtén tus credenciales de Supabase:
   - Crea proyecto en [supabase.com](https://supabase.com)
   - Ve a Settings → API
   - Copia `URL` y `anon public key`
3. Ejecuta `supabase-schema.sql` en el SQL Editor de Supabase
4. Completa `.env` con tus valores

## 🏃 Desarrollo

```bash
npm run dev
```

Abre `http://localhost:5173`

## 📦 Build

```bash
npm run build
npm run preview
```

## 🗂 Estructura

```
src/
├── components/    # Hero, Countdown
├── pages/         # SaveTheDate, Invitation
├── api/           # invitations.js (Supabase)
├── lib/           # supabase.js
└── utils/         # calendar.js (.ics)
```

## 📝 Rutas

- `/` - Save the Date (página pública)
- `/inv/:id` - Invitación personalizada (ej: `/inv/inv-001`)

## 🔐 Variables de entorno

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

Sin `.env`: el proyecto usa datos mock.

## 📄 Licencia

Privado
