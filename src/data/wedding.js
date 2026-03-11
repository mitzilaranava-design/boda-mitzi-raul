// ── Audio ─────────────────────────────────────────────────────
// Para habilitar música en la invitación, cambia null por la ruta:
// export const AUDIO_SRC = "/music/invitation.mp3";
export const AUDIO_SRC = null;

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
  date:  "November 21, 2026",
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
    { category: "Anillos",   padrino: "Nombre Padrino",  madrina: "Denisse Vargas"  }
  ],

  schedule: [
    { time: "4:00 PM", event: "Ceremonia Religiosa", icon: "church"  },
    { time: "6:00 PM", event: "Ceremonia Civil",     icon: "rings"   },
    { time: "7:00 PM", event: "Recepción",           icon: "glasses" },
    { time: "8:30 PM", event: "Cena",                icon: "cloche"  },
    { time: "9:30 PM", event: "Fiesta",              icon: "disco"   },
  ],

  venues: {
    church: {
      name:    "Church Name",
      address: "Church Address, City, State",
      mapsUrl: "#",
    },
    venue: {
      name:    "Venue Name",
      address: "Venue Address, City, State",
      mapsUrl: "#",
    },
  },

  registry: [
    { store: "Liverpool", url: "#" },
    { store: "Amazon",    url: "#" },
    { store: "Cash Gift", url: "#" },
  ],

  dresscode: {
    title: "Formal Attire",
    note:  "Ladies: long or cocktail dress. Gentlemen: suit and tie.",
    avoid: "Please avoid white, ivory, and light beige tones.",
  },

  notes: [
    "This is an adults-only celebration.",
    "Kindly RSVP before October 21, 2026.",
    "Confetti and outside decorations are not allowed at the venue.",
    "Please be punctual — the ceremony begins exactly at 5:00 PM.",
  ],

  farewell:
    "We cannot wait to celebrate this beautiful chapter with you. Your presence is the greatest gift.",
};
