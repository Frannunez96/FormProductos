import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Importar Bootstrap

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    stock: "",
    baje: false,
  });
  const [editando, setEditando] = useState(false);
  const [productoId, setProductoId] = useState(null);

  // Obtener productos del backend
  const fetchProductos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/product");
      setProductos(res.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Enviar formulario (Agregar o Editar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await axios.put(`http://localhost:3000/api/product/${productoId}`, form);
        setEditando(false);
        setProductoId(null);
      } else {
        await axios.post("http://localhost:3000/api/product", form);
      }
      setForm({ nombre: "", precio: "", descripcion: "", stock: "", baje: false });
      fetchProductos();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  // Cargar producto en el formulario para editar
  const handleEdit = (producto) => {
    setForm({
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      stock: producto.stock,
      baje: producto.baje,
    });
    setEditando(true);
    setProductoId(producto._id);
  };

  // Eliminar producto con confirmación
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await axios.delete(`http://localhost:3000/api/product/${id}`);
        fetchProductos();
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{editando ? "Editar Producto" : "Agregar Producto"}</h1>

      <div className="card p-4 shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Nombre del Producto</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: Teclado mecánico RGB"
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Precio ($)</label>
              <input
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                className="form-control"
                placeholder="Ej: 59.99"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Stock</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="form-control"
                placeholder="Ej: 100"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: Teclado mecánico con luces RGB y switches intercambiables"
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="baje"
              checked={form.baje}
              onChange={handleChange}
              className="form-check-input"
              id="bajeCheck"
            />
            <label className="form-check-label fw-bold" htmlFor="bajeCheck">
              Producto bajado
            </label>
          </div>

          <button type="submit" className={`btn ${editando ? "btn-warning" : "btn-primary"} w-100`}>
            {editando ? "Actualizar Producto" : "Agregar Producto"}
          </button>
        </form>
      </div>

      <h2 className="text-center mt-5">Lista de Productos</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio ($)</th>
            <th>Stock</th>
            <th>Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto._id}>
              <td>{producto.nombre}</td>
              <td>${producto.precio}</td>
              <td>{producto.stock}</td>
              <td className={producto.baje ? "text-danger fw-bold" : "text-success fw-bold"}>
                {producto.baje ? "No" : "Sí"}
              </td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(producto)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(producto._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

