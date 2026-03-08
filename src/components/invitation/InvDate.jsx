import { motion } from "framer-motion";
import { fadeUp } from "../../data/wedding";
import { openGoogleCalendar } from "../../utils/calendar";
import Countdown from "../Countdown";

export default function InvDate() {
  return (
    <motion.section className="inv-section inv-date-section" {...fadeUp}>
      <div className="inv-date__content">

        <h2 className="inv-date__script">¡Nos Casamos!</h2>

        <div className="inv-date__divider" />

        <p className="inv-date__str">
          21 &nbsp;·&nbsp; Noviembre &nbsp;·&nbsp; 2026
        </p>

        <Countdown />

        <button className="inv-date__cal-btn" onClick={openGoogleCalendar}>
          Agregar a Calendario
        </button>

      </div>
    </motion.section>
  );
}
