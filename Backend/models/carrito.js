const mongoose = require('mongoose');
const Producto = require('./producto');

const CarritoSchema = new mongoose.Schema({
    productos: [
        {
            productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            cantidad: { type: Number, required: true, default: 1 }
        }
    ],
    precioTotal: { type: Number, default: 1 },
    
});


const Carrito = mongoose.model("Carrito", CarritoSchema);

module.exports = Carrito
