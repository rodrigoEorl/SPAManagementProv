import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Proveedores from "./pages/Proveedores";
import DetalleProveedor from "./pages/DetalleProveedor";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/proveedores" element={<Proveedores />} />
      <Route path="/proveedores/:id" element={<DetalleProveedor />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
