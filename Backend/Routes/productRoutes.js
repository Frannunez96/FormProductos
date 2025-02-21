const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Producto = require('../models/producto');
const { getProducts, createProduct, deleteProduct, updateProduct } = require('../controllers/productoControllers'); 


router.get('/product', getProducts )
router.post('/product', createProduct)
router.delete('/product/:id', deleteProduct)
router.put('/product/:id', updateProduct)  

// 📌 Obtener productos con descuentos (`baje: true`)
router.get('/baje', async (req, res) => {
    try {
        const productosConDescuento = await Producto.find({ baje: true });
        res.status(200).json(productosConDescuento);
    } catch (error) {
        console.error('Error al obtener productos con descuento:', error);
        res.status(500).json({ error: "Hubo un error al obtener los datos" });
    }
});




module.exports = router;