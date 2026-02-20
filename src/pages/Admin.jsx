import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getAllInvitados, marcarRecordatorio, autoConfirmar, marcarSaveTheDate } from "../api/invitations";

const ADMIN_KEY = "boda_admin";
const VALID_ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN;
const SITE_URL = import.meta.env.VITE_SITE_URL ?? "http://localhost:5173";
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN ?? "";
const INTERVAL_MS =
  Number(import.meta.env.VITE_REMINDER_INTERVAL_MINUTES ?? 10080) * 60 * 1000;

function puedeEnviar(inv) {
  if (inv.confirmado) return false;
  if ((inv.recordatorios_enviados ?? 0) >= 3) return false;
  if (!inv.ultimo_recordatorio) return true;
  return Date.now() - new Date(inv.ultimo_recordatorio).getTime() >= INTERVAL_MS;
}

function tiempoHastaProximo(inv) {
  if (!inv.ultimo_recordatorio || puedeEnviar(inv)) return "Disponible ahora";
  const ms = INTERVAL_MS - (Date.now() - new Date(inv.ultimo_recordatorio).getTime());
  const mins = Math.ceil(ms / 60000);
  if (mins < 60) return `Disponible en ${mins} min`;
  const hrs = Math.ceil(mins / 60);
  if (hrs < 24) return `Disponible en ${hrs} h`;
  const days = Math.ceil(hrs / 24);
  return `Disponible en ${days} día${days !== 1 ? "s" : ""}`;
}

function buildSaveTheDateLink(inv) {
  const celular = (inv.celular ?? "").replace(/[\s+\-()]/g, "");
  const link = `${SITE_URL}/?t=${ACCESS_TOKEN}`;
  const msg = `Hola ${inv.nombre} 💍 Mitzi y Raúl tienen el honor de anunciarte que se casan el 21 de noviembre de 2026. ¡Reserva la fecha! Más información aquí: ${link}`;
  return `https://wa.me/${celular}?text=${encodeURIComponent(msg)}`;
}

function buildWhatsAppLink(inv) {
  const celular = (inv.celular ?? "").replace(/[\s+\-()]/g, "");
  const link = `${SITE_URL}/inv/${inv.id}`;
  const esInvitacion = (inv.recordatorios_enviados ?? 0) === 0;
  const msg = esInvitacion
    ? `Hola ${inv.nombre} 💍 Mitzi y Raúl tienen el placer de invitarte a celebrar su boda. Esperamos contar con tu valiosa compañía en este día tan especial. Confirma tu asistencia aquí: ${link}`
    : `Hola ${inv.nombre}, Mitzi y Raúl te recuerdan que aún no has confirmado tu asistencia a su boda 💍 ¡Nos encantaría contarte! Confirma aquí: ${link}`;
  return `https://wa.me/${celular}?text=${encodeURIComponent(msg)}`;
}

function StatusPill({ inv }) {
  if (inv.auto_confirmado)
    return <span style={pill("#6b7280")}>Auto-confirmado</span>;
  if (inv.confirmado)
    return <span style={pill("#16a34a")}>Confirmado ✓</span>;
  return <span style={pill("#b49b6b")}>Pendiente</span>;
}

function pill(bg) {
  return {
    background: bg,
    color: "#fff",
    padding: "2px 10px",
    borderRadius: 99,
    fontSize: 12,
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    whiteSpace: "nowrap",
  };
}

function CardInvitado({ inv, onRecordatorio, onAutoConfirmar, onSaveTheDate }) {
  const [loading, setLoading] = useState(false);

  const handleSaveTheDate = async () => {
    setLoading(true);
    window.open(buildSaveTheDateLink(inv), "_blank", "noopener");
    try {
      await marcarSaveTheDate(inv.id);
      onSaveTheDate(inv.id);
    } finally {
      setLoading(false);
    }
  };

  const handleRecordatorio = async () => {
    setLoading(true);
    window.open(buildWhatsAppLink(inv), "_blank", "noopener");
    try {
      await marcarRecordatorio(inv.id);
      onRecordatorio(inv.id);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoConfirmar = async () => {
    setLoading(true);
    try {
      await autoConfirmar(inv.id);
      onAutoConfirmar(inv.id);
    } finally {
      setLoading(false);
    }
  };

  const puede = puedeEnviar(inv);
  const recordatorios = inv.recordatorios_enviados ?? 0;
  const necesitaAutoConfirmar = !inv.confirmado && recordatorios >= 3;
  const stdEnviado = inv.save_the_date_enviado ?? false;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: "#fff",
        border: "1px solid #e8dcc8",
        borderRadius: 12,
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {/* Nombre + estado */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
        <div>
          <p style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#222", fontWeight: 600 }}>
            {inv.nombre}
          </p>
          <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#888", marginTop: 2 }}>
            {inv.celular ?? "Sin celular"} · Cupo: {inv.num_invitados}
            {inv.confirmado && ` · Confirman: ${inv.num_confirmados}`}
          </p>
        </div>
        <StatusPill inv={inv} />
      </div>

      {/* Save the Date */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, borderTop: "1px solid #f2e8d5", paddingTop: 8 }}>
        <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 12, color: stdEnviado ? "#16a34a" : "#999" }}>
          Save the Date: {stdEnviado ? "Enviado ✓" : "Pendiente"}
        </p>
        <button
          onClick={handleSaveTheDate}
          disabled={stdEnviado || loading}
          style={btnStyle(stdEnviado || loading, "#9d8558")}
        >
          {loading ? "..." : stdEnviado ? "Ya enviado" : "Enviar Save the Date"}
        </button>
      </div>

      {/* Recordatorios / invitación */}
      {!inv.confirmado && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, borderTop: "1px solid #f2e8d5", paddingTop: 8 }}>
          <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#999" }}>
            Invitación/recordatorios: {recordatorios}/3 · {tiempoHastaProximo(inv)}
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {!necesitaAutoConfirmar && (
              <button
                onClick={handleRecordatorio}
                disabled={!puede || loading}
                style={btnStyle(!puede || loading, "#b49b6b")}
              >
                {loading ? "..." : recordatorios === 0 ? "Enviar invitación" : "Enviar recordatorio"}
              </button>
            )}
            {necesitaAutoConfirmar && (
              <button
                onClick={handleAutoConfirmar}
                disabled={loading}
                style={btnStyle(loading, "#6b7280")}
              >
                {loading ? "..." : "Auto-confirmar"}
              </button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function btnStyle(disabled, color) {
  return {
    background: disabled ? "#e5e7eb" : color,
    color: disabled ? "#9ca3af" : "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 16px",
    minHeight: 44,
    fontFamily: "Poppins, sans-serif",
    fontSize: 13,
    fontWeight: 500,
    cursor: disabled ? "default" : "pointer",
    transition: "background 0.2s",
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

export default function Admin() {
  const [searchParams] = useSearchParams();
  const [authorized, setAuthorized] = useState(false);
  const [invitados, setInvitados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tokenUrl = searchParams.get("t");
    const tokenSession = sessionStorage.getItem(ADMIN_KEY);
    if (tokenUrl === VALID_ADMIN_TOKEN) {
      sessionStorage.setItem(ADMIN_KEY, tokenUrl);
      setAuthorized(true);
    } else if (tokenSession === VALID_ADMIN_TOKEN) {
      setAuthorized(true);
    }
  }, [searchParams]);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllInvitados();
      setInvitados(data ?? []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authorized) cargar();
  }, [authorized, cargar]);

  const handleRecordatorio = (id) => {
    setInvitados((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              recordatorios_enviados: (inv.recordatorios_enviados ?? 0) + 1,
              ultimo_recordatorio: new Date().toISOString(),
            }
          : inv
      )
    );
  };

  const handleAutoConfirmar = (id) => {
    setInvitados((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? { ...inv, confirmado: true, auto_confirmado: true, num_confirmados: inv.num_invitados }
          : inv
      )
    );
  };

  const handleSaveTheDate = (id) => {
    setInvitados((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, save_the_date_enviado: true } : inv
      )
    );
  };

  if (!authorized) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <p style={{ color: "#555", fontFamily: "Poppins, sans-serif" }}>Acceso no autorizado.</p>
      </div>
    );
  }

  const total = invitados.length;
  const confirmados = invitados.filter((i) => i.confirmado && !i.auto_confirmado).length;
  const autoConfirmados = invitados.filter((i) => i.auto_confirmado).length;
  const pendientes = invitados.filter((i) => !i.confirmado).length;
  const stdEnviados = invitados.filter((i) => i.save_the_date_enviado).length;

  return (
    <div style={{ minHeight: "100vh", background: "#f9f5ef", padding: "32px 16px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: 32 }}
        >
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, letterSpacing: 3, color: "#b49b6b", textTransform: "uppercase", margin: 0 }}>
            Panel de administración
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#222", margin: "6px 0 0" }}>
            Mitzi &amp; Raúl
          </h1>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="admin-stats"
        >
          {[
            { label: "Total", value: total, color: "#222" },
            { label: "Save the Date", value: stdEnviados, color: "#9d8558" },
            { label: "Confirmados", value: confirmados, color: "#16a34a" },
            { label: "Pendientes", value: pendientes, color: "#b49b6b" },
            { label: "Auto-conf.", value: autoConfirmados, color: "#6b7280" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: "#fff", border: "1px solid #e8dcc8", borderRadius: 10, padding: "12px 6px", textAlign: "center" }}>
              <p style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 22, color, fontWeight: 700 }}>{value}</p>
              <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 9, color: "#999", marginTop: 2 }}>{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Lista */}
        {loading && (
          <p style={{ textAlign: "center", fontFamily: "Poppins, sans-serif", color: "#aaa", fontSize: 14 }}>
            Cargando...
          </p>
        )}
        {error && (
          <p style={{ textAlign: "center", fontFamily: "Poppins, sans-serif", color: "#e53e3e", fontSize: 14 }}>
            Error: {error}
          </p>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <AnimatePresence>
            {invitados.map((inv) => (
              <CardInvitado
                key={inv.id}
                inv={inv}
                onRecordatorio={handleRecordatorio}
                onAutoConfirmar={handleAutoConfirmar}
                onSaveTheDate={handleSaveTheDate}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Refresh */}
        {!loading && (
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button onClick={cargar} style={btnStyle(false, "#b49b6b")}>
              Actualizar lista
            </button>
          </div>
        )}

        <p style={{ textAlign: "center", fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#ccc", marginTop: 32 }}>
          Intervalo de recordatorio: {import.meta.env.VITE_REMINDER_INTERVAL_MINUTES ?? 10080} min
        </p>
      </div>
    </div>
  );
}
