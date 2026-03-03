import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getInvitado, confirmarAsistencia, marcarNoAsiste } from "../api/invitations";
import MusicEqualizer from "../components/MusicEqualizer";
import { AUDIO_SRC, fadeUp } from "../data/wedding";
import "../styles/Invitation.css";

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
import InvNotes     from "../components/invitation/InvNotes";
import InvFarewell  from "../components/invitation/InvFarewell";

export default function Invitation() {
  const { id } = useParams();
  const [invitado,      setInvitado]      = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [respuesta,     setRespuesta]     = useState(null); // null | 'si' | 'no'
  const [numAsistentes, setNumAsistentes] = useState(1);
  const [confirmando,   setConfirmando]   = useState(false);
  const [confirmado,    setConfirmado]    = useState(false);
  const [error,         setError]         = useState(null);

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
      {AUDIO_SRC && <MusicEqualizer src={AUDIO_SRC} />}

      <InvCover />

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

      <InvDate />
      <InvFamilies />
      <InvSponsors />
      <InvSchedule />
      <InvVenues />
      <InvWeather />
      <InvRegistry />
      <InvDresscode />
      <InvNotes />
      <InvFarewell />
    </div>
  );
}
