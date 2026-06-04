import { motion } from "framer-motion";
import { WEDDING } from "../../data/wedding";
import { useParallaxY } from "../../hooks/useParallaxY";
import InvReveal from "../InvReveal";

export default function InvFarewell() {
  const photoSrc = WEDDING.sectionPhotos.farewell;
  const { ref, y } = useParallaxY(40);

  return (
    <section ref={ref} className="inv-section inv-section--layer inv-farewell">

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
