import { motion } from "framer-motion";
import { WEDDING, fadeUp } from "../../data/wedding";

export default function InvNotes() {
  return (
    <motion.section className="inv-section inv-notes" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <p className="inv-section__label">Please Keep in Mind</p>
        <h2>Good to Know</h2>
        <ul className="inv-notes__list">
          {WEDDING.notes.map((note) => (
            <li key={note} className="inv-notes__item">
              {note}
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
