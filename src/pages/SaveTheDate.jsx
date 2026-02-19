import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Countdown from "../components/Countdown";
import MusicEqualizer from "../components/MusicEqualizer";

// Botón de música: reproduce un solo MP3.
// Dónde colocar el archivo: carpeta public/music/ (ej. public/music/save-the-date.mp3)
const AUDIO_SRC = "/music/save-the-date.mp3";

export default function SaveTheDate() {
  return (
    <div className="app">
      {AUDIO_SRC && <MusicEqualizer src={AUDIO_SRC} />}

      <Hero />

      <motion.section
        className="info"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          ¡Nos casamos!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Muy pronto celebraremos juntos el inicio de nuestra nueva historia.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Countdown />
        </motion.div>
      </motion.section>

      <motion.footer
        className="footer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        By ❤️ Mitzi & Raúl
      </motion.footer>
    </div>
  );
}
