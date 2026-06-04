import { motion } from "framer-motion";

const variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const ease = [0.25, 0.46, 0.45, 0.94];

/**
 * Envuelve cualquier contenido con una animación fade+slide-up
 * al entrar al viewport. Usa `delay` para escalonar elementos.
 */
export default function InvReveal({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
