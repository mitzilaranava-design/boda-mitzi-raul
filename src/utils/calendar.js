/**
 * Genera archivo .ics para agregar al calendario del dispositivo.
 * Al descargar, el SO ofrece abrir con la app predeterminada (Google, Apple, Outlook, etc.)
 */

const EVENT = {
  summary: "Mitzi & Raúl - Boda",
  description: "Save the Date - Te esperamos",
  location: "Por confirmar",
  start: "20261004T180000Z",
  end: "20261004T210000Z",
};

export function downloadIcs() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Boda Mitzi Raul//ES",
    "BEGIN:VEVENT",
    `DTSTART:${EVENT.start}`,
    `DTEND:${EVENT.end}`,
    `SUMMARY:${EVENT.summary}`,
    `DESCRIPTION:${EVENT.description}`,
    `LOCATION:${EVENT.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "boda-mitzi-raul.ics";
  a.click();
  URL.revokeObjectURL(url);
}
