/**
 * Abre Google Calendar con el evento de la boda precargado.
 * 21 de noviembre de 2026 · 2pm – 12am (CST, UTC-6)
 */

const EVENT = {
  text: "Boda Mitzi & Raúl",
  dates: "20261121T200000Z/20261122T060000Z",
  details: "Save the Date — ¡Te esperamos!",
  location: "Por confirmar",
};

export function openGoogleCalendar() {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT.text,
    dates: EVENT.dates,
    details: EVENT.details,
    location: EVENT.location,
  });
  window.open(
    `https://calendar.google.com/calendar/render?${params.toString()}`,
    "_blank",
    "noopener,noreferrer"
  );
}
