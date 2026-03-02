import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { WEDDING } from "../../data/wedding";

export default function InvCover() {
  return (
    <motion.section
      className="inv-section inv-cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    >
      {/* Imagen de fondo */}
      <img
        src="/assets/cover.jpg"
        className="inv-cover__bg"
        alt=""
        aria-hidden="true"
        loading="eager"
      />

      {/* Gradiente suave en la parte superior */}
      <div className="inv-cover__top-fade" />

      {/* Botón home */}
      <Link to="/" className="inv-cover__home-btn" aria-label="Inicio">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </Link>

      {/* Nombres — centrados en el top 50% */}
      <div className="inv-cover__names-wrap">
        <h1 className="inv-cover__names-script">
          {WEDDING.bride} &amp; {WEDDING.groom}
        </h1>
      </div>

      {/* Banner mensaje — se revela de izquierda a derecha como una cortina */}
      <motion.div
        className="inv-cover__mensaje"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.1, delay: 1.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <h4 className="inv-cover__mensaje-text">{WEDDING.message1}</h4>
      </motion.div>
    </motion.section>
  );
}
