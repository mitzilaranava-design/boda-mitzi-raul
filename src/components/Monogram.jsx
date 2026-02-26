import { motion } from "framer-motion";

const GOLD = "#b49b6b";

export default function Monogram() {
  return (
    <motion.div
      className="monogram-wrap"
      initial={{ opacity: 0, scale: 0.85, rotate: -18 }}
      animate={{ opacity: 1, scale: 1, rotate: -12 }}
      transition={{ delay: 0.1, duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Capa de flotación */}
      <motion.div
        className="monogram-float"
        animate={{ y: [0, -9, 0] }}
        transition={{ delay: 2.0, duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 280 280"
          xmlns="http://www.w3.org/2000/svg"
          className="monogram-svg"
          role="img"
          aria-label="Monograma Mitzi y Raúl"
        >
          {/* Círculo exterior */}
          <motion.circle
            cx="140" cy="140" r="130"
            fill="none" stroke={GOLD} strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.2, duration: 1.5, ease: "easeInOut" }}
          />

          {/* Círculo interior punteado */}
          <motion.circle
            cx="140" cy="140" r="121"
            fill="none" stroke={GOLD} strokeWidth="0.6"
            strokeDasharray="3 5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.65 }}
            transition={{ delay: 0.5, duration: 1.3, ease: "easeInOut" }}
          />

          {/* Diamante superior */}
          <motion.polygon
            points="140,5 143.5,12 140,19 136.5,12"
            fill={GOLD}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          />

          {/* Diamante inferior */}
          <motion.polygon
            points="140,261 143.5,268 140,275 136.5,268"
            fill={GOLD}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          />

          {/* M — renderiza primero = queda atrás */}
          <motion.text
            x="104" y="124"
            fontFamily="'Great Vibes', cursive"
            fontSize="84"
            fill={GOLD}
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.9 }}
          >M</motion.text>

          {/* R — renderiza segunda = queda en medio, más alejada de y */}
          <motion.text
            x="188" y="204"
            fontFamily="'Great Vibes', cursive"
            fontSize="84"
            fill={GOLD}
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.9 }}
          >R</motion.text>

          {/* y — renderiza última = al frente, más grande para no perder protagonismo */}
          <motion.text
            x="142" y="158"
            fontFamily="'Great Vibes', cursive"
            fontSize="66"
            fill={GOLD}
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >y</motion.text>
        </svg>
      </motion.div>
    </motion.div>
  );
}
