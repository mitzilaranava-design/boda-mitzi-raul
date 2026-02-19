import { motion } from "framer-motion";
import { downloadIcs } from "../utils/calendar";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="save"
        >
          RESERVA LA FECHA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Mitzi <span>&</span> Raúl
        </motion.h1>

        <motion.div
          className="line"
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ delay: 1.2, duration: 1.2 }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="date"
        >
          14 · Noviembre · 2026
        </motion.p>

        <motion.button
          type="button"
          onClick={downloadIcs}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, type: "spring", stiffness: 100 }}
          className="btn"
        >
          Agregar a calendario
        </motion.button>

      </div>
      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.6 }}
        aria-hidden="true"
      >


        {/* Flecha animada */}
        <motion.span
          className="hero-scroll-hint__arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M7 12l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </motion.div>
    </section>
  );
}
