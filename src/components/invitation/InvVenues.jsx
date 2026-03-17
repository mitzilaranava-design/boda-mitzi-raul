import { motion } from "framer-motion";
import { fadeUp } from "../../data/wedding";

/**
 * Muestra un lugar (iglesia o salón) como sección independiente.
 * Props:
 *   venueData  — { name, address, mapsUrl, imageUrl }
 *   typeLabel  — etiqueta visible, ej. "⛪ Ceremonia religiosa"
 *   variant    — 'gold' | 'cream'  (alterna entre secciones)
 */
export default function InvVenues({ venueData, typeLabel, variant = "gold" }) {
  return (
    <motion.section
      className={`inv-section inv-venues inv-venues--${variant}`}
      {...fadeUp}
    >
      <div className="inv-section__inner inv-section__inner--center">
        <div className="inv-venue-card">
          <div className="inv-venue-card__body">
            <p className="inv-venue-card__type">{typeLabel}</p>
            <p className="inv-venue-card__name">{venueData.name}</p>
            <p className="inv-venue-card__address">{venueData.address}</p>
          </div>
          {venueData.imageUrl && (
            <img
              src={venueData.imageUrl}
              alt={venueData.name}
              className="inv-venue-card__img"
            />
          )}
          <div className="inv-venue-card__footer">
            <a
              href={venueData.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inv-venue-card__link"
            >
              Ver en Maps →
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
