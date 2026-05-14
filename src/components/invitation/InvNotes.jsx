import { motion } from "framer-motion";
import { WEDDING, fadeUp } from "../../data/wedding";

const NOTE_ICONS = ["✉️", "🎊", "⏰", "🍸"];

export default function InvNotes() {
  return (
    <motion.section className="inv-section inv-notes" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <p className="inv-section__label">Toma en Cuenta</p>
        <h2>Recuerda...</h2>
        <div className="inv-notes__ornament">✦ &nbsp; ✦ &nbsp; ✦</div>
        <ul className="inv-notes__list">
          {WEDDING.notes.map((note, i) => (
            <li key={note} className="inv-notes__item">
              <span className="inv-notes__icon">{NOTE_ICONS[i] ?? "✦"}</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
