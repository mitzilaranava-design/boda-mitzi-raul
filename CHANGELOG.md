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

> ⚠️ **HH:MM es obligatorio.** Permite saber quién subió código primero cuando dos personas trabajan el mismo día.

---

## Registro

### 2026-05-13 18:38 — Padrinos, itinerario configurable, actualizaciones WA, galería sin descarga
- **Quién**: Raúl / Claude
- **Qué**: (1) Anillos: solo madrina (Denisse Adriana Vargas). (2) Padrinos Biblia y Rosario añadidos: Mayra Lara, Evaristo Antúnez & Levi Lara. (3) Itinerario con toggle ON/OFF desde panel admin; vista "en construcción" cuando está inactivo. (4) Botón "Enviar actualizaciones" en admin: textarea con descripción, genera link WA individual por invitado, marca `actualizacion_enviada`. (5) Galería de /galeria sin botón descargar; imágenes sin clic-derecho ni arrastre; botón "Regresar" al inv si viene de /inv/:id. (6) Archivos sensibles removidos del repo (lista-save-the-date.csv, insert-invitados.sql) y agregados a .gitignore. (7) Rediseño visual: notas, despedida, código de vestimenta, event-photos con nuevos elementos UI.
- **Archivos**: `.gitignore`, `src/api/gallery.js`, `src/api/invitations.js`, `src/data/wedding.js`, `src/pages/Admin.jsx`, `src/pages/Gallery.jsx`, `src/pages/Invitation.jsx`, `src/components/invitation/InvSchedule.jsx`, `src/components/invitation/InvSponsors.jsx`, `src/components/invitation/InvNotes.jsx`, `src/components/invitation/InvFarewell.jsx`, `src/components/invitation/InvDresscode.jsx`, `src/components/invitation/InvEventPhotos.jsx`, `src/components/invitation/InvRegistry.jsx`, `src/components/invitation/InvGallery.jsx`, `src/styles/Gallery.css`, `src/styles/Invitation.css`, `docs/CAMBIOS-Y-REQUISITOS.txt`, `public/music/save-the-date.mp3`

### 2026-03-18 20:40 — Ajustes visuales: colores de secciones y galería de novios
- **Quién**: Claude
- **Qué**: InvGallery cambiada a fondo dorado (textos oscuros). InvFarewell cambiada a fondo crema. Footer "Creado con amor" cambiado a color dorado. InvDresscode dividido en dos párrafos separados (noteDamas / noteCaballeros) en wedding.js y componente. Botón de música subido a `bottom: 56px` para no tapar el footer. Galería de novios (InvGallery) añadida como nueva sección con mosaico dinámico y lightbox. InvEventPhotos simplificado a solo enlace a galería interna. Gallery.jsx y Gallery.css rediseñados al tema boda. Galería soporta comentario por foto. Timeout de 10s en carga de invitado.
- **Archivos**: `src/styles/Invitation.css`, `src/styles/Gallery.css`, `src/data/wedding.js`, `src/components/invitation/InvDresscode.jsx`, `src/components/invitation/InvFarewell.jsx`, `src/components/invitation/InvGallery.jsx`, `src/components/invitation/InvEventPhotos.jsx`, `src/pages/Invitation.jsx`, `src/pages/Gallery.jsx`, `src/api/gallery.js`

### 2026-03-18 13:37 — Mesa de Regalos: solo Liverpool y mensaje más cálido
- **Quién**: Claude
- **Qué**: Registry reducido a Liverpool únicamente. Texto del subtítulo reescrito para transmitir que la presencia es lo más importante y la mesa de regalos es solo una opción si el invitado desea obsequiar algo.
- **Archivos**: `src/data/wedding.js`, `src/components/invitation/InvRegistry.jsx`

### 2026-03-16 23:27 — Menú de secciones: botón ✕ para cerrar el panel
- **Quién**: Claude
- **Qué**: El panel lateral de secciones ahora tiene un encabezado con título "Secciones" a la izquierda y botón ✕ circular a la derecha. Se puede cerrar tanto con ese botón como tocando el overlay exterior. Estilos: círculo crema que pasa a dorado en hover.
- **Archivos**: `src/pages/Invitation.jsx`, `src/styles/Invitation.css`

### 2026-03-16 23:27 — InvWeather: pronóstico real con Open-Meteo
- **Quién**: Claude
- **Qué**: Componente refactorizado con fetch a Open-Meteo (sin API key, gratis). Coordenadas de Cuernavaca (18.9261°N, 99.2319°W). Si la boda está a más de 16 días muestra placeholder "-- °C" sin llamada al API; al acercarse la semana carga temperatura máxima diaria y código de clima (emoji ☀️⛅🌦️🌧️⛈️). Días correctos: Mar 17 → Lun 23 nov, Sáb 21 destacado. Estados: loading / ok / soon / error.
- **Archivos**: `src/components/invitation/InvWeather.jsx`

### 2026-03-16 21:12 — Adaptación completa de secciones restantes de la invitación
- **Quién**: Claude
- **Qué**: Todas las secciones pendientes adaptadas con colores intercalados, recuadros interiores y texto en español. InvRegistry: fondo dorado + tarjeta texture.jpg, etiqueta/título traducidos. InvDresscode: etiqueta/título traducidos ("Luce Increíble" / "Código de Vestimenta"). InvNotes: fondo cream + tarjeta texture.jpg, etiqueta/título traducidos ("Toma en Cuenta" / "Recuerda..."). InvEventPhotos: recuadro interior con borde dorado sutil (igual que Schedule/Weather). InvFarewell: fondo dorado + tarjeta texture.jpg, footer traducido. `wedding.js`: traducidos `date`, `dresscode` (title/note/avoid), todos los `notes[]` y `farewell`.
- **Archivos**: `src/components/invitation/InvRegistry.jsx`, `src/components/invitation/InvDresscode.jsx`, `src/components/invitation/InvNotes.jsx`, `src/components/invitation/InvEventPhotos.jsx`, `src/components/invitation/InvFarewell.jsx`, `src/styles/Invitation.css`, `src/data/wedding.js`

### 2026-03-16 21:02 — Música: botón ♪ movido a esquina inferior derecha en la invitación
- **Quién**: Claude
- **Qué**: `MusicEqualizer` sacado del `inv-floating-nav` y renderizado independiente. Override CSS `.inv .music-equalizer-wrap { top: auto; bottom: 24px; }` lo posiciona abajo a la derecha solo en la invitación. En Save the Date sigue en la esquina superior derecha sin cambios.
- **Archivos**: `src/pages/Invitation.jsx`, `src/styles/Invitation.css`

### 2026-03-16 21:00 — InvSchedule: itinerario compacto sin scroll
- **Quién**: Claude
- **Qué**: Reducción de tamaños para que el itinerario quepa en pantalla sin scroll. Row padding 18px→7px, ícono 52px→40px, SVG 38px→28px, evento 1rem→0.88rem, hora 0.7rem→0.62rem, h2 1.8rem→1.4rem, mensaje margin 28px→8px, footer margin 32px→12px. Total estimado de ~670px→~400px. También: `AUDIO_SRC` en `wedding.js` habilitado con `/music/save-the-date.mp3` para mostrar el botón ♪ en la invitación. InvVenues dividido en dos secciones independientes (iglesia/salón) con variantes de color `gold`/`cream`. InvSchedule envuelto en recuadro interior con borde dorado sutil.
- **Archivos**: `src/styles/Invitation.css`, `src/data/wedding.js`, `src/components/invitation/InvVenues.jsx`, `src/components/invitation/InvSchedule.jsx`, `src/pages/Invitation.jsx`

### 2026-03-16 20:17 — InvVenues: fondo cream, texto en español, imagen del lugar
- **Quién**: Claude
- **Qué**: InvVenues ahora sigue el patrón de colores intercalados: fondo `var(--color-cream)` (igual que InvDate e InvSponsors). Texto del encabezado y etiquetas traducidos al español ("Dónde Encontrarnos", "Ceremonia religiosa", "Recepción", "Ver en Maps"). Cada tarjeta de lugar muestra: etiqueta → nombre → dirección → **imagen del lugar** (si se configura `imageUrl` en `wedding.js`) → enlace a Maps. Cards con `border-radius`, `overflow: hidden` y `box-shadow` para contener la imagen limpiamente. Campo `imageUrl: null` agregado a `church` y `venue` en `wedding.js` con comentario de placeholder.
- **Archivos**: `src/components/invitation/InvVenues.jsx`, `src/styles/Invitation.css`, `src/data/wedding.js`

### 2026-03-16 20:17 — Botón home reemplazado por menú de navegación de secciones
- **Quién**: Claude
- **Qué**: El botón home (☰) de la invitación ya no navega a `/`. Ahora abre un panel lateral deslizante (desde la derecha) con la lista de todas las secciones de la invitación (Portada, Confirmación, Fecha, Familias, Padrinos, Programa, Lugar, Clima, Mesa de Regalos, Vestimenta, Notas, Galería, Hasta pronto). Al tocar una sección hace scroll suave hacia ella. El botón cambia a ✕ cuando el panel está abierto. El botón de música (♪) ahora aparece debajo del botón de menú, agrupados en un `.inv-floating-nav` fijo en la esquina superior derecha.
- **Archivos**: `src/components/invitation/InvCover.jsx`, `src/pages/Invitation.jsx`, `src/styles/Invitation.css`

### 2026-03-04 17:00 — InvDate + InvFamilies: diseño consistente con InvPasses (fondo dorado + tarjeta textura)
- **Quién**: Claude
- **Qué**: Ambas secciones ahora siguen el patrón visual de InvPasses: fondo de sección en dorado sólido, recuadro centrado con `texture.jpg` como fondo (max-width 380px, box-shadow). En InvDate el botón "Agregar a Calendario" adopta el estilo `passes-btn` (borde oscuro, uppercase, sin border-radius, hover oscuro). En InvFamilies el `inv-section__inner` se convierte en la tarjeta con textura; las tarjetas de familia son transparentes sin borde propio, separadas por una línea dorada sutil.
- **Archivos**: `src/styles/Invitation.css`

### 2026-03-04 16:30 — InvFamilies: texto en español + tipografía elegante
- **Quién**: Claude
- **Qué**: Texto visible al invitado traducido al español: "Con la Bendición de", "Nuestras Familias", "Padres de la Novia", "Padres del Novio". Tipografía mejorada: h2 de sección en Playfair italic, nombres de padres en Playfair italic 1.05rem, `&` entre nombres en Great Vibes dorado (1.6rem). Borde de tarjeta con tinte dorado sutil.
- **Archivos**: `src/components/invitation/InvFamilies.jsx`, `src/styles/Invitation.css`

### 2026-03-04 16:00 — InvDate: tipografía elegante + botón Agregar a Calendario siempre visible
- **Quién**: Claude
- **Qué**: "¡Nos Casamos!" mantiene Great Vibes cursiva con `clamp` responsivo (3.4–5rem). Separador dorado delgado entre título y fecha. Fecha "21 · Noviembre · 2026" ahora usa Playfair Display, letter-spacing 5px, uppercase, color oscuro — no cursiva. Botón "Agregar a Calendario" siempre visible usando `openGoogleCalendar()` del utils (ya no depende de `googleCalendarUrl` en wedding.js). Botón rediseñado: outline dorado sin border-radius, hover fondo dorado.
- **Archivos**: `src/components/invitation/InvDate.jsx`, `src/styles/Invitation.css`

### 2026-03-02 22:45 — Admin: filtro de búsqueda por nombre o celular en lista de invitados
- **Quién**: Claude
- **Qué**: Input de búsqueda en el panel Admin que filtra la lista de invitados en tiempo real por nombre o número de celular. Muestra contador de resultados. Botón ✕ para limpiar. Paginación se aplica sobre los resultados filtrados y se resetea a página 1 al escribir.
- **Archivos**: `src/pages/Admin.jsx`

### 2026-03-02 22:30 — InvEventPhotos: botón CTA a /galeria en lugar de embed + CODING-STANDARDS.md
- **Quién**: Claude
- **Qué**: `InvEventPhotos.jsx` muestra solo un botón CTA que lleva a `/galeria?inv=ID`, sin embed del grid. Razón: usuarios que entran por QR externo solo tienen acceso a `/galeria`, no a la invitación. Botón dorado con estilos en `Invitation.css`. Creado `docs/CODING-STANDARDS.md` con reglas mínimas del proyecto (idioma, estructura, CSS, variables, mock, CHANGELOG con HH:MM obligatorio).
- **Archivos**: `src/components/invitation/InvEventPhotos.jsx` (nuevo), `docs/CODING-STANDARDS.md` (nuevo), `src/pages/Invitation.jsx`, `src/styles/Invitation.css`

### 2026-03-02 21:44 — Galería: compresión de imagen en cliente + VITE_GALLERY_TOKEN en env
- **Quién**: Claude
- **Qué**: Compresión automática antes de subir a Supabase Storage usando Canvas API (sin librerías). Max 2048px en el lado mayor, 88% calidad JPEG → ~600 KB por foto, ~1 700 fotos en el plan gratuito de 1 GB. `VITE_GALLERY_TOKEN` agregado a `.env.example`. Opciones de almacenamiento alternativas (Cloudinary, Firebase) documentadas en `docs/CAMBIOS-Y-REQUISITOS.txt` para decisión futura.
- **Archivos**: `src/api/gallery.js`, `.env.example`, `docs/CAMBIOS-Y-REQUISITOS.txt`

### 2026-03-02 21:44 — Galería: acceso dual (sesión de invitación ó token QR propio)
- **Quién**: Claude
- **Qué**: Nuevo `GalleryTokenGate` para `/galeria`. Acepta dos vías: (1) el invitado ya tiene sesión `boda_access` (viene de su invitación, entra directo sin token extra); (2) link de QR externo con `?t=VITE_GALLERY_TOKEN` (token independiente, se guarda en `boda_gallery`). `TokenGate` queda sin cambios. `InvFarewell` solo pasa `?inv=id`, sin token.
- **Archivos**: `src/components/GalleryTokenGate.jsx` (nuevo), `src/App.jsx`, `src/components/TokenGate.jsx` (revertido), `src/components/invitation/InvFarewell.jsx`

### 2026-03-02 21:44 — Galería: ligar fotos al invitado o detectar QR externo
- **Quién**: Claude
- **Qué**: Al subir foto desde `/inv/:id → /galeria`, el `invitado_id` se guarda en `galeria_fotos`. Si viene de QR externo (solo token, sin id), `invitado_id` queda null. TODO de compresión de imagen documentado en `gallery.js`.
- **Archivos**: `src/api/gallery.js`, `src/pages/Gallery.jsx`, `src/components/invitation/InvFarewell.jsx`, `supabase-schema.sql`

### 2026-03-02 21:44 — Galería de fotos en tiempo real para invitados
- **Quién**: Claude
- **Qué**: Implementación completa de galería compartida. Los invitados pueden subir y ver fotos del evento en tiempo real desde `/galeria`. El Admin puede activar/desactivar la galería desde el panel. Incluye lightbox con navegación prev/next, botón de descarga, y subida desde cámara o galería del móvil. Con fallback mock cuando Supabase no está configurado.
- **Archivos**:
  - `src/api/gallery.js` (nuevo) — getGalleryConfig, toggleGallery, getFotos, subirFoto, subscribeFotos + mock
  - `src/pages/Gallery.jsx` (nuevo) — página /galeria con grid, lightbox, upload modal, tiempo real
  - `src/styles/Gallery.css` (nuevo) — estilos mobile-first, variables CSS del proyecto
  - `src/App.jsx` — ruta `/galeria` con TokenGate
  - `src/pages/Admin.jsx` — sección toggle galería on/off
  - `src/components/invitation/InvFarewell.jsx` — botón "Galería del evento"
  - `supabase-schema.sql` — tablas `galeria_fotos` + `galeria_config` + instrucciones Storage

### 2026-03-02 17:22 — Reestructura visual de la invitación: cover, pases y fecha
- **Quién**: Claude
- **Qué**: Rediseño completo de las primeras 3 secciones de `/inv/:id` basado en referencias visuales de otra invitación elegante. Puntos clave:
  - **CSS separado**: `src/styles/Invitation.css` exclusivo para la invitación. `App.css` queda solo para Save the Date y globales. Nunca se tocan entre sí.
  - **InvCover**: imagen `cover.jpg` como fondo (position absolute, contenida en la sección), nombres en Great Vibes dorado, banner dorado en la parte inferior con efecto wipe-reveal (clipPath) que se activa 1.8s después del fade-in de la foto.
  - **InvPasses**: fondo dorado sólido, tarjeta centrada con `texture.jpg` de fondo y gold visible a los lados. RSVP completo en español (sí/no, selector de personas, mensajes de confirmado/no asiste).
  - **InvDate**: estilo visual idéntico al Save the Date — "¡Nos Casamos!" en script, fecha en versales, countdown con cajas doradas, botón "Agregar a Calendario" (aparece cuando `WEDDING.googleCalendarUrl` esté configurado).
  - **scroll-snap**: restaurado para la invitación (igual al efecto Apple del Save the Date).
  - **AUDIO_SRC = null**: música desactivada en la invitación hasta tener archivo.
  - **`src/data/wedding.js`**: datos centralizados del evento (WEDDING object, AUDIO_SRC, googleCalendarUrl).
- **Archivos**: `src/styles/Invitation.css` (nuevo), `src/components/invitation/` (InvCover, InvPasses, InvDate rediseñados), `src/data/wedding.js` (nuevo), `src/App.css`, `src/pages/Invitation.jsx`, `public/assets/cover.jpg`, `public/assets/texture.jpg`, `public/context-inv/` (referencias visuales)

---

### 2026-02-27 — Paginador en lista de invitados del Admin
- **Quién**: Claude
- **Qué**: Se agregó paginador de 10 invitados por página en el panel de administración. Controles de Anterior / Siguiente con indicador de página actual. La página se resetea a 1 al actualizar la lista.
- **Archivos**: src/pages/Admin.jsx

---

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
