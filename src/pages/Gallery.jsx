import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getGalleryConfig, getFotos, subirFoto, subscribeFotos } from "../api/gallery";
import "../styles/Gallery.css";

export default function Gallery() {
  const [searchParams] = useSearchParams();
  const invitadoId = searchParams.get("inv") || null;

  const [config,      setConfig]      = useState({ activa: false });
  const [fotos,       setFotos]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [showUpload,  setShowUpload]  = useState(false);
  const [uploading,   setUploading]   = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [comentario,  setComentario]  = useState("");
  const [preview,     setPreview]     = useState(null);

  const fileRef    = useRef();
  const touchStart = useRef(null);
  const isSwipe    = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [cfg, imgs] = await Promise.all([getGalleryConfig(), getFotos()]);
      if (!cancelled) {
        setConfig(cfg);
        setFotos(imgs);
        setLoading(false);
      }
    }

    load();

    const unsub = subscribeFotos((nuevaFoto) => {
      setFotos((prev) => {
        if (prev.some((f) => f.url === nuevaFoto.url)) return prev;
        return [...prev, nuevaFoto];
      });
    });

    return () => {
      cancelled = true;
      unsub();
    };
  }, []);

  // ── Lightbox — navegación ──────────────────────────────────────
  const lightboxPrev = (e) => {
    e?.stopPropagation();
    setLightboxIdx((i) => (i > 0 ? i - 1 : fotos.length - 1));
  };

  const lightboxNext = (e) => {
    e?.stopPropagation();
    setLightboxIdx((i) => (i < fotos.length - 1 ? i + 1 : 0));
  };

  // Teclado: flechas + Escape
  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  setLightboxIdx((i) => (i > 0 ? i - 1 : fotos.length - 1));
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i < fotos.length - 1 ? i + 1 : 0));
      if (e.key === "Escape")     setLightboxIdx(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, fotos.length]);

  // Swipe horizontal en móvil
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
    isSwipe.current = false;
  };

  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      isSwipe.current = true;
      if (diff > 0) {
        setLightboxIdx((i) => (i < fotos.length - 1 ? i + 1 : 0));
      } else {
        setLightboxIdx((i) => (i > 0 ? i - 1 : fotos.length - 1));
      }
    }
    touchStart.current = null;
  };

  // ── Upload ─────────────────────────────────────────────────────
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    const file = fileRef.current?.files[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const result = await subirFoto(file, invitadoId, comentario);
      if (result.url) {
        setFotos((prev) => {
          const mockFoto = {
            id: `local-${Date.now()}`,
            url: result.url,
            nombre: null,
            comentario: comentario?.trim() || null,
            created_at: new Date().toISOString(),
          };
          return [...prev, mockFoto];
        });
      }
      if (preview) { URL.revokeObjectURL(preview); setPreview(null); }
      setShowUpload(false);
      setComentario("");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setUploadError(err.message ?? "Error al subir la foto");
    } finally {
      setUploading(false);
    }
  };

  const cerrarUpload = () => {
    if (uploading) return;
    if (preview) { URL.revokeObjectURL(preview); setPreview(null); }
    setShowUpload(false);
    setUploadError(null);
    setComentario("");
    if (fileRef.current) fileRef.current.value = "";
  };

  // ── Guard states ───────────────────────────────────────────────
  if (loading) {
    return <div className="gallery-loading">Cargando...</div>;
  }

  const fotoActual = lightboxIdx !== null ? fotos[lightboxIdx] : null;

  return (
    <div className="gallery-page">

      {/* ── Header ── */}
      <header className="gallery-header">
        {invitadoId && (
          <Link to={`/inv/${invitadoId}`} className="gallery-back-btn" aria-label="Regresar a la invitación">
            ‹ Regresar
          </Link>
        )}
        <p className="gallery-subtitle">Mitzi &amp; Raúl · 21.11.2026</p>
        <h1 className="gallery-title">Nuestra Boda</h1>
        <span className="gallery-header-ornament">✦ &nbsp; ✦ &nbsp; ✦</span>
      </header>

      {/* ── Contenido principal ── */}
      {!config.activa ? (
        <div className="gallery-disabled-msg">
          <span className="gallery-disabled-icon">📸</span>
          <p>La galería estará disponible durante el evento</p>
        </div>
      ) : (
        <>
          {fotos.length === 0 ? (
            <div className="gallery-empty">
              <span>📷</span>
              <p>Sin fotos aún. ¡Sé el primero en subir una!</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {fotos.map((foto, idx) => (
                <div
                  key={foto.id}
                  className="gallery-item"
                  onClick={() => setLightboxIdx(idx)}
                >
                  <img
                    src={foto.url}
                    alt={foto.nombre || "Foto de la boda"}
                    loading="lazy"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ pointerEvents: "none" }}
                  />
                  {/* overlay transparente: bloquea long-press "Guardar imagen" en iOS */}
                  <div className="gallery-item__shield" />
                  {foto.created_at && (
                    <span className="gallery-item__time">
                      {new Date(foto.created_at).toLocaleTimeString("es-MX", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          <button
            className="gallery-upload-btn"
            onClick={() => setShowUpload(true)}
            aria-label="Subir foto"
          >
            📷
          </button>
        </>
      )}

      {/* ── Lightbox ────────────────────────────────────────────── */}
      {fotoActual && (
        <div
          className="gallery-lightbox"
          onClick={() => { if (!isSwipe.current) setLightboxIdx(null); }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
        >
          <button
            className="lightbox-close"
            onClick={() => setLightboxIdx(null)}
            aria-label="Cerrar"
          >
            ✕
          </button>

          <div className="lightbox-counter">
            {lightboxIdx + 1} / {fotos.length}
          </div>

          {fotos.length > 1 && (
            <>
              <button className="lightbox-nav lightbox-prev" onClick={lightboxPrev} aria-label="Foto anterior">‹</button>
              <button className="lightbox-nav lightbox-next" onClick={lightboxNext} aria-label="Foto siguiente">›</button>
            </>
          )}

          <div className="lightbox-img-wrap">
            <img
              src={fotoActual.url}
              alt={fotoActual.nombre || "Foto de la boda"}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              style={{ pointerEvents: "none" }}
            />
            {/* overlay: impide long-press y evita cerrar el lightbox al tocar la foto */}
            <div
              className="lightbox-img-shield"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {fotoActual.comentario && (
            <div className="lightbox-footer" onClick={(e) => e.stopPropagation()}>
              <span className="lightbox-comentario">"{fotoActual.comentario}"</span>
            </div>
          )}
        </div>
      )}

      {/* ── Upload Modal ─────────────────────────────────────────── */}
      {showUpload && (
        <div
          className="gallery-upload-overlay"
          onClick={cerrarUpload}
          role="dialog"
          aria-modal="true"
          aria-label="Subir foto"
        >
          <div className="gallery-upload-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="upload-modal-title">Subir foto</h2>
            <span className="upload-modal-ornament">✦ &nbsp; ✦ &nbsp; ✦</span>

            {/* Input oculto — activado por la zona estilizada */}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
              disabled={uploading}
            />

            {/* Zona de selección o preview */}
            {!preview ? (
              <button
                type="button"
                className="upload-zone"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
              >
                <span className="upload-zone__icon">📷</span>
                <span className="upload-zone__text">Toca para seleccionar una foto</span>
              </button>
            ) : (
              <div className="upload-preview">
                <img src={preview} alt="Vista previa" draggable={false} />
                <button
                  type="button"
                  className="upload-preview__change"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                >
                  Cambiar foto
                </button>
              </div>
            )}

            <div className="upload-comentario-wrap">
              <label htmlFor="gallery-comentario" className="upload-comentario-label">
                💬 Agrega un comentario a tu foto (opcional)
              </label>
              <textarea
                id="gallery-comentario"
                className="upload-comentario"
                placeholder="Ej: ¡Qué bonita boda! Gracias por incluirnos..."
                maxLength={200}
                rows={3}
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                disabled={uploading}
              />
            </div>

            {uploadError && (
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "#e53e3e", margin: 0, textAlign: "center" }}>
                {uploadError}
              </p>
            )}

            <div className="upload-actions">
              <button
                className="upload-btn-primary"
                onClick={handleUpload}
                disabled={uploading || !preview}
              >
                {uploading ? "Subiendo..." : "Subir foto"}
              </button>
              <button
                className="upload-btn-cancel"
                onClick={cerrarUpload}
                disabled={uploading}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
