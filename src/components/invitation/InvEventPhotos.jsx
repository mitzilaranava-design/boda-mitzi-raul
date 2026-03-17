import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { fadeUp } from "../../data/wedding";

export default function InvEventPhotos() {
  const { id } = useParams();

  // The gallery page uses the invitation session already stored by TokenGate,
  // so no token is needed in the link. Pass inv=id to associate uploaded photos.
  const galleryHref = id ? `/galeria?inv=${id}` : "/galeria";

  return (
    <motion.section className="inv-section inv-event-photos" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <div className="inv-event-photos__card">
          <p className="inv-section__label">Comparte el momento</p>
          <h2>Fotos del evento</h2>
          <p className="inv-event-photos__sub">
            Sube tus fotos y revive los mejores momentos de nuestra boda junto a nosotros.
          </p>
          <a href={galleryHref} className="inv-event-photos__btn">
            📸 Ver galería del evento
          </a>
        </div>
      </div>
    </motion.section>
  );
}
