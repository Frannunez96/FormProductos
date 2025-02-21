const Carrito = require("../models/carrito");
const Producto = require("../models/producto");

// Agregar un producto al carrito
const agregarAlCarrito = async (req, res) => {
    try {
        const { productoId, cantidad } = req.body;

        // Verificar si el producto existe
        const producto = await Producto.findById(productoId);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Buscar el carrito (por ahora asumimos un único carrito)
        let carrito = await Carrito.findOne();
        if (!carrito) {
            carrito = new Carrito({ productos: [], precioTotal: 0 });
        }

        // Verificar si el producto ya está en el carrito
        const itemIndex = carrito.productos.findIndex(p => p.productoId.equals(productoId));

        if (itemIndex > -1) {
            // Si ya existe, actualizar la cantidad
            carrito.productos[itemIndex].cantidad += cantidad;
        } else {
            // Si no existe, agregarlo
            carrito.productos.push({ productoId, cantidad });
        }

        // Recalcular el precio total
        carrito.precioTotal = await calcularPrecioTotal(carrito);

        await carrito.save();
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ message: "Error al agregar al carrito", error });
    }
};

const obtenerCarrito = async (req, res) => {
    try {
      // Obtén el carrito, poblado con los detalles de los productos
      const carrito = await Carrito.find()
        .populate('productos.productoId')  // Poblar los datos de producto relacionados
        .exec(); // Asegúrate de ejecutar la consulta
  
      // Si no hay carrito, responde con un mensaje
      if (!carrito || carrito.length === 0) {
        return res.status(404).json({ message: 'Carrito vacío o no encontrado' });
      }
  
      // Devuelve el carrito con los productos y su precio
      res.json(carrito);
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
  };

  
// Función para calcular el precio total
const calcularPrecioTotal = async (carrito) => {
    let total = 0;
    for (let item of carrito.productos) {
        const producto = await Producto.findById(item.productoId);
        total += producto.precio * item.cantidad;
    }
    return total;
};

// eliminar producto del carrito
const eliminarProductoDelCarrito = async (req, res) => {
    const { productoId } = req.params;
    try {
        const carrito = await Carrito.findOneAndUpdate(
            {},
            { $pull: { productos: { productoId } } }, // Elimina el producto del array
            { new: true } // Retorna el carrito actualizado
        ).populate("productos.productoId");

        if (!carrito) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        // Filtrar el producto a eliminar
        carrito.productos = carrito.productos.filter(item => item.productoId.toString() !== productoId);

        // Recalcular el precio total
        carrito.precioTotal = carrito.productos.reduce((total, item) => total + item.productoId.precio * item.cantidad, 0);

        await productoAEliminar.save();
        res.json({ message: "Producto eliminado", carrito });
    } catch (error) {
        console.error("Error al eliminar producto del carrito:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


module.exports = { agregarAlCarrito, obtenerCarrito , eliminarProductoDelCarrito};


