import { useState } from "react";
import { WEDDING } from "../../data/wedding";
import InvReveal from "../InvReveal";

// SVG icon per sponsor category
const CATEGORY_ICONS = {
  Velación: (
    // Candle with flame
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 6c0 0-4 5-4 9a4 4 0 0 0 8 0c0-4-4-9-4-9z"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <rect x="19" y="18" width="10" height="22" rx="1"
        stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="14" y1="40" x2="34" y2="40"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="10" y1="44" x2="38" y2="44"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Lazo: (
    // Infinity knot / lasso
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M8 24c0-6 4-10 9-10s8 4 7 8-4 8-7 8-6-3-6-6 3-6 6-6 7 3 7 6-2 6-6 8-9 4-9 2"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M8 24c0 6 4 10 9 10s8-4 7-8"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M40 24c0-6-4-10-9-10s-8 4-7 8 4 8 7 8 6-3 6-6-3-6-6-6-7 3-7 6 2 6 6 8 9 4 9 2"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M40 24c0 6-4 10-9 10s-8-4-7-8"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  Arras: (
    // Stack of coins
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <ellipse cx="24" cy="14" rx="12" ry="5" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 14v5c0 2.76 5.37 5 12 5s12-2.24 12-5v-5"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 19v5c0 2.76 5.37 5 12 5s12-2.24 12-5v-5"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 24v5c0 2.76 5.37 5 12 5s12-2.24 12-5v-5"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Ramo: (
    // Bouquet / flower
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="18" r="5" stroke="currentColor" strokeWidth="2"/>
      <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="34" cy="14" r="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="11" cy="24" r="3.5" stroke="currentColor" strokeWidth="2"/>
      <circle cx="37" cy="24" r="3.5" stroke="currentColor" strokeWidth="2"/>
      <path d="M17 26c2-2 4-3 7-3s5 1 7 3l2 14H15l2-14z"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <line x1="24" y1="23" x2="24" y2="28"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Anillos: (
    // Two interlocked rings
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="18" cy="24" r="9" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="30" cy="24" r="9" stroke="currentColor" strokeWidth="2.5"/>
    </svg>
  ),
  "Biblia y Rosario": (
    // Open book with cross
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M8 38V12a2 2 0 0 1 2-2h12c2 0 4 1 6 3 2-2 4-3 6-3h12a2 2 0 0 1 2 2v26"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="28" y1="10" x2="28" y2="41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="24" y1="17" x2="24" y2="25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="20" y1="21" x2="28" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

const DEFAULT_ICON = (
  // Handshake fallback
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <path d="M6 28l8-8 6 3 8-8 8 3 6-4"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 30s3 7 10 7 10-5 10-5l10 3c3 0 6-3 6-6"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

export default function InvSponsors() {
  const [active, setActive] = useState(0);
  const sponsors = WEDDING.sponsors;
  const current  = sponsors[active];

  const prev = () => setActive((i) => (i - 1 + sponsors.length) % sponsors.length);
  const next = () => setActive((i) => (i + 1) % sponsors.length);

  const icon = CATEGORY_ICONS[current.category] ?? DEFAULT_ICON;

  return (
    <section className="inv-section inv-sponsors">
      <div className="inv-section__inner inv-sponsors__inner">

        <InvReveal delay={0}>
          <img
            className="inv-sponsors__photo"
            src="/assets/cover.jpg"
            alt="Padrinos"
          />
        </InvReveal>

        <div className="inv-sponsors__body">
          <InvReveal delay={0.14}>
            <h2 className="inv-sponsors__heading">Padrinos</h2>
          </InvReveal>

          <InvReveal delay={0.26}>
            <div className="inv-sponsors__carousel" role="region" aria-label="Padrinos">
              <button
                className="inv-sponsors__arrow"
                onClick={prev}
                aria-label="Padrino anterior"
              >
                &#8249;
              </button>

              <div className="inv-sponsors__slide">
                <span className="inv-sponsors__icon">{icon}</span>
                <p className="inv-sponsors__category">{current.category}</p>
                {current.madrina && <p className="inv-sponsors__name">{current.madrina}</p>}
                {current.padrino && <p className="inv-sponsors__name">{current.padrino}</p>}
              </div>

              <button
                className="inv-sponsors__arrow"
                onClick={next}
                aria-label="Siguiente padrino"
              >
                &#8250;
              </button>
            </div>
          </InvReveal>

          <InvReveal delay={0.36}>
            <div className="inv-sponsors__dots">
              {sponsors.map((_, i) => (
                <button
                  key={i}
                  className={`inv-sponsors__dot${i === active ? " inv-sponsors__dot--active" : ""}`}
                  onClick={() => setActive(i)}
                  aria-label={sponsors[i].category}
                />
              ))}
            </div>
          </InvReveal>
        </div>

      </div>
    </section>
  );
}
