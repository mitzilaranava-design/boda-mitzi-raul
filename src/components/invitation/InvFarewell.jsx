import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { WEDDING, fadeUp } from "../../data/wedding";

export default function InvFarewell() {
  const { id } = useParams(); // ID del invitado desde /inv/:id

  // No necesita token: la sesión de invitación (boda_access) ya autoriza la galería.
  // Solo pasa inv=id para ligar las fotos que suba al invitado.
  const galeriaHref = id ? `/galeria?inv=${id}` : "/galeria";

  return (
    <motion.section className="inv-section inv-farewell" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <p className="inv-farewell__message">{WEDDING.farewell}</p>
        <div className="inv-farewell__names">
          {WEDDING.bride} <span>&amp;</span> {WEDDING.groom}
        </div>
        <p className="inv-farewell__date">{WEDDING.date}</p>
        <a href={galeriaHref} className="btn-galeria">
          📸 Galería del evento
        </a>
        <p className="inv-farewell__footer">
          Hecho con amor para nuestro día especial 💛
        </p>
      </div>
    </motion.section>
  );
}
