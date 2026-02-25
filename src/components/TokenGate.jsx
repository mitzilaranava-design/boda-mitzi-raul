import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const TOKEN_KEY = "boda_access";
const VALID_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function TokenGate({ children }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tokenFromUrl = searchParams.get("t");
  const tokenFromSession = sessionStorage.getItem(TOKEN_KEY);

  useEffect(() => {
    if (tokenFromUrl && tokenFromUrl === VALID_TOKEN) {
      sessionStorage.setItem(TOKEN_KEY, tokenFromUrl);
      // Conservar params extra (ej: ?id=UUID) para que la página los pueda leer
      const rest = new URLSearchParams(searchParams);
      rest.delete("t");
      const redirect = rest.toString() ? `/?${rest.toString()}` : "/";
      navigate(redirect, { replace: true });
    }
  }, [tokenFromUrl, navigate, searchParams]);

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