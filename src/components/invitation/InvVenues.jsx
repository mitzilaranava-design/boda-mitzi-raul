import InvReveal from "../InvReveal";

export default function InvVenues({ venueData, typeLabel, variant = "gold" }) {
  return (
    <section className={`inv-section inv-venues inv-venues--${variant}`}>
      <div className="inv-section__inner inv-section__inner--center">
        <div className="inv-venue-card">

          <InvReveal delay={0}>
            <div className="inv-venue-card__body">
              <p className="inv-venue-card__type">{typeLabel}</p>
              <p className="inv-venue-card__name">{venueData.name}</p>
              <p className="inv-venue-card__address">{venueData.address}</p>
            </div>
          </InvReveal>

          {venueData.imageUrl && (
            <InvReveal delay={0.14}>
              <img
                src={venueData.imageUrl}
                alt={venueData.name}
                className="inv-venue-card__img"
              />
            </InvReveal>
          )}

          <InvReveal delay={0.26}>
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
          </InvReveal>

        </div>
      </div>
    </section>
  );
}
