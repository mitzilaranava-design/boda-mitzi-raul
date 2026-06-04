# Coding Standards — Boda Mitzi & Raúl

Minimum good-practice rules for this project.
All agents and developers must follow these before writing or modifying code.

---

## 1. Language Rules

| What | Language | Examples |
|---|---|---|
| Variable names | English | `invitadoId`, `photoList`, `isLoading` |
| Function names | English | `handleUpload`, `getGalleryConfig`, `subscribeFotos` |
| Component names | English | `InvEventPhotos`, `GalleryTokenGate` |
| File names | English | `gallery.js`, `InvEventPhotos.jsx`, `Gallery.css` |
| Code comments | English | `// Load config and photos on mount` |
| CSS class names | English | `.gallery-grid`, `.lightbox-nav`, `.upload-btn-primary` |
| **UI text (guest-facing)** | **Spanish** | `"Subir foto"`, `"La galería estará disponible durante el evento"` |
| **UI text (admin-facing)** | **Spanish** | `"Activar galería"`, `"Acceso no autorizado"` |
| CHANGELOG entries | Spanish | Historial legible para ambos devs |
| CAMBIOS-Y-REQUISITOS.txt | Spanish | Requisitos legibles para ambos devs |

---

## 2. File Structure

```
src/
  api/          ← Supabase calls + mock fallback (one file per domain)
  components/
    invitation/ ← One JSX per section (InvCover, InvDate, InvEventPhotos…)
  pages/        ← Full-page routes (Gallery, Invitation, Admin, SaveTheDate…)
  styles/       ← One CSS file per page/domain; variables.css is global
  data/         ← Static wedding data (wedding.js)
  lib/          ← Supabase client (supabase.js)
  utils/        ← Pure utility functions (calendar.js)
docs/           ← Project documentation (this file, CAMBIOS-Y-REQUISITOS.txt)
public/         ← Static assets (music/, assets/)
```

---

## 3. CSS Rules

- Always use CSS variables from `variables.css` — never hardcode colors.
- Mobile-first: write base styles for mobile, then `@media (min-width: Xpx)` for larger screens.
- Minimum breakpoints: 360px (Galaxy A / iPhone SE), 600px (tablet), 900px (desktop).
- Touch targets: minimum 44×44px for all interactive elements.
- `Invitation.css` is exclusive to the invitation. `App.css` is for Save the Date and globals. They must not cross-import.

---

## 4. Supabase / API Pattern

- Every API file exports async functions and handles `supabase === null` with a mock fallback.
- Mock data must be realistic (UUIDs, plausible values).
- Never expose credentials in client code — only `VITE_*` env vars via `import.meta.env`.

---

## 5. Component Rules

- Invitation section components live in `src/components/invitation/` and are named `Inv*.jsx`.
- Each section wraps its content in `<motion.section className="inv-section inv-[name]" {...fadeUp}>`.
- Props are typed implicitly — no PropTypes or TypeScript required (small project).
- No default exports from barrel files — import directly from the component file.

---

## 6. Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `VITE_ACCESS_TOKEN` | Token for Save the Date + invitation routes |
| `VITE_ADMIN_TOKEN` | Token for `/admin` panel |
| `VITE_GALLERY_TOKEN` | Token for `/galeria` via external QR |
| `VITE_SITE_URL` | Production URL (used in WhatsApp links) |
| `VITE_REMINDER_INTERVAL_MINUTES` | Cooldown between reminders (default 10080 = 1 week) |

- Always update `.env.example` when adding a new variable.
- Never commit `.env` to the repo.

---

## 7. CHANGELOG Rule

Every change must have an entry in `CHANGELOG.md` (root) with:
```
### YYYY-MM-DD HH:MM — [Summary]
- **Quién**: name or initials
- **Qué**: brief description
- **Archivos**: modified files
```
- **HH:MM is mandatory** — it determines who pushed code first when two developers work on the same day.
- Add new entries at the top of the **Registro** section.

---

## 8. Mock / Offline Mode

- Without `.env`: the app runs fully on mock data — no errors, no blank screens.
- Mock functions must simulate realistic async delay (`setTimeout 200–800ms`).
- Never show internal error messages to guests — catch and display a friendly Spanish message.
