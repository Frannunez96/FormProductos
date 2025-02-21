import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de importar Bootstrap
import CarritoModal from "./carritoModal";

const Navbar = () => {
  return (
    <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div id="navbar" className="container">

        <NavLink className="navbar-brand" to="/">
          MiTienda
        </NavLink>


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                Tienda
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                Acerca de
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contacto
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productos">
                Productos
              </NavLink>
            </li>
              <CarritoModal />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

