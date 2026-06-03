import { WEDDING } from "../../data/wedding";
import InvReveal from "../InvReveal";

export default function InvFarewell() {
  return (
    <section className="inv-section inv-farewell">
      <div className="inv-section__inner inv-section__inner--center">

        <InvReveal delay={0}>
          <div className="inv-farewell__icon">💍</div>
        </InvReveal>

        <InvReveal delay={0.12}>
          <p className="inv-farewell__message">{WEDDING.farewell}</p>
        </InvReveal>

        <InvReveal delay={0.24}>
          <div className="inv-farewell__divider">✦ &nbsp; ✦ &nbsp; ✦</div>
        </InvReveal>

        <InvReveal delay={0.34}>
          <div className="inv-farewell__names">
            {WEDDING.bride} <span>&amp;</span> {WEDDING.groom}
          </div>
        </InvReveal>

        <InvReveal delay={0.42}>
          <p className="inv-farewell__date">{WEDDING.date}</p>
        </InvReveal>

      </div>
      <footer className="inv-farewell__footer">
        Creado con amor por {WEDDING.bride} &amp; {WEDDING.groom} 💛
      </footer>
    </section>
  );
}
