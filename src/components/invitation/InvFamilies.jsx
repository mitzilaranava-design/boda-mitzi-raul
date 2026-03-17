import { motion } from "framer-motion";
import { WEDDING, fadeUp } from "../../data/wedding";

export default function InvFamilies() {
  const { bride, groom } = WEDDING.parents;

  return (
    <motion.section className="inv-section inv-families" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <p className="inv-section__label">Con la Bendición de</p>
        <h2>Nuestras Familias</h2>
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
      </div>
    </motion.section>
  );
}
