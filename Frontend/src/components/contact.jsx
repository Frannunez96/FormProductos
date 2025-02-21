import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert("Formulario enviado!");
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Contacto</h1>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">¡Ponte en contacto con nosotros!</h4>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="correo">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="correo"
                    name="correo"
                    value={form.correo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea
                    className="form-control"
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    value={form.mensaje}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-4">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

