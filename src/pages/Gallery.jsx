import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { getGalleryConfig, getFotos, subirFoto, subscribeFotos } from "../api/gallery";
import "../styles/Gallery.css";

export default function Gallery() {
  const [searchParams] = useSearchParams();
  // inv = ID del invitado cuando viene de /inv/:id → foto queda ligada al invitado
  // null cuando viene de QR externo (solo token) → foto anónima
  const invitadoId = searchParams.get("inv") || null;

  const [config, setConfig] = useState({ activa: false });
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileRef = useRef();

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
        // Evitar duplicados si ya llegó por el upload local
        if (prev.some((f) => f.id === nuevaFoto.id)) return prev;
        return [nuevaFoto, ...prev];
      });
    });

    return () => {
      cancelled = true;
      unsub();
    };
  }, []);

  // Navegación del lightbox
  const lightboxPrev = (e) => {
    e.stopPropagation();
    setLightboxIdx((i) => (i > 0 ? i - 1 : fotos.length - 1));
  };

  const lightboxNext = (e) => {
    e.stopPropagation();
    setLightboxIdx((i) => (i < fotos.length - 1 ? i + 1 : 0));
  };

  // Teclado: flechas + Escape
  useEffect(() => {
    if (lightboxIdx === null) return;

    const onKey = (e) => {
      if (e.key === "ArrowLeft") setLightboxIdx((i) => (i > 0 ? i - 1 : fotos.length - 1));
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i < fotos.length - 1 ? i + 1 : 0));
      if (e.key === "Escape") setLightboxIdx(null);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, fotos.length]);

  const handleUpload = async () => {
    const file = fileRef.current?.files[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const result = await subirFoto(file, invitadoId);
      // En modo mock, la foto se agrega al array MOCK_FOTOS pero no llega por realtime
      // Actualizamos local con el resultado para que aparezca inmediatamente
      if (result.url) {
        setFotos((prev) => {
          const mockFoto = {
            id: `local-${Date.now()}`,
            url: result.url,
            nombre: null,
            created_at: new Date().toISOString(),
          };
          return [mockFoto, ...prev];
        });
      }
      setShowUpload(false);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setUploadError(err.message ?? "Error al subir la foto");
    } finally {
      setUploading(false);
    }
  };

  const cerrarUpload = () => {
    if (uploading) return;
    setShowUpload(false);
    setUploadError(null);
  };

  if (loading) {
    return <div className="gallery-loading">Cargando...</div>;
  }

  const fotoActual = lightboxIdx !== null ? fotos[lightboxIdx] : null;

  return (
    <div className="gallery-page">
      {/* Header */}
      <header className="gallery-header">
        <p className="gallery-subtitle">Mitzi &amp; Raúl · 21.11.2026</p>
        <h1 className="gallery-title">Nuestra Galería</h1>
      </header>

      {/* Contenido principal */}
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
                  />
                </div>
              ))}
            </div>
          )}

          {/* Botón flotante de subida */}
          <button
            className="gallery-upload-btn"
            onClick={() => setShowUpload(true)}
            aria-label="Subir foto"
          >
            📷
          </button>
        </>
      )}

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {fotoActual && (
        <div
          className="gallery-lightbox"
          onClick={() => setLightboxIdx(null)}
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

          {fotos.length > 1 && (
            <>
              <button
                className="lightbox-nav lightbox-prev"
                onClick={lightboxPrev}
                aria-label="Foto anterior"
              >
                ‹
              </button>
              <button
                className="lightbox-nav lightbox-next"
                onClick={lightboxNext}
                aria-label="Foto siguiente"
              >
                ›
              </button>
            </>
          )}

          <img
            src={fotoActual.url}
            alt={fotoActual.nombre || "Foto de la boda"}
            onClick={(e) => e.stopPropagation()}
          />

          <div
            className="lightbox-footer"
            onClick={(e) => e.stopPropagation()}
          >
            {fotoActual.nombre && (
              <span className="lightbox-nombre">{fotoActual.nombre}</span>
            )}
            <a
              href={fotoActual.url}
              download
              className="btn-download"
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar
            </a>
          </div>
        </div>
      )}

      {/* ── Upload Modal ──────────────────────────────────────────────────── */}
      {showUpload && (
        <div
          className="gallery-upload-overlay"
          onClick={cerrarUpload}
          role="dialog"
          aria-modal="true"
          aria-label="Subir foto"
        >
          <div
            className="gallery-upload-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="upload-modal-title">Subir foto</h2>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="upload-input"
              disabled={uploading}
            />

            {uploadError && (
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                color: "#e53e3e",
                margin: 0,
                textAlign: "center",
              }}>
                {uploadError}
              </p>
            )}

            <div className="upload-actions">
              <button
                className="upload-btn-primary"
                onClick={handleUpload}
                disabled={uploading}
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
