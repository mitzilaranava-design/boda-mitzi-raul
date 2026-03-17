import { motion } from "framer-motion";
import { WEDDING, fadeUp } from "../../data/wedding";

export default function InvRegistry() {
  return (
    <motion.section className="inv-section inv-registry" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <p className="inv-section__label">Tu Generosidad lo Es Todo</p>
        <h2>Mesa de Regalos</h2>
        <p className="inv-section__sub">
          Tu presencia es nuestro mejor regalo. Si deseas obsequiarnos algo,
          aquí encontrarás nuestras opciones:
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
