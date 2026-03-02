import { motion } from "framer-motion";
import { WEDDING, fadeUp } from "../../data/wedding";

export default function InvVenues() {
  const { church, venue } = WEDDING.venues;

  return (
    <motion.section className="inv-section inv-venues" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <p className="inv-section__label">Where to Find Us</p>
        <h2>Ceremony &amp; Reception</h2>
        <div className="inv-venues__grid">
          <div className="inv-venue-card">
            <p className="inv-venue-card__type">⛪ Ceremony</p>
            <p className="inv-venue-card__name">{church.name}</p>
            <p className="inv-venue-card__address">{church.address}</p>
            <a
              href={church.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inv-venue-card__link"
            >
              Open in Maps →
            </a>
          </div>
          <div className="inv-venue-card">
            <p className="inv-venue-card__type">🥂 Reception</p>
            <p className="inv-venue-card__name">{venue.name}</p>
            <p className="inv-venue-card__address">{venue.address}</p>
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inv-venue-card__link"
            >
              Open in Maps →
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
