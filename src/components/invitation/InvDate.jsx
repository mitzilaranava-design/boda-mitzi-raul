import { motion } from "framer-motion";
import { WEDDING, fadeUp } from "../../data/wedding";
import Countdown from "../Countdown";

export default function InvDate() {
  return (
    <motion.section className="inv-section inv-date-section" {...fadeUp}>
      <div className="inv-date__content">

        <h2 className="inv-date__script">¡Nos Casamos!</h2>

        <p className="inv-date__str">
          21 &nbsp;·&nbsp; Noviembre &nbsp;·&nbsp; 2026
        </p>

        <Countdown />

        {WEDDING.googleCalendarUrl && (
          <a
            className="inv-date__cal-btn"
            href={WEDDING.googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Agregar a Calendario
          </a>
        )}

      </div>
    </motion.section>
  );
}
