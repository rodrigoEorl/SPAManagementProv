import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Bienvenido a la Gestión de Proveedores</h1>
      <Link to="/proveedores">Ir a Proveedores</Link>
    </div>
  );
}

export default Home;
