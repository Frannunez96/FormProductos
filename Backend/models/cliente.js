const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String },
  direccion: { type: String },
  fechaRegistro: { type: Date, default: Date.now },
});

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente;
