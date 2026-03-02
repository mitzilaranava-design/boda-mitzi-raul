import { motion } from "framer-motion";
import { WEDDING, fadeUp } from "../../data/wedding";

export default function InvFamilies() {
  const { bride, groom } = WEDDING.parents;

  return (
    <motion.section className="inv-section inv-families" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <p className="inv-section__label">With the Blessing of</p>
        <h2>Our Families</h2>
        <div className="inv-families__grid">
          <div className="inv-family-card">
            <p className="inv-family-card__role">Bride&apos;s Parents</p>
            <p className="inv-family-card__name">{bride.mother}</p>
            <span className="inv-family-card__amp">&amp;</span>
            <p className="inv-family-card__name">{bride.father}</p>
          </div>
          <div className="inv-family-card">
            <p className="inv-family-card__role">Groom&apos;s Parents</p>
            <p className="inv-family-card__name">{groom.mother}</p>
            <span className="inv-family-card__amp">&amp;</span>
            <p className="inv-family-card__name">{groom.father}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
