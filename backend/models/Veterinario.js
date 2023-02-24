import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarId.js';

//Crear el esquema
const veterinarioSchema = mongoose.Schema({
	//definir la estructura del modelo
	nombre: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	telefono: {
		type: String,
		default: null,
		trim: true,
	},
	web: {
		type: String,
		default: null,
	},
	token: {
		type: String,
		default: generarId(),
	},
	confirmado: {
		type: Boolean,
		default: false
	}
});

//Antes de guardar el registro, modificamos el password
veterinarioSchema.pre('save', async function (next) {
	//Evitar que vuelva a hasear en caso de que el Veterinario haga modificaciones a su perfil
	if (!this.isModified('password')) {
		next();
	}

	//Hashear el password
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
})

//retorna true o false
veterinarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
	return await bcrypt.compare(passwordFormulario, this.password);
}

//Registrarlo en Mongo
const Veterinario = mongoose.model('Veterinario', veterinarioSchema)

//Para poder hacer operaciones CRUD
export default Veterinario