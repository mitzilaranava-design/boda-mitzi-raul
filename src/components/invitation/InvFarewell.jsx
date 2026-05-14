import { motion } from "framer-motion";
import { WEDDING, fadeUp } from "../../data/wedding";

export default function InvFarewell() {
  return (
    <motion.section className="inv-section inv-farewell" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <div className="inv-farewell__icon">💍</div>
        <p className="inv-farewell__message">{WEDDING.farewell}</p>
        <div className="inv-farewell__divider">✦ &nbsp; ✦ &nbsp; ✦</div>
        <div className="inv-farewell__names">
          {WEDDING.bride} <span>&amp;</span> {WEDDING.groom}
        </div>
        <p className="inv-farewell__date">{WEDDING.date}</p>
      </div>
      <footer className="inv-farewell__footer">
        Creado con amor por {WEDDING.bride} &amp; {WEDDING.groom} 💛
      </footer>
    </motion.section>
  );
}
