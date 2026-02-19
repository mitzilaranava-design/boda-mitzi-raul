# Save the Date — Guía en React

Guía técnica para una página Save the Date elegante y minimalista.

## Concepto visual

Minimalista, fondo claro (ivory/beige), tipografía serif para nombres, sans serif para texto, espacio en blanco, animaciones suaves, countdown, botón agregar al calendario.

## Stack

React (Vite), CSS Modules o Tailwind, Framer Motion, Day.js. Deploy en Vercel.

## Estructura

- components: Hero, Countdown, SaveButton
- pages: SaveTheDate
- styles: global.css

## Hero

SAVE THE DATE, nombres centrados, fecha, animación fade-in.

## Countdown

Fecha del evento menos fecha actual; días, horas, minutos; setInterval cada segundo.

## Calendario

En boda-mitzi-raul se usa archivo .ics (src/utils/calendar.js) para abrir la app del dispositivo.

## Animaciones

Fade al cargar, slide en textos, countdown progresivo, hover en botón.

## Opcional

Música (reproductor MP3 con equalizer minimizable, archivo en `public/music/save-the-date.mp3`, ver SaveTheDate.jsx), pantalla "Abrir invitación", overlay oscuro, URL por invitado, confirmación en Supabase (implementado).

## Checklist

Diseño elegante, tipografías, animaciones, countdown, botón calendario, responsive móvil.
