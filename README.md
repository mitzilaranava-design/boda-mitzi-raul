# 💍 Boda Mitzi & Raúl

Proyecto web para invitaciones de boda con confirmación de asistencia.

## 🚀 Características

- **Save the Date**: Página pública con countdown y calendario (.ics)
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
