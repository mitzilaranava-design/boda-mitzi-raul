import { motion } from "framer-motion";
import { WEDDING, fadeUp } from "../../data/wedding";

export default function InvFarewell() {
  return (
    <motion.section className="inv-section inv-farewell" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <p className="inv-farewell__message">{WEDDING.farewell}</p>
        <div className="inv-farewell__names">
          {WEDDING.bride} <span>&amp;</span> {WEDDING.groom}
        </div>
        <p className="inv-farewell__date">{WEDDING.date}</p>
        <p className="inv-farewell__footer">
          Made with love for our special day 💛
        </p>
      </div>
    </motion.section>
  );
}
