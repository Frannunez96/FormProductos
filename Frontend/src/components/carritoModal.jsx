import { useEffect, useState } from "react";
import axios from "axios";

const CarritoModal = () => {
  const [carrito, setCarrito] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Obtener el carrito
  useEffect(() => {
    const obtenerCarrito = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/carrito");
        setCarrito(response.data);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    };

    obtenerCarrito();
  }, []);

  // Eliminar un producto del carrito
  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/carrito/${id}`);
      setCarrito((prevCarrito) => ({
        ...prevCarrito,
        productos: prevCarrito.productos.filter((producto) => producto.productoId._id !== id)
      }));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div>
      {/* Botón para abrir el modal */}
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Ver Carrito
      </button>

      {/* Modal */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
        aria-labelledby="carritoModalLabel"
        aria-hidden={!showModal}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="carritoModalLabel">
                Carrito de Compras
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {carrito.productos && carrito.productos.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Subtotal</th>
                        <th>En oferta</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carrito.productos.map((producto) => {
                        const cantidad = producto.cantidad || 1;
                        const precio = producto.productoId.precio || 0;
                        const subtotal = precio * cantidad;

                        return (
                          <tr key={producto.productoId._id}>
                            <td>{producto.productoId.nombre}</td>
                            <td>{cantidad}</td>
                            <td>${precio}</td>
                            <td>${subtotal}</td>
                            <td>
                              {producto.productoId.baje ? (
                                <span className="badge badge-warning">¡Oferta!</span>
                              ) : (
                                "No"
                              )}
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => eliminarProducto(producto.productoId._id)}
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-warning text-center">
                  <p>No hay productos en tu carrito.</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </button>
              <button type="button" className="btn btn-primary">
                Ir a Pagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoModal;

