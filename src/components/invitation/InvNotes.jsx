import { WEDDING } from "../../data/wedding";
import InvReveal from "../InvReveal";

const NOTE_ICONS = ["✉️", "🎊", "⏰", "🍸"];

export default function InvNotes() {
  return (
    <section className="inv-section inv-notes">
      <div className="inv-section__inner inv-section__inner--center">

        <InvReveal delay={0}>
          <p className="inv-section__label">Toma en Cuenta</p>
        </InvReveal>

        <InvReveal delay={0.1}>
          <h2>Recuerda...</h2>
        </InvReveal>

        <InvReveal delay={0.18}>
          <div className="inv-notes__ornament">✦ &nbsp; ✦ &nbsp; ✦</div>
        </InvReveal>

        <InvReveal delay={0.28}>
          <ul className="inv-notes__list">
            {WEDDING.notes.map((note, i) => (
              <li key={note} className="inv-notes__item">
                <span className="inv-notes__icon">{NOTE_ICONS[i] ?? "✦"}</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </InvReveal>

      </div>
    </section>
  );
}
