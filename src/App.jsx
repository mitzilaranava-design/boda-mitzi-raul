import { BrowserRouter, Routes, Route } from "react-router-dom";
import SaveTheDate from "./pages/SaveTheDate";
import Invitation from "./pages/Invitation";
import Admin from "./pages/Admin";
import TokenGate from "./components/TokenGate";
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
        <Route path="/" element={<TokenGate><SaveTheDate /></TokenGate>} />
        <Route path="/inv/:id" element={<Invitation />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
