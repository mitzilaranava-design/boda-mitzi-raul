import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getAllInvitados, marcarInvitacionEnviada, marcarRecordatorio, autoConfirmar, marcarSaveTheDate, marcarActualizacion } from "../api/invitations";
import { getGalleryConfig, toggleGallery, getItinerarioConfig, toggleItinerario } from "../api/gallery";

const ADMIN_KEY = "boda_admin";
const VALID_ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN;
const SITE_URL = import.meta.env.VITE_SITE_URL ?? "http://localhost:5173";
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN ?? "";
const INTERVAL_MS =
  Number(import.meta.env.VITE_REMINDER_INTERVAL_MINUTES ?? 10080) * 60 * 1000;

function puedeEnviar(inv) {
  if (inv.confirmado || inv.no_asiste) return false;
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
  const link = `${SITE_URL}/?t=${ACCESS_TOKEN}&id=${inv.id}`;
  const msg = `Hola ${inv.nombre} 💍 Mitzi y Raúl tienen el honor de anunciarte que se casan el 21 de noviembre de 2026. ¡Reserva la fecha! Más información aquí: ${link}`;
  return `https://wa.me/${celular}?text=${encodeURIComponent(msg)}`;
}

function buildActualizacionLink(inv, descripcion) {
  const celular = (inv.celular ?? "").replace(/[\s+\-()]/g, "");
  const link = `${SITE_URL}/inv/${inv.id}`;
  const msg = `Hola ${inv.nombre} 👋 Hay novedades en tu invitación de boda de Mitzi & Raúl.\n\n✨ ${descripcion}\n\nRevisa tu invitación aquí: ${link}`;
  return `https://wa.me/${celular}?text=${encodeURIComponent(msg)}`;
}

function buildWhatsAppLink(inv) {
  const celular = (inv.celular ?? "").replace(/[\s+\-()]/g, "");
  const link = `${SITE_URL}/intro/${inv.id}?t=${ACCESS_TOKEN}`;
  const esInvitacion = (inv.recordatorios_enviados ?? 0) === 0 && !inv.ultimo_recordatorio;
  const msg = esInvitacion
    ? `Hola ${inv.nombre} 💍 Mitzi y Raúl tienen el placer de invitarte a celebrar su boda. Esperamos contar con tu valiosa compañía en este día tan especial. Confirma tu asistencia aquí: ${link}`
    : `Hola ${inv.nombre}, Mitzi y Raúl te recuerdan que aún no has confirmado tu asistencia a su boda 💍 ¡Nos encantaría contarte! Confirma aquí: ${link}`;
  return `https://wa.me/${celular}?text=${encodeURIComponent(msg)}`;
}

function StatusPill({ inv }) {
  if (inv.auto_confirmado)
    return <span style={pill("#6b7280")}>Auto-confirmado</span>;
  if (inv.no_asiste)
    return <span style={pill("#9ca3af")}>No asiste</span>;
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

function CardInvitado({ inv, onRecordatorio, onAutoConfirmar, onSaveTheDate, onActualizacion, descripcionActualizacion }) {
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
    const esInvitacion = (inv.recordatorios_enviados ?? 0) === 0 && !inv.ultimo_recordatorio;
    try {
      if (esInvitacion) {
        await marcarInvitacionEnviada(inv.id);
      } else {
        await marcarRecordatorio(inv.id);
      }
      onRecordatorio(inv.id, esInvitacion);
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

  const handleActualizacion = async () => {
    if (!descripcionActualizacion.trim()) return;
    setLoading(true);
    window.open(buildActualizacionLink(inv, descripcionActualizacion), "_blank", "noopener");
    try {
      await marcarActualizacion(inv.id);
      onActualizacion(inv.id);
    } finally {
      setLoading(false);
    }
  };

  const puede = puedeEnviar(inv);
  const recordatorios = inv.recordatorios_enviados ?? 0;
  const necesitaAutoConfirmar = !inv.confirmado && recordatorios >= 3;
  const stdEnviado = inv.save_the_date_enviado ?? false;
  const habilitado = inv.enviar_save_the_date ?? false;
  const actualizacionEnviada = inv.actualizacion_enviada ?? false;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: "#fff",
        border: `1px solid ${habilitado ? "#e8dcc8" : "#e5e7eb"}`,
        borderRadius: 12,
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        opacity: habilitado ? 1 : 0.75,
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <StatusPill inv={inv} />
          {!habilitado && (
            <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#9ca3af", background: "#f3f4f6", borderRadius: 99, padding: "2px 8px" }}>
              Pendiente de activar
            </span>
          )}
        </div>
      </div>

      {/* Save the Date */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, borderTop: "1px solid #f2e8d5", paddingTop: 8 }}>
        <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 12, color: stdEnviado ? "#16a34a" : "#999" }}>
          Save the Date: {stdEnviado ? "Enviado ✓" : "Pendiente"}
          {stdEnviado && (
            <span style={{ color: inv.save_the_date_leido ? "#0ea5e9" : "#bbb", marginLeft: 6 }}>
              · Leído: {inv.save_the_date_leido ? "Sí ✓" : "No"}
            </span>
          )}
        </p>
        <button
          onClick={handleSaveTheDate}
          disabled={!habilitado || stdEnviado || loading}
          style={btnStyle(!habilitado || stdEnviado || loading, "#9d8558")}
        >
          {loading ? "..." : stdEnviado ? "Ya enviado" : "Enviar Save the Date"}
        </button>
      </div>

      {/* Enviar actualización */}
      {descripcionActualizacion.trim() && habilitado && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, borderTop: "1px solid #f2e8d5", paddingTop: 8 }}>
          <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 12, color: actualizacionEnviada ? "#16a34a" : "#999" }}>
            Actualización: {actualizacionEnviada ? "Enviada ✓" : "Pendiente"}
          </p>
          <button
            onClick={handleActualizacion}
            disabled={loading}
            style={btnStyle(loading, actualizacionEnviada ? "#6b7280" : "#9d8558")}
          >
            {loading ? "..." : actualizacionEnviada ? "Reenviar" : "Enviar actualización"}
          </button>
        </div>
      )}

      {/* Recordatorios / invitación */}
      {!inv.confirmado && !inv.no_asiste && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, borderTop: "1px solid #f2e8d5", paddingTop: 8 }}>
          <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#999" }}>
            Invitación/recordatorios: {recordatorios}/3 · {tiempoHastaProximo(inv)}
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {!necesitaAutoConfirmar && (
              <button
                onClick={handleRecordatorio}
                disabled={!habilitado || !puede || loading}
                style={btnStyle(!habilitado || !puede || loading, "#b49b6b")}
              >
                {loading ? "..." : recordatorios === 0 ? "Enviar invitación" : "Enviar recordatorio"}
              </button>
            )}
            {necesitaAutoConfirmar && (
              <button
                onClick={handleAutoConfirmar}
                disabled={!habilitado || loading}
                style={btnStyle(!habilitado || loading, "#6b7280")}
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
  const [pagina, setPagina] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [galeriaActiva, setGaleriaActiva] = useState(false);
  const [galeriaLoading, setGaleriaLoading] = useState(false);
  const [itinerarioActivo, setItinerarioActivo] = useState(false);
  const [itinerarioLoading, setItinerarioLoading] = useState(false);
  const [descripcionActualizacion, setDescripcionActualizacion] = useState("");

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
      setPagina(1);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authorized) cargar();
  }, [authorized, cargar]);

  useEffect(() => {
    if (!authorized) return;
    getGalleryConfig().then((cfg) => setGaleriaActiva(cfg.activa));
    getItinerarioConfig().then((cfg) => setItinerarioActivo(cfg.itinerario_activo ?? false));
  }, [authorized]);

  const handleToggleItinerario = async () => {
    setItinerarioLoading(true);
    try {
      await toggleItinerario(!itinerarioActivo);
      setItinerarioActivo((prev) => !prev);
    } finally {
      setItinerarioLoading(false);
    }
  };

  const handleToggleGaleria = async () => {
    setGaleriaLoading(true);
    try {
      await toggleGallery(!galeriaActiva);
      setGaleriaActiva((prev) => !prev);
    } finally {
      setGaleriaLoading(false);
    }
  };

  const handleRecordatorio = (id, esInvitacion) => {
    setInvitados((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              // La invitación no suma al conteo; solo los recordatorios cuentan
              recordatorios_enviados: esInvitacion
                ? (inv.recordatorios_enviados ?? 0)
                : (inv.recordatorios_enviados ?? 0) + 1,
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

  const handleActualizacion = (id) => {
    setInvitados((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, actualizacion_enviada: true } : inv
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

  const POR_PAGINA = 7;
  const query = busqueda.trim().toLowerCase();
  const filtrados = query
    ? invitados.filter(
        (i) =>
          i.nombre.toLowerCase().includes(query) ||
          (i.celular ?? "").includes(query)
      )
    : invitados;
  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA);
  const invitadosPagina = filtrados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  const total = invitados.length;
  const confirmados = invitados.filter((i) => i.confirmado && !i.auto_confirmado && !i.no_asiste).length;
  const noAsisten = invitados.filter((i) => i.no_asiste).length;
  const autoConfirmados = invitados.filter((i) => i.auto_confirmado).length;
  const pendientes = invitados.filter((i) => !i.confirmado && !i.no_asiste).length;
  const stdEnviados = invitados.filter((i) => i.save_the_date_enviado).length;
  const stdLeidos = invitados.filter((i) => i.save_the_date_leido).length;

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
            { label: "STD Enviados", value: stdEnviados, color: "#9d8558" },
            { label: "STD Leídos", value: stdLeidos, color: "#0ea5e9" },
            { label: "Confirmados", value: confirmados, color: "#16a34a" },
            { label: "No asisten", value: noAsisten, color: "#9ca3af" },
            { label: "Pendientes", value: pendientes, color: "#b49b6b" },
            { label: "Auto-conf.", value: autoConfirmados, color: "#6b7280" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: "#fff", border: "1px solid #e8dcc8", borderRadius: 10, padding: "12px 6px", textAlign: "center" }}>
              <p style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 22, color, fontWeight: 700 }}>{value}</p>
              <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 9, color: "#999", marginTop: 2 }}>{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Filtro de búsqueda */}
        <div style={{ margin: "20px 0 12px", position: "relative" }}>
          <input
            type="text"
            placeholder="Buscar por nombre o celular..."
            value={busqueda}
            onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px 40px 12px 16px",
              fontFamily: "Poppins, sans-serif",
              fontSize: 14,
              color: "#222",
              background: "#fff",
              border: "1px solid #e8dcc8",
              borderRadius: 10,
              outline: "none",
              minHeight: 44,
            }}
          />
          {busqueda && (
            <button
              onClick={() => { setBusqueda(""); setPagina(1); }}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#aaa",
                fontSize: 18,
                lineHeight: 1,
                padding: 4,
              }}
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>
        {busqueda && (
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#999", margin: "0 0 12px" }}>
            {filtrados.length} resultado{filtrados.length !== 1 ? "s" : ""} para &ldquo;{busqueda}&rdquo;
          </p>
        )}

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
            {invitadosPagina.map((inv) => (
              <CardInvitado
                key={inv.id}
                inv={inv}
                onRecordatorio={handleRecordatorio}
                onAutoConfirmar={handleAutoConfirmar}
                onSaveTheDate={handleSaveTheDate}
                onActualizacion={handleActualizacion}
                descripcionActualizacion={descripcionActualizacion}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Paginador */}
        {totalPaginas > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 20 }}>
            <button
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
              disabled={pagina === 1}
              style={btnStyle(pagina === 1, "#b49b6b")}
            >
              ← Anterior
            </button>
            <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#555" }}>
              {pagina} / {totalPaginas}
            </span>
            <button
              onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
              disabled={pagina === totalPaginas}
              style={btnStyle(pagina === totalPaginas, "#b49b6b")}
            >
              Siguiente →
            </button>
          </div>
        )}

        {/* Refresh */}
        {!loading && (
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button onClick={cargar} style={btnStyle(false, "#b49b6b")}>
              Actualizar lista
            </button>
          </div>
        )}

        {/* Galería */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            background: "#fff",
            border: "1px solid #e8dcc8",
            borderRadius: 12,
            padding: "20px 24px",
            marginTop: 28,
          }}
        >
          <p style={{ margin: "0 0 4px", fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#222", fontWeight: 600 }}>
            Galería de fotos
          </p>
          <p style={{ margin: "0 0 16px", fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#888" }}>
            Los invitados con el link pueden subir y ver fotos en tiempo real.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 13,
              color: galeriaActiva ? "#16a34a" : "#9ca3af",
              fontWeight: 500,
            }}>
              Estado: {galeriaActiva ? "Activa ✓" : "Desactivada"}
            </span>
            <button
              onClick={handleToggleGaleria}
              disabled={galeriaLoading}
              style={btnStyle(galeriaLoading, galeriaActiva ? "#6b7280" : "#b49b6b")}
            >
              {galeriaLoading ? "..." : galeriaActiva ? "Desactivar galería" : "Activar galería"}
            </button>
          </div>
        </motion.div>

        {/* Itinerario */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={{ background: "#fff", border: "1px solid #e8dcc8", borderRadius: 12, padding: "20px 24px", marginTop: 16 }}
        >
          <p style={{ margin: "0 0 4px", fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#222", fontWeight: 600 }}>
            Itinerario del evento
          </p>
          <p style={{ margin: "0 0 16px", fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#888" }}>
            Activa para mostrar el itinerario en la invitación. Desactivado muestra "próximamente".
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: itinerarioActivo ? "#16a34a" : "#9ca3af", fontWeight: 500 }}>
              Estado: {itinerarioActivo ? "Visible ✓" : "En construcción"}
            </span>
            <button
              onClick={handleToggleItinerario}
              disabled={itinerarioLoading}
              style={btnStyle(itinerarioLoading, itinerarioActivo ? "#6b7280" : "#b49b6b")}
            >
              {itinerarioLoading ? "..." : itinerarioActivo ? "Ocultar itinerario" : "Mostrar itinerario"}
            </button>
          </div>
        </motion.div>

        {/* Enviar actualizaciones */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ background: "#fff", border: "1px solid #e8dcc8", borderRadius: 12, padding: "20px 24px", marginTop: 16 }}
        >
          <p style={{ margin: "0 0 4px", fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#222", fontWeight: 600 }}>
            Enviar actualizaciones
          </p>
          <p style={{ margin: "0 0 12px", fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#888" }}>
            Escribe qué cambió y aparecerá el botón por invitado para enviar el aviso por WhatsApp.
          </p>
          <textarea
            value={descripcionActualizacion}
            onChange={(e) => setDescripcionActualizacion(e.target.value)}
            placeholder="Ej: Se agregó el itinerario del evento"
            maxLength={200}
            rows={3}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "10px 14px",
              fontFamily: "Poppins, sans-serif",
              fontSize: 13,
              color: "#222",
              background: "#fafafa",
              border: "1px solid #e8dcc8",
              borderRadius: 8,
              outline: "none",
              resize: "vertical",
            }}
          />
          {descripcionActualizacion.trim() && (
            <p style={{ margin: "8px 0 0", fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#b49b6b" }}>
              Los botones "Enviar actualización" aparecen en cada tarjeta de invitado activo.
            </p>
          )}
        </motion.div>

        <p style={{ textAlign: "center", fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#ccc", marginTop: 32 }}>
          Intervalo de recordatorio: {import.meta.env.VITE_REMINDER_INTERVAL_MINUTES ?? 10080} min
        </p>
      </div>
    </div>
  );
}
