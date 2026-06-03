import { WEDDING } from "../../data/wedding";
import InvReveal from "../InvReveal";

export default function InvFamilies() {
  const { bride, groom } = WEDDING.parents;

  return (
    <section className="inv-section inv-families">
      <div className="inv-section__inner inv-section__inner--center">

        <InvReveal delay={0}>
          <p className="inv-section__label">Con la Bendición de</p>
        </InvReveal>

        <InvReveal delay={0.1}>
          <h2>Nuestras Familias</h2>
        </InvReveal>

        <InvReveal delay={0.22}>
          <div className="inv-families__grid">
            <div className="inv-family-card">
              <p className="inv-family-card__role">Padres de la Novia</p>
              <p className="inv-family-card__name">{bride.mother}</p>
              <p className="inv-family-card__name">{bride.father}</p>
            </div>
            <div className="inv-family-card">
              <p className="inv-family-card__role">Madre del Novio</p>
              <p className="inv-family-card__name">{groom.mother}</p>
            </div>
          </div>
        </InvReveal>

      </div>
    </section>
  );
}
