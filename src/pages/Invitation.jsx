import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getInvitado, confirmarAsistencia } from "../api/invitations";

export default function Invitation() {
  const { id } = useParams();
  const [invitado, setInvitado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [numAsistentes, setNumAsistentes] = useState(1);
  const [confirmando, setConfirmando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getInvitado(id)
      .then((data) => {
        setInvitado(data);
        if (data) setNumAsistentes(1);
        setError(!data ? "Invitación no encontrada" : null);
      })
      .catch(() => setError("Error al cargar"))
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
          <h2>{error}</h2>
          <a href="/">Volver al inicio</a>
        </div>
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
            className="confirmado-msg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <span className="check">✓</span>
            <p>¡Gracias! Tu asistencia ha sido confirmada.</p>
            <small>Asistirán {numAsistentes} persona(s)</small>
          </motion.div>
        ) : (
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
        )}
      </motion.section>
    </div>
  );
}
