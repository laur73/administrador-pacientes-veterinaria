import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';

//funcionalidad para el servidor
const app = express();

//para decirle a express como leer los request
app.use(express.json())

//Para leer las variables de entorno
dotenv.config()

conectarDB()

//manera en que express maneja el routing
app.use('/api/veterinarios', veterinarioRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Servidor funcionando en el puerto ${PORT}`)
})