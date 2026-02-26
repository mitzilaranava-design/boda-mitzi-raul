import { motion } from "framer-motion";
import { openGoogleCalendar } from "../utils/calendar";
import Monogram from "./Monogram";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        {/* Anagrama primero: pieza visual central */}
        <Monogram />

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="save"
        >
          RESERVA LA FECHA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.9 }}
        >
          Mitzi <span>&</span> Raúl
        </motion.h1>

        <motion.div
          className="line"
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ delay: 2.3, duration: 1.0 }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="date"
        >
          21 · Noviembre · 2026
        </motion.p>

        <motion.button
          type="button"
          onClick={openGoogleCalendar}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9, type: "spring", stiffness: 100 }}
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
