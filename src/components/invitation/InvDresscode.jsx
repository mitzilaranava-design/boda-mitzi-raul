import { motion } from "framer-motion";
import { WEDDING, fadeUp } from "../../data/wedding";

export default function InvDresscode() {
  const { title, noteDamas, noteCaballeros } = WEDDING.dresscode;

  return (
    <motion.section className="inv-section inv-dresscode" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <div className="inv-dresscode__card">
          <p className="inv-section__label">Luce Increíble</p>
          <h2>Código de Vestimenta</h2>
          <p className="inv-dresscode__title">{title}</p>
          <p className="inv-dresscode__note">{noteDamas}</p>
          <p className="inv-dresscode__note">{noteCaballeros}</p>
        </div>
      </div>
    </motion.section>
  );
}
