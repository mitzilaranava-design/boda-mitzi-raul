import { motion } from "framer-motion";
import { WEDDING, fadeUp } from "../../data/wedding";

export default function InvRegistry() {
  return (
    <motion.section className="inv-section inv-registry" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <p className="inv-section__label">Con amor, de su parte</p>
        <h2>Mesa de Regalos</h2>
        <p className="inv-section__sub">
          Tu presencia en este día tan especial es el regalo más grande que
          podríamos recibir. Si en tu corazón nace el deseo de hacernos un
          obsequio, hemos preparado una lista de regalos
          que puede servirte de guía:
        </p>
        <div className="inv-registry__list">
          {WEDDING.registry.map((r) => (
            <a
              key={r.store}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="inv-registry__item"
            >
              {r.store}
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
