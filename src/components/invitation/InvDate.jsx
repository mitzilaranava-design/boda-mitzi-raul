import { openGoogleCalendar } from "../../utils/calendar";
import Countdown from "../Countdown";
import InvReveal from "../InvReveal";

export default function InvDate() {
  return (
    <section className="inv-section inv-date-section">
      <div className="inv-date__content">

        <InvReveal delay={0}>
          <h2 className="inv-date__script">¡Nos Casamos!</h2>
        </InvReveal>

        <InvReveal delay={0.12}>
          <p className="inv-date__str">
            21 &nbsp;·&nbsp; Noviembre &nbsp;·&nbsp; 2026
          </p>
        </InvReveal>

        <InvReveal delay={0.24}>
          <Countdown />
        </InvReveal>

        <InvReveal delay={0.36}>
          <button className="inv-date__cal-btn" onClick={openGoogleCalendar}>
            Agregar a Calendario
          </button>
        </InvReveal>

      </div>
    </section>
  );
}
