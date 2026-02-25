import { useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

const TOKEN_KEY = "boda_access";
const VALID_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function TokenGate({ children }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const tokenFromUrl = searchParams.get("t");
  const tokenFromSession = sessionStorage.getItem(TOKEN_KEY);

  useEffect(() => {
    if (tokenFromUrl && tokenFromUrl === VALID_TOKEN) {
      sessionStorage.setItem(TOKEN_KEY, tokenFromUrl);
      // Quitar ?t= pero mantener otros params y quedarse en la ruta actual
      const rest = new URLSearchParams(searchParams);
      rest.delete("t");
      const search = rest.toString() ? `?${rest.toString()}` : "";
      navigate(location.pathname + search, { replace: true });
    }
  }, [tokenFromUrl, navigate, searchParams, location.pathname]);

  const isAuthorized =
    (tokenFromUrl && tokenFromUrl === VALID_TOKEN) ||
    tokenFromSession === VALID_TOKEN;

  if (!isAuthorized) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <p style={{ color: "#555", fontFamily: "sans-serif" }}>Enlace no válido.</p>
      </div>
    );
  }

  return children;
}