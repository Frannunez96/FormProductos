const Producto = require('../models/producto');

// Función para obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

// Crear producto
const createProduct = async (req, res) => {
    const { nombre, descripcion, precio, stock, baje } = req.body;
    const nuevoProducto = new Producto({ nombre, descripcion, precio, stock, baje });
    try {
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};


// Eliminar un producto por su ID
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID desde los parámetros de la URL

        // Validar si el ID proporcionado es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID de producto no válido" });
        }

        // Buscar y eliminar el producto por ID
        const productoEliminado = await Producto.findByIdAndDelete(id);

        // Si no se encuentra el producto
        if (!productoEliminado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Si el producto fue eliminado correctamente
        res.json({ message: "Producto eliminado exitosamente", producto: productoEliminado });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error });
    }
};


// Actualizar un producto
const updateProduct = async (req, res) => {
    try {
        // Verifica si el ID del producto es válido antes de intentar actualizarlo
        const updatedProduct = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto actualizado', updatedProduct });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};


module.exports = { getProducts, createProduct, deleteProduct, updateProduct };