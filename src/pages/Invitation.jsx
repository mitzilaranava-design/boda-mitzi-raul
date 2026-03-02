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
      setError("Invalid invitation");
      setLoading(false);
      return;
    }
    getInvitado(id)
      .then((data) => {
        setInvitado(data);
        if (data) setNumAsistentes(1);
        setError(!data ? "Invalid invitation" : null);
      })
      .catch(() => setError("Invalid invitation"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleConfirmar = async () => {
    if (!invitado) return;
    setConfirmando(true);
    try {
      await confirmarAsistencia(invitado.id, numAsistentes);
      setConfirmado(true);
    } catch {
      setError("Could not confirm. Please try again.");
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
      setError("Could not register. Please try again.");
    } finally {
      setConfirmando(false);
    }
  };

  // ── Guard states ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="app invitation-page">
        <div className="loading">Loading your invitation...</div>
      </div>
    );
  }

  if (error && !invitado) {
    return (
      <div className="app invitation-page">
        <div className="invitation-error">
          <p>This link is not valid.</p>
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
            <h2>Thank you for letting us know, {invitado.nombre}</h2>
            <p>
              We are sorry you cannot join us, but we truly appreciate you
              letting us know. Wishing you all the best!
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
            <h2>Thank you, {invitado.nombre}!</h2>
            <p>
              Your attendance at our wedding has been confirmed. It is an honor
              to have you with us on this special day.
            </p>
            <p className="ya-confirmado-msg__detalle">
              Attending:{" "}
              <strong>
                {invitado.num_confirmados} guest
                {invitado.num_confirmados !== 1 ? "s" : ""}
              </strong>
              . We look forward to seeing you on{" "}
              <strong>November 21, 2026</strong>!
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
            <h2>Hello, {invitado.nombre}</h2>
            <p>
              We are sorry, the RSVP deadline has passed and your spot is
              pending review by the bride and groom.
            </p>
            <p className="auto-confirmado-msg__contacto">
              If you believe this is an error or would like to clarify your
              attendance, please contact Mitzi and Raúl directly. We would love
              to hear from you. 💛
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
