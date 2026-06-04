import { motion } from "framer-motion";
import { WEDDING } from "../../data/wedding";

export default function InvCover() {
  return (
    <motion.section
      className="inv-section inv-cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    >
      <img
        src="/assets/cover.jpg"
        className="inv-cover__bg"
        alt=""
        aria-hidden="true"
        loading="eager"
      />

      <div className="inv-cover__top-fade" />
      <div className="inv-cover__bottom-fade" />

      <div className="inv-cover__names-wrap">
        <h1 className="inv-cover__names-script">
          {WEDDING.bride} &amp; {WEDDING.groom}
        </h1>
      </div>

      <motion.div
        className="inv-cover__info"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.6, ease: "easeOut" }}
      >
        <span className="inv-cover__info-ornament">✦ &nbsp;·&nbsp; ✦</span>
        <p className="inv-cover__info-date">21 · Noviembre · 2026</p>
        <p className="inv-cover__info-city">Cuernavaca, Morelos</p>
      </motion.div>
    </motion.section>
  );
}
