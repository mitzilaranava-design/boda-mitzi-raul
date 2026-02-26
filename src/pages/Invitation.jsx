import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getInvitado, confirmarAsistencia, marcarNoAsiste } from "../api/invitations";

export default function Invitation() {
  const { id } = useParams();
  const [invitado, setInvitado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [respuesta, setRespuesta] = useState(null); // null | 'si' | 'no'
  const [numAsistentes, setNumAsistentes] = useState(1);
  const [confirmando, setConfirmando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="app invitation-page">
        <div className="loading">Cargando invitación...</div>
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
          <Link to="/">Mitzi & Raúl</Link>
        </header>
        <motion.section
          className="invitation-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="no-asiste-msg">
            <span className="no-asiste-msg__icon">💛</span>
            <h2>Gracias por avisarnos, {invitado.nombre}</h2>
            <p>
              Lamentamos que no puedas acompañarnos, pero agradecemos que nos lo hayas
              hecho saber. ¡Te deseamos lo mejor!
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
          <Link to="/">Mitzi & Raúl</Link>
        </header>
        <motion.section
          className="invitation-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="ya-confirmado-msg">
            <span className="ya-confirmado-msg__icon">💍</span>
            <h2>¡Gracias, {invitado.nombre}!</h2>
            <p>
              Tu asistencia a nuestra boda ha sido confirmada.
              Es un honor contar con tu presencia en este día tan especial.
            </p>
            <p className="ya-confirmado-msg__detalle">
              Asistirán <strong>{invitado.num_confirmados} persona{invitado.num_confirmados !== 1 ? "s" : ""}</strong>.
              ¡Con mucho gusto los esperamos el <strong>21 de noviembre de 2026</strong>!
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
          <Link to="/">Mitzi & Raúl</Link>
        </header>
        <motion.section
          className="invitation-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="auto-confirmado-msg">
            <span className="auto-confirmado-msg__icon">🕊️</span>
            <h2>Hola, {invitado.nombre}</h2>
            <p>
              Lo sentimos mucho. El plazo para confirmar tu asistencia ha concluido
              y tu lugar se encuentra pendiente de revisión por parte de los novios.
            </p>
            <p className="auto-confirmado-msg__contacto">
              Si crees que hubo un error o deseas aclarar tu situación, por favor
              comunícate directamente con Mitzi y Raúl. Será un gusto atenderte. 💛
            </p>
          </div>
        </motion.section>
      </div>
    );
  }

  return (
    <div className="app invitation-page">
      <header className="invitation-header">
        <Link to="/">Mitzi & Raúl</Link>
      </header>

      <motion.section
        className="invitation-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>¡Hola, {invitado?.nombre}!</h2>
        <p>
          Estás invitado(a) a la boda de Mitzi y Raúl.
          <br />
          Cupo asignado: <strong>{invitado?.num_invitados} personas</strong>
        </p>

        {confirmado ? (
          <motion.div
            className={respuesta === 'no' ? "no-asiste-msg" : "confirmado-msg"}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {respuesta === 'no' ? (
              <>
                <span className="no-asiste-msg__icon">💛</span>
                <p>Gracias por avisarnos. Hemos registrado que no podrás acompañarnos.</p>
              </>
            ) : (
              <>
                <span className="check">✓</span>
                <p>¡Gracias! Tu asistencia ha sido confirmada.</p>
                <small>Asistirán {numAsistentes} persona(s)</small>
              </>
            )}
          </motion.div>
        ) : respuesta === null ? (
          <div className="asistencia-pregunta">
            <p className="asistencia-pregunta__texto">¿Podrás acompañarnos?</p>
            <div className="asistencia-btns">
              <motion.button
                className="btn btn-si"
                onClick={() => setRespuesta('si')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Sí, estaré
              </motion.button>
              <motion.button
                className="btn btn-no"
                onClick={() => setRespuesta('no')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                No podré asistir
              </motion.button>
            </div>
          </div>
        ) : respuesta === 'si' ? (
          <div className="confirm-form">
            <label>¿Cuántas personas asistirán?</label>
            <select
              value={numAsistentes}
              onChange={(e) => setNumAsistentes(Number(e.target.value))}
            >
              {Array.from({ length: invitado?.num_invitados || 1 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} {i === 0 ? "persona" : "personas"}
                </option>
              ))}
            </select>
            <motion.button
              className="btn btn-confirmar"
              onClick={handleConfirmar}
              disabled={confirmando}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {confirmando ? "Confirmando..." : "Confirmar asistencia"}
            </motion.button>
          </div>
        ) : (
          <div className="confirm-form">
            <p className="no-asiste-aviso">Lamentamos que no puedas acompañarnos.</p>
            <motion.button
              className="btn btn-no-asiste"
              onClick={handleRechazar}
              disabled={confirmando}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {confirmando ? "Registrando..." : "Confirmar que no podré asistir"}
            </motion.button>
          </div>
        )}
      </motion.section>
    </div>
  );
}
