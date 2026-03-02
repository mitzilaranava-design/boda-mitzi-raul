import { motion } from "framer-motion";
import { WEDDING, fadeUp } from "../../data/wedding";

export default function InvSponsors() {
  return (
    <motion.section className="inv-section inv-sponsors" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <p className="inv-section__label">We Are Grateful For</p>
        <h2>Wedding Sponsors</h2>
        <div className="inv-sponsors__grid">
          {WEDDING.sponsors.map((s) => (
            <div key={s.category} className="inv-sponsor-item">
              <p className="inv-sponsor-item__category">{s.category}</p>
              <p className="inv-sponsor-item__names">{s.names}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
