import { BrowserRouter, Routes, Route } from "react-router-dom";
import SaveTheDate from "./pages/SaveTheDate";
import Invitation from "./pages/Invitation";
import "./styles/variables.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SaveTheDate />} />
        <Route path="/inv/:id" element={<Invitation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
