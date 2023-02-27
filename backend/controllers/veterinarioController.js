import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";


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
	//Extraemos de la sesión
	const { veterinario } = req;

	//Obtenemos los datos de ese veterinario consultado
	res.json({ veterinario });
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

	//Creamos una instancia
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

//Enviar token al veterinario que olvidó su password
const recuperarPassword = async (req, res) => {
	const { email } = req.body;

	const existeVeterinario = await Veterinario.findOne({ email });

	if (!existeVeterinario) {
		const error = new Error('El veterinario no está registrado');
		return res.status(400).json({ msg: error.message });
	}

	try {
		existeVeterinario.token = generarId();
		await existeVeterinario.save();
		res.json({ msg: 'Hemos enviado un email con las instrucciones' })
	} catch (error) {
		console.log(error)
	}
}

const comprobarToken = async (req, res) => {
	const { token } = req.params;

	const tokenValido = await Veterinario.findOne({ token })

	if (tokenValido) {
		res.json({ msg: 'Token válido y el usuario existe' })
	} else {
		const error = new Error('Token no válido');
		return res.status(400).json({ msg: error.message })
	}
}

const nuevoPassword = async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;

	const veterinario = await Veterinario.findOne({ token });
	if (!veterinario) {
		const error = new Error('Hubo un error');
		return res.status(400).json({ msg: error.message });
	}

	try {
		veterinario.token = null;
		veterinario.password = password;
		await veterinario.save();
		res.json({ msg: 'Password modificado correctamente' })
	} catch (error) {
		console.log(error)
	}
}

export {
	registrar,
	perfil,
	confirmar,
	autenticar,
	recuperarPassword,
	comprobarToken,
	nuevoPassword
}