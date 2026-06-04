import { motion } from "framer-motion";
import { WEDDING } from "../../data/wedding";
import { useParallaxY } from "../../hooks/useParallaxY";
import InvReveal from "../InvReveal";

export default function InvFamilies() {
  const { bride, groom } = WEDDING.parents;
  const photoSrc = WEDDING.sectionPhotos.families;
  const { ref, y } = useParallaxY(40);

  return (
    <section ref={ref} className="inv-section inv-section--layer inv-families">

      {/* Capa media: foto enmarcada con parallax */}
      <div className={`inv-layer__photo${!photoSrc ? " inv-layer__photo--empty" : ""}`}>
        {photoSrc && (
          <motion.div className="inv-layer__photo-inner" style={{ y }}>
            <img src={photoSrc} alt="" aria-hidden="true" />
          </motion.div>
        )}
      </div>

      {/* Capa frontal: tarjeta de contenido */}
      <div className="inv-layer__card">

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
