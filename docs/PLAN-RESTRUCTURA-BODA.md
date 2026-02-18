# 💍 Plan: Reestructuración Proyecto Boda — Mitzi & Raúl

## 1️⃣ Comparativa: save-date vs save-date-react

| Aspecto | save-date | save-date-react |
|---------|-----------|-----------------|
| **Vista** | Una sola pantalla (hero con overlay oscuro) | Multi-sección (hero + info + countdown + footer) |
| **Estilo** | Formal, oscuro, imagen de fondo + overlay | Casual, cálido, fondos claros (cream/beige) |
| **Colores** | Blanco sobre morado oscuro (#2d1f2e) | Dorado (#b49b6b), crema (#f9f5ef, #f2e8d5), #fff8f0 |
| **Tipografías** | Cormorant Garamond, Montserrat | Playfair Display, Poppins |
| **Extras** | Solo fade-in | Countdown, botón "Agregar a calendario", footer |
| **Responsive** | Básico | Mejorado para móvil |
| **Imagen bg** | Sí (bg.jpg con overlay) | No (gradientes + textura sutil) |
| **Fecha** | 04 · Octubre · 2026 | 21 · 11 · 2026 |

### ✅ Recomendación: usar save-date-react como base

- Mejor UX para evento casual (boda)
- Countdown + botón calendario ya implementados
- Paleta más acogedora (cream, dorado)
- Estructura multi-sección lista para agregar módulos

---

## 2️⃣ Estructura del proyecto (boda-mitzi-raul)

```
boda-mitzi-raul/
├── src/
│   ├── components/       Hero.jsx, Countdown.jsx
│   ├── pages/            SaveTheDate.jsx, Invitation.jsx
│   ├── api/              invitations.js (Supabase)
│   ├── lib/              supabase.js
│   ├── utils/            calendar.js (.ics)
│   └── styles/           variables.css
├── public/assets/
├── docs/                 Documentación y contexto
└── supabase-schema.sql
```

---

## 3️⃣ Flujo de invitaciones

### A) Base de datos de invitados

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | text | ID único para el enlace |
| nombre | string | Nombre del invitado |
| celular | string | Para enviar WhatsApp |
| num_invitados | number | Cupo de personas |
| num_confirmados | number | Cuántos irán (0 hasta num_invitados) |
| confirmado | boolean | ¿Ya confirmó? |

### B) Envío por WhatsApp

1. Mensaje personalizado:
   ```
   Hola {nombre}, Mitzi y Raúl los invitan a su boda 💍
   Confirma tu asistencia aquí: https://tu-dominio.com/inv/{id}
   ```

2. El enlace abre la invitación con:
   - Nombre del invitado
   - Número de personas asignadas
   - Selector: "¿Cuántas personas asistirán?" (1 a num_invitados)
   - Botón **Confirmar asistencia**
   - Al confirmar → actualiza Supabase

### C) Tecnologías

| Capa | Opción |
|------|--------|
| Frontend | React + Vite |
| Base de datos | Supabase (PostgreSQL) |
| Calendario | Archivo .ics (calendario del dispositivo) |

---

## 4️⃣ Colores y estilos

```css
--color-cream: #f9f5ef;
--color-cream-dark: #f2e8d5;
--color-gold: #b49b6b;
--color-gold-hover: #9d8558;
--color-text: #222;
--color-text-muted: #555;
--color-bg-info: #fff8f0;
```

---

## 5️⃣ Rutas

- `/` — Save the Date (página pública)
- `/inv/:id` — Invitación personalizada (ej: `/inv/inv-001`)

Invitaciones de prueba: `inv-001` (Juan Pérez, 2 personas), `inv-002` (María García, 4 personas).
