import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Proveedores from "./pages/Proveedores";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proveedores" element={<Proveedores />} />
      </Routes>
    </Router>
  );
}

export default App;
