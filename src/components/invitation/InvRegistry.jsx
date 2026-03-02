import { motion } from "framer-motion";
import { WEDDING, fadeUp } from "../../data/wedding";

export default function InvRegistry() {
  return (
    <motion.section className="inv-section inv-registry" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <p className="inv-section__label">Your Generosity Means the World</p>
        <h2>Gift Registry</h2>
        <p className="inv-section__sub">
          Your presence is our greatest gift. However, if you wish to honor us
          with a present, we have set up the following registries:
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
