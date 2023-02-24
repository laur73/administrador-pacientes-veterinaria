import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";


const registrar = async (req, res) => {
	const { email } = req.body;

	//Prevenir usuarios duplicados
	const existeUsuario = await Veterinario.findOne({ email });

	if (existeUsuario) {
		const error = new Error('Usuario ya registrado');
		return res.status(400).json({ msg: error.message })
	}

	//Guardar un registro veterinario
	try {
		const veterinario = new Veterinario(req.body);
		const veterinarioGuardado = await veterinario.save();
		res.json({ mensaje: "Usuario registrado" })
	} catch (error) {
		console.log(error)
	}

}

const perfil = (req, res) => {
	res.json({ mensaje: "Consultando perfil" })
}

const confirmar = async (req, res) => {
	const { token } = req.params;

	//Creamos una instancia del veterinario y buscamos por su token
	const veterinarioConfirmado = await Veterinario.findOne({ token });

	//Comrpobamos si ese token existe
	if (!veterinarioConfirmado) {
		const error = new Error('Token no válido');
		return res.status(404).json({ msg: error.message });
	}

	//Modificamos valores y guardamos en la BD
	try {
		veterinarioConfirmado.token = null;
		veterinarioConfirmado.confirmado = true;
		await veterinarioConfirmado.save();

		res.json({ mensaje: "Veterinario Confirmado Correctamente" })
	} catch (error) {
		console.log(error);
	}

}

const autenticar = async (req, res) => {
	//Comprobar si existe el veterinario a autenticar
	const { email, password } = req.body;

	const veterinario = await Veterinario.findOne({ email });

	if (!veterinario) {
		const error = new Error('El veterinario no existe');
		return res.status(403).json({ msg: error.message })
	}

	//Comprobar si el veterinario ya confirmó su cuenta
	if (!veterinario.confirmado) {
		const error = new Error('Tu cuenta no ha sido confirmada');
		return res.status(403).json({ msg: error.message })
	}

	//Revisar el password
	if (await veterinario.comprobarPassword(password)) {
		//Autenticar
		res.json({ token: generarJWT(veterinario.id) })
	} else {
		const error = new Error('Password incorrecto');
		return res.status(403).json({ msg: error.message })
	}


}

export {
	registrar,
	perfil,
	confirmar,
	autenticar
}