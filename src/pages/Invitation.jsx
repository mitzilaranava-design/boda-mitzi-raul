import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getInvitado, confirmarAsistencia, marcarNoAsiste } from "../api/invitations";
import MusicEqualizer from "../components/MusicEqualizer";
import { AUDIO_SRC, WEDDING } from "../data/wedding";
import "../styles/Invitation.css";

const SECTIONS = [
  { id: "inv-portada",    label: "Portada" },
  { id: "inv-pases",      label: "Confirmación" },
  { id: "inv-fecha",      label: "Fecha" },
  { id: "inv-familias",   label: "Familias" },
  { id: "inv-padrinos",   label: "Padrinos" },
  { id: "inv-programa",   label: "Programa" },
  { id: "inv-iglesia",    label: "Ceremonia religiosa" },
  { id: "inv-salon",      label: "Recepción" },
  { id: "inv-clima",      label: "Clima" },
  { id: "inv-regalos",    label: "Mesa de Regalos" },
  { id: "inv-vestimenta", label: "Vestimenta" },
  { id: "inv-notas",      label: "Notas" },
  { id: "inv-fotos",      label: "Galería" },
  { id: "inv-despedida",  label: "Hasta pronto" },
];

// ── Invitation sections ───────────────────────────────────────
import InvCover     from "../components/invitation/InvCover";
import InvPasses    from "../components/invitation/InvPasses";
import InvDate      from "../components/invitation/InvDate";
import InvFamilies  from "../components/invitation/InvFamilies";
import InvSponsors  from "../components/invitation/InvSponsors";
import InvSchedule  from "../components/invitation/InvSchedule";
import InvVenues    from "../components/invitation/InvVenues";
import InvWeather   from "../components/invitation/InvWeather";
import InvRegistry  from "../components/invitation/InvRegistry";
import InvDresscode from "../components/invitation/InvDresscode";
import InvNotes       from "../components/invitation/InvNotes";
import InvEventPhotos from "../components/invitation/InvEventPhotos";
import InvFarewell    from "../components/invitation/InvFarewell";

export default function Invitation() {
  const { id } = useParams();
  const [invitado,      setInvitado]      = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [respuesta,     setRespuesta]     = useState(null); // null | 'si' | 'no'
  const [numAsistentes, setNumAsistentes] = useState(1);
  const [confirmando,   setConfirmando]   = useState(false);
  const [confirmado,    setConfirmado]    = useState(false);
  const [error,         setError]         = useState(null);
  const [menuOpen,      setMenuOpen]      = useState(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const ID_REGEX = /^[a-zA-Z0-9_-]{1,80}$/;
    if (!ID_REGEX.test(id)) {
      setError("Invitación no válida");
      setLoading(false);
      return;
    }
    getInvitado(id)
      .then((data) => {
        setInvitado(data);
        if (data) setNumAsistentes(1);
        setError(!data ? "Invitación no válida" : null);
      })
      .catch(() => setError("Invitación no válida"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleConfirmar = async () => {
    if (!invitado) return;
    setConfirmando(true);
    try {
      await confirmarAsistencia(invitado.id, numAsistentes);
      setConfirmado(true);
    } catch {
      setError("No se pudo confirmar. Intenta de nuevo.");
    } finally {
      setConfirmando(false);
    }
  };

  const handleRechazar = async () => {
    if (!invitado) return;
    setConfirmando(true);
    try {
      await marcarNoAsiste(invitado.id);
      setConfirmado(true);
    } catch {
      setError("No se pudo registrar. Intenta de nuevo.");
    } finally {
      setConfirmando(false);
    }
  };

  // ── Guard states ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="app invitation-page">
        <div className="loading">Cargando tu invitación...</div>
      </div>
    );
  }

  if (error && !invitado) {
    return (
      <div className="app invitation-page">
        <div className="invitation-error">
          <p>Este enlace no es válido.</p>
        </div>
      </div>
    );
  }

  if (invitado?.no_asiste) {
    return (
      <div className="app invitation-page">
        <header className="invitation-header">
          <Link to="/">Mitzi &amp; Raúl</Link>
        </header>
        <motion.section className="invitation-card" {...fadeUp}>
          <div className="no-asiste-msg">
            <span className="no-asiste-msg__icon">💛</span>
            <h2>Gracias por avisarnos, {invitado.nombre}</h2>
            <p>
              Lamentamos que no puedas acompañarnos, pero agradecemos mucho
              que nos lo hayas hecho saber. ¡Te deseamos lo mejor!
            </p>
          </div>
        </motion.section>
      </div>
    );
  }

  if (invitado?.confirmado && !invitado?.auto_confirmado) {
    return (
      <div className="app invitation-page">
        <header className="invitation-header">
          <Link to="/">Mitzi &amp; Raúl</Link>
        </header>
        <motion.section className="invitation-card" {...fadeUp}>
          <div className="ya-confirmado-msg">
            <span className="ya-confirmado-msg__icon">💍</span>
            <h2>¡Gracias, {invitado.nombre}!</h2>
            <p>
              Tu asistencia a nuestra boda ha sido confirmada. Es un honor
              tenerte con nosotros en este día tan especial.
            </p>
            <p className="ya-confirmado-msg__detalle">
              Asistirán:{" "}
              <strong>
                {invitado.num_confirmados}{" "}
                {invitado.num_confirmados !== 1 ? "personas" : "persona"}
              </strong>
              . ¡Con ansias de verte el{" "}
              <strong>21 de noviembre de 2026</strong>!
            </p>
          </div>
        </motion.section>
      </div>
    );
  }

  if (invitado?.auto_confirmado) {
    return (
      <div className="app invitation-page">
        <header className="invitation-header">
          <Link to="/">Mitzi &amp; Raúl</Link>
        </header>
        <motion.section className="invitation-card" {...fadeUp}>
          <div className="auto-confirmado-msg">
            <span className="auto-confirmado-msg__icon">🕊️</span>
            <h2>Hola, {invitado.nombre}</h2>
            <p>
              El plazo para confirmar asistencia ha concluido y tu lugar
              está pendiente de revisión por los novios.
            </p>
            <p className="auto-confirmado-msg__contacto">
              Si crees que hay un error o deseas aclarar tu asistencia,
              por favor contáctanos directamente. ¡Nos encantaría saber de ti! 💛
            </p>
          </div>
        </motion.section>
      </div>
    );
  }

  // ── Main Invitation ───────────────────────────────────────────
  return (
    <div className="app inv">

      {/* ── Música — esquina inferior derecha ── */}
      {AUDIO_SRC && <MusicEqualizer src={AUDIO_SRC} />}

      {/* ── Menú flotante de navegación ── */}
      <div className="inv-floating-nav">
        <button
          type="button"
          className={`inv-nav-toggle${menuOpen ? " inv-nav-toggle--open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú de secciones"}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          )}
        </button>
      </div>

      {/* ── Panel lateral de secciones ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="inv-nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className="inv-nav-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeInOut" }}
            >
              <div className="inv-nav-panel__header">
                <p className="inv-nav-panel__title">Secciones</p>
                <button
                  type="button"
                  className="inv-nav-panel__close"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Cerrar menú"
                >
                  ✕
                </button>
              </div>
              <ul className="inv-nav-panel__list">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className="inv-nav-panel__item"
                      onClick={() => scrollToSection(s.id)}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <div id="inv-portada"><InvCover /></div>

      <div id="inv-pases">
        <InvPasses
          invitado={invitado}
          respuesta={respuesta}
          setRespuesta={setRespuesta}
          numAsistentes={numAsistentes}
          setNumAsistentes={setNumAsistentes}
          confirmado={confirmado}
          confirmando={confirmando}
          onConfirmar={handleConfirmar}
          onRechazar={handleRechazar}
        />
      </div>

      <div id="inv-fecha"><InvDate /></div>
      <div id="inv-familias"><InvFamilies /></div>
      <div id="inv-padrinos"><InvSponsors /></div>
      <div id="inv-programa"><InvSchedule /></div>
      <div id="inv-iglesia">
        <InvVenues
          venueData={WEDDING.venues.church}
          typeLabel="⛪ Ceremonia religiosa"
          variant="gold"
        />
      </div>
      <div id="inv-salon">
        <InvVenues
          venueData={WEDDING.venues.venue}
          typeLabel="🥂 Recepción"
          variant="cream"
        />
      </div>
      <div id="inv-clima"><InvWeather /></div>
      <div id="inv-regalos"><InvRegistry /></div>
      <div id="inv-vestimenta"><InvDresscode /></div>
      <div id="inv-notas"><InvNotes /></div>
      <div id="inv-fotos"><InvEventPhotos /></div>
      <div id="inv-despedida"><InvFarewell /></div>
    </div>
  );
}
