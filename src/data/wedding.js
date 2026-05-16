// ── Audio ─────────────────────────────────────────────────────
// Cambia la ruta cuando tengas un archivo dedicado para la invitación:
// export const AUDIO_SRC = "/music/invitation.mp3";
export const AUDIO_SRC = "/music/save-the-date.mp3";

// ── Shared animation preset ───────────────────────────────────
export const fadeUp = {
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: false, amount: 0.15 },
  transition:  { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ── Wedding Data ──────────────────────────────────────────────
// Edit this object to update all sections of the invitation
export const WEDDING = {
  bride: "Mitzi",
  groom: "Raúl",
  date:  "21 de noviembre de 2026",
  time:  "5:00 PM",

  message1: "El día más importante de nuestras vidas ha llegado",

  // Pega aquí tu URL de Google Calendar para mostrar el botón en InvDate
  googleCalendarUrl: null,

  parents: {
    bride: {
      mother: "Rosa Nava Loeza",
      father: "Alejandro Lara Segura",
    },
    groom: {
      mother: "Graciela Ramírez Casillas"
    },
  },

  sponsors: [
    { category: "Velación",  padrino: "Evi Alexander Lara",  madrina: "Sheila Villalobos" },
    { category: "Lazo",      padrino: "Aldo Vargas",  madrina: "Zaudizaret Lopez"  },
    { category: "Arras",     padrino: "Juan Miguel Sotelo",  madrina: "Elizabeth Lara"  },
    { category: "Ramo",      madrina: "Naydelyn Yaretzy Sotelo"},
    { category: "Anillos",   madrina: "Denisse Adriana Vargas" },
    { category: "Biblia y Rosario", madrina: "Mayra Lara", padrino: "Evaristo Antúnez & Levi Lara" }
  ],

  schedule: [
    { time: "4:00 PM", event: "Ceremonia Religiosa", icon: "church"  },
    { time: "5:30 PM", event: "Ceremonia Civil",     icon: "rings"   },
    { time: "6:00 PM", event: "Recepción",           icon: "glasses" },
    { time: "7:00 PM", event: "Cena",                icon: "cloche"  },
    { time: "8:00 PM", event: "Fiesta",              icon: "disco"   },
  ],

  venues: {
    church: {
      name:     "Parroquia María Madre de la Misericordia",
      address:  "Río Tamazula 25, Vista Hermosa, 62290 Cuernavaca, Mor.",
      mapsUrl:  "https://maps.app.goo.gl/GX8t6xZxC3b3sqXA9",
      imageUrl: "/assets/venues/church.jpg",
    },
    venue: {
      name:     "Jardín El Encanto",
      address:  "C. Cnel. Ahumada 42, Los Volcanes, 62350 Cuernavaca, Mor.",
      mapsUrl:  "https://maps.app.goo.gl/yo874sfYp9cGwVdW9",
      imageUrl: "/assets/venues/venue.jpg",
    },
  },

  // Coloca las fotos de los novios en /public/assets/gallery/
  gallery: [
    "/assets/gallery/foto-1.jpg",
    "/assets/gallery/foto-2.jpg",
    "/assets/gallery/foto-3.jpg",
    /*"/assets/gallery/foto-4.jpg",
    "/assets/gallery/foto-5.jpg",
    "/assets/gallery/foto-6.jpg",
    "/assets/gallery/foto-7.jpg",
    "/assets/gallery/foto-8.jpg",
    "/assets/gallery/foto-9.jpg",*/
  ],

  registry: [
    { store: "Liverpool", url: "http://mesaderegalos.liverpool.com.mx/milistaderegalos/52006380" },
  ],

  dresscode: {
    title:     "Etiqueta Formal",
    noteDamas: "👗 Damas: vestido largo.",
    noteCaballeros: "🤵 Caballeros: traje completo.",
  },

  notes: [
    "Confirma tu asistencia antes del 21 de agosto de 2026.",
    "Llegar al menos 20 minutos antes del inicio dell evento.",
    "Evitar llevar acompañantes no incluidos en la invitación (pases asignados).",
    "Seguir las instrucciones del personal del evento (coordinadores, meseros, fotógrafos, etc.).",
    "Respetar la hora de cierre del evento.",
  ],

  farewell:
    "No podemos esperar para celebrar este hermoso capítulo junto a ti. Tu presencia es el mayor regalo en este día tan especial.",
};
