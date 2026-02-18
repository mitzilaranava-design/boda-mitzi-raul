import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Countdown from "../components/Countdown";

export default function SaveTheDate() {
  return (
    <div className="app">
      <Hero />

      <motion.section
        className="info"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2>¡Nos casamos!</h2>
        <p>
          Muy pronto celebraremos juntos el inicio de nuestra nueva historia.
        </p>
        <Countdown />
      </motion.section>

      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        Creado con ❤️ por Mitzi y Raúl
      </motion.footer>
    </div>
  );
}
