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
          SAVE THE DATE
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
          04 · Octubre · 2026
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
    </section>
  );
}
