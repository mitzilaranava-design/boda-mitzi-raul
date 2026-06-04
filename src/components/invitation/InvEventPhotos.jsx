import { useParams } from "react-router-dom";
import InvReveal from "../InvReveal";

export default function InvEventPhotos() {
  const { id } = useParams();
  const galleryHref = id ? `/galeria?inv=${id}` : "/galeria";

  return (
    <section className="inv-section inv-event-photos">
      <div className="inv-section__inner inv-section__inner--center">
        <div className="inv-event-photos__card">

          <InvReveal delay={0}>
            <p className="inv-section__label">Comparte tus mejores</p>
          </InvReveal>

          <InvReveal delay={0.1}>
            <div className="inv-event-photos__camera">📸</div>
          </InvReveal>

          <InvReveal delay={0.18}>
            <h2 className="inv-event-photos__title">Momentos</h2>
          </InvReveal>

          <InvReveal delay={0.26}>
            <p className="inv-event-photos__heading">del evento</p>
          </InvReveal>

          <InvReveal delay={0.34}>
            <p className="inv-event-photos__sub">
              Sube tus fotos y revive los mejores momentos de nuestra boda junto a nosotros.
            </p>
          </InvReveal>

          <InvReveal delay={0.44}>
            <a href={galleryHref} className="inv-event-photos__btn">
              Ver galería
            </a>
          </InvReveal>

        </div>
      </div>
    </section>
  );
}
