import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { fadeUp } from "../../data/wedding";

export default function InvEventPhotos() {
  const { id } = useParams();
  const galleryHref = id ? `/galeria?inv=${id}` : "/galeria";

  return (
    <motion.section className="inv-section inv-event-photos" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <div className="inv-event-photos__card">
          <p className="inv-section__label">Comparte tus mejores</p>
          <div className="inv-event-photos__camera">📸</div>
          <h2 className="inv-event-photos__title">Momentos</h2>
          <p className="inv-event-photos__heading">del evento</p>
          <p className="inv-event-photos__sub">
            Sube tus fotos y revive los mejores momentos de nuestra boda junto a nosotros.
          </p>
          <a href={galleryHref} className="inv-event-photos__btn">
            Ver galería
          </a>
        </div>
      </div>
    </motion.section>
  );
}
