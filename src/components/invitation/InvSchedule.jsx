import { useState, useEffect } from "react";
import { WEDDING } from "../../data/wedding";
import { getItinerarioConfig } from "../../api/gallery";
import InvReveal from "../InvReveal";

/* ── SVG icons (thin white-line style) ── */
const ChurchIcon = () => (
  <svg viewBox="0 0 40 52" fill="none" stroke="currentColor" strokeWidth="1.4"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* cross */}
    <line x1="20" y1="1" x2="20" y2="13" />
    <line x1="14" y1="7" x2="26" y2="7" />
    {/* bell tower */}
    <rect x="14" y="13" width="12" height="11" />
    {/* body */}
    <path d="M7 24 L7 49 L33 49 L33 24" />
    {/* body sides connect to tower */}
    <line x1="7"  y1="24" x2="14" y2="24" />
    <line x1="26" y1="24" x2="33" y2="24" />
    {/* arched door */}
    <path d="M15 49 L15 38 Q20 32 25 38 L25 49" />
    {/* side windows */}
    <path d="M10 30 L10 38 Q12.5 41 15 38 L15 30 Z" />
    <path d="M25 30 L25 38 Q27.5 41 30 38 L30 30 Z" />
  </svg>
);

const RingsIcon = () => (
  <svg viewBox="0 0 44 52" fill="none" stroke="currentColor" strokeWidth="1.4"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* left ring */}
    <circle cx="16" cy="26" r="10" />
    {/* right ring (overlapping) */}
    <circle cx="28" cy="26" r="10" />
    {/* small diamond on top */}
    <polygon points="22,10 25,14 22,18 19,14" />
    <line x1="22" y1="18" x2="22" y2="16" />
  </svg>
);

const GlassesIcon = () => (
  <svg viewBox="0 0 44 52" fill="none" stroke="currentColor" strokeWidth="1.4"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* left flute */}
    <path d="M10 6 L16 28 L8 28 Z" />
    <line x1="12" y1="28" x2="12" y2="42" />
    <line x1="7"  y1="42" x2="17" y2="42" />
    {/* right flute */}
    <path d="M34 6 L38 28 L28 28 Z" />
    <line x1="33" y1="28" x2="33" y2="42" />
    <line x1="28" y1="42" x2="38" y2="42" />
    {/* clink star */}
    <line x1="22" y1="3"  x2="22" y2="9"  />
    <line x1="19" y1="6"  x2="25" y2="6"  />
    <line x1="20" y1="4"  x2="24" y2="8"  />
    <line x1="24" y1="4"  x2="20" y2="8"  />
    {/* bubbles */}
    <circle cx="12" cy="15" r="1" />
    <circle cx="14" cy="21" r="0.8" />
    <circle cx="33" cy="14" r="1" />
    <circle cx="31" cy="20" r="0.8" />
  </svg>
);

const ClocheIcon = () => (
  <svg viewBox="0 0 44 52" fill="none" stroke="currentColor" strokeWidth="1.4"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* handle */}
    <circle cx="22" cy="10" r="3.5" />
    <line x1="22" y1="13.5" x2="22" y2="19" />
    {/* dome */}
    <path d="M5 38 Q5 19 22 19 Q39 19 39 38" />
    {/* plate */}
    <line x1="3"  y1="38" x2="41" y2="38" />
    <line x1="7"  y1="43" x2="37" y2="43" />
  </svg>
);

const DiscoIcon = () => (
  <svg viewBox="0 0 44 52" fill="none" stroke="currentColor" strokeWidth="1.4"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* record */}
    <circle cx="22" cy="28" r="18" />
    <circle cx="22" cy="28" r="6"  />
    <circle cx="22" cy="28" r="2"  />
    {/* sparkles */}
    <line x1="36" y1="8"  x2="36" y2="13" />
    <line x1="33.5" y1="10.5" x2="38.5" y2="10.5" />
    <line x1="8"  y1="6"  x2="8"  y2="10" />
    <line x1="6"  y1="8"  x2="10" y2="8"  />
    <line x1="38" y1="42" x2="38" y2="46" />
    <line x1="36" y1="44" x2="40" y2="44" />
  </svg>
);

const ICONS = {
  church:  <ChurchIcon  />,
  rings:   <RingsIcon   />,
  glasses: <GlassesIcon />,
  cloche:  <ClocheIcon  />,
  disco:   <DiscoIcon   />,
};

export default function InvSchedule() {
  const [activo, setActivo] = useState(null); // null = cargando

  useEffect(() => {
    getItinerarioConfig().then((cfg) => setActivo(cfg.itinerario_activo ?? false));
  }, []);

  if (activo === null) return null; // espera silenciosa mientras carga

  return (
    <section className="inv-section inv-schedule">
      <div className="inv-section__inner inv-section__inner--center">
        <div className="inv-schedule__card">

          <InvReveal delay={0}>
            <p className="inv-schedule__msg">¡Nos gustaría mucho que nos acompañaras!</p>
          </InvReveal>

          <InvReveal delay={0.1}>
            <h2>Itinerario</h2>
          </InvReveal>

          <div className="inv-vtimeline">
            <div className="inv-vtimeline__line" />

            {WEDDING.schedule.map((item, i) => {
              const isReverse = i % 2 !== 0;
              const isPending = !activo && i > 0;
              return (
                <InvReveal key={item.time} delay={0.18 + i * 0.1}>
                  <div
                    className={`inv-vtimeline__row${isReverse ? " inv-vtimeline__row--reverse" : ""}${isPending ? " inv-vtimeline__row--pending" : ""}`}
                  >
                    <div className="inv-vtimeline__side inv-vtimeline__side--left">
                      {isReverse && (
                        <div className="inv-vtimeline__content inv-vtimeline__content--left">
                          {isPending ? (
                            <span className="inv-vtimeline__pending-badge">En planeación</span>
                          ) : (
                            <>
                              <span className="inv-vtimeline__event">{item.event}</span>
                              <span className="inv-vtimeline__time">{item.time}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="inv-vtimeline__icon" aria-hidden="true">
                      {ICONS[item.icon]}
                    </div>

                    <div className="inv-vtimeline__side inv-vtimeline__side--right">
                      {!isReverse && (
                        <div className="inv-vtimeline__content inv-vtimeline__content--right">
                          {isPending ? (
                            <span className="inv-vtimeline__pending-badge">En planeación</span>
                          ) : (
                            <>
                              <span className="inv-vtimeline__event">{item.event}</span>
                              <span className="inv-vtimeline__time">{item.time}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </InvReveal>
              );
            })}
          </div>

          <InvReveal delay={0.7}>
            <div className="inv-schedule__footer">M &amp; R</div>
          </InvReveal>

        </div>
      </div>
    </section>
  );
}
