const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://frannuniezz96:franynico@cluster0.xntg5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        );
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.error('Error al conectar la base de datos:', error.message);
        process.exit(1); // Finaliza el proceso si hay un error en la conexión
    }
};

module.exports = connectDB;