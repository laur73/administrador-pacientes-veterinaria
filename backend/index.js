import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

//funcionalidad para el servidor
const app = express();

//para decirle a express como leer los request
app.use(express.json());

//Para leer las variables de entorno
dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL]

const corsOptions = {
	origin: function (origin, callback) {
		if (dominiosPermitidos.indexOf(origin) !== -1) {
			//El origen del request está permitido
			callback(null, true)
		} else {
			callback(new Error('No permitido por CORS'))
		}
	}
}

//Decirle a Express que queremos usar CORS
app.use(cors(corsOptions))

//manera en que express maneja el routing
app.use('/api/veterinarios', veterinarioRoutes);

app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Servidor funcionando en el puerto ${PORT}`);
})