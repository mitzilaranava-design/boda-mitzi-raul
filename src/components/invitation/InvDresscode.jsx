import { WEDDING } from "../../data/wedding";
import InvReveal from "../InvReveal";

export default function InvDresscode() {
  const { title, noteDamas, noteCaballeros } = WEDDING.dresscode;

  return (
    <section className="inv-section inv-dresscode">
      <div className="inv-section__inner inv-section__inner--center">
        <div className="inv-dresscode__card">

          <InvReveal delay={0}>
            <p className="inv-section__label">Luce Increíble</p>
          </InvReveal>

          <InvReveal delay={0.1}>
            <h2>Código de Vestimenta</h2>
          </InvReveal>

          <InvReveal delay={0.2}>
            <p className="inv-dresscode__title">{title}</p>
          </InvReveal>

          <InvReveal delay={0.3}>
            <p className="inv-dresscode__note">{noteDamas}</p>
          </InvReveal>

          <InvReveal delay={0.38}>
            <p className="inv-dresscode__note">{noteCaballeros}</p>
          </InvReveal>

        </div>
      </div>
    </section>
  );
}
