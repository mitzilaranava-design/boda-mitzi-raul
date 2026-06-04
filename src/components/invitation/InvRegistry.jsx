import { WEDDING } from "../../data/wedding";
import InvReveal from "../InvReveal";

export default function InvRegistry() {
  const photoSrc = WEDDING.sectionPhotos.registry;

  return (
    <section className="inv-section inv-section--split inv-registry">

      {/* Mitad izquierda: foto */}
      <div className="inv-split__photo">
        {photoSrc && <img src={photoSrc} alt="" aria-hidden="true" />}
      </div>

      {/* Mitad derecha: contenido */}
      <div className="inv-split__content">
        <div className="inv-section__inner inv-section__inner--center">

          <InvReveal delay={0}>
            <p className="inv-section__label">Con amor, de su parte</p>
          </InvReveal>

          <InvReveal delay={0.1}>
            <h2>Mesa de Regalos</h2>
          </InvReveal>

          <InvReveal delay={0.2}>
            <p className="inv-section__sub">
              Tu presencia en este día tan especial es el regalo más grande que
              podríamos recibir. Si en tu corazón nace el deseo de hacernos un
              obsequio, hemos preparado una lista de regalos
              que puede servirte de guía:
            </p>
          </InvReveal>

          <InvReveal delay={0.32}>
            <div className="inv-registry__list">
              {WEDDING.registry.map((r) => (
                <a
                  key={r.store}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inv-registry__item"
                >
                  {r.store}
                </a>
              ))}
            </div>
          </InvReveal>

        </div>
      </div>

    </section>
  );
}
