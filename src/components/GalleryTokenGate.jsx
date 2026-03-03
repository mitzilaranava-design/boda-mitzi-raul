import { useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

// Token de la invitación — acceso si el invitado ya lo validó en /inv/:id
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const ACCESS_KEY = "boda_access";

// Token propio de la galería — para links de QR externos independientes
const GALLERY_TOKEN = import.meta.env.VITE_GALLERY_TOKEN;
const GALLERY_KEY = "boda_gallery";

/**
 * Protege /galeria aceptando dos vías de acceso:
 *  1. El invitado ya tiene sesión de invitación (boda_access) → entra directo.
 *  2. Link de QR externo con ?t=VITE_GALLERY_TOKEN → valida y guarda en boda_gallery.
 */
export default function GalleryTokenGate({ children }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const tokenFromUrl = searchParams.get("t");

  const hasInvitationSession = sessionStorage.getItem(ACCESS_KEY) === ACCESS_TOKEN;
  const hasGallerySession = GALLERY_TOKEN && sessionStorage.getItem(GALLERY_KEY) === GALLERY_TOKEN;
  const galleryTokenInUrl = GALLERY_TOKEN && tokenFromUrl === GALLERY_TOKEN;

  useEffect(() => {
    if (galleryTokenInUrl) {
      sessionStorage.setItem(GALLERY_KEY, tokenFromUrl);
      const rest = new URLSearchParams(searchParams);
      rest.delete("t");
      const search = rest.toString() ? `?${rest.toString()}` : "";
      navigate(location.pathname + search, { replace: true });
    }
  }, [galleryTokenInUrl, tokenFromUrl, navigate, searchParams, location.pathname]);

  const isAuthorized = hasInvitationSession || hasGallerySession || galleryTokenInUrl;

  if (!isAuthorized) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <p style={{ color: "#555", fontFamily: "sans-serif" }}>Enlace no válido.</p>
      </div>
    );
  }

  return children;
}
