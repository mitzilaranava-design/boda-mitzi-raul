import { motion } from "framer-motion";
import { WEDDING } from "../../data/wedding";

export default function InvMensaje() {
  return (
    <motion.div
      className="inv-mensaje"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <h4 className="inv-mensaje__text">{WEDDING.message1}</h4>
    </motion.div>
  );
}
