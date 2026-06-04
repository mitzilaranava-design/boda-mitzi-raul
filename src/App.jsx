import { BrowserRouter, Routes, Route } from "react-router-dom";
import SaveTheDate from "./pages/SaveTheDate";
import Invitation from "./pages/Invitation";
import Admin from "./pages/Admin";
import Gallery from "./pages/Gallery";
import TokenGate from "./components/TokenGate";
import GalleryTokenGate from "./components/GalleryTokenGate";
import Intro from "./pages/Intro";
import "./styles/variables.css";
import "./App.css";

function NotFound() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <p style={{ color: "#555", fontFamily: "sans-serif" }}>Página no encontrada.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inv/:id" element={<TokenGate><Invitation /></TokenGate>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<TokenGate><SaveTheDate /></TokenGate>} />
        <Route path="/intro/:id" element={<TokenGate><Intro /></TokenGate>} />
        <Route path="/galeria" element={<GalleryTokenGate><Gallery /></GalleryTokenGate>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
