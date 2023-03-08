import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";


const registrar = async (req, res) => {
	const { email, nombre } = req.body;

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

		//Enviar el email
		emailRegistro({ email, nombre, token: veterinarioGuardado.token })

		res.json(veterinarioGuardado)
	} catch (error) {
		console.log(error)
	}

}

const perfil = (req, res) => {
	//Extraemos de la sesión
	const { veterinario } = req;

	//Obtenemos los datos de ese veterinario consultado
	res.json(veterinario);
}

const actualizarPerfil = async (req, res) => {
	const veterinario = await Veterinario.findById(req.params.id);
	if (!veterinario) {
		const error = new Error("Hubo un error");
		return res.status(400).json({ msg: error.message });
	}

	const { email } = req.body;
	if (veterinario.email !== req.body.email) {
		const existeEmail = await Veterinario.findOne({ email });

		if (existeEmail) {
			const error = new Error("Ese email ya esta en uso");
			return res.status(400).json({ msg: error.message });
		}
	}

	try {
		veterinario.nombre = req.body.nombre;
		veterinario.email = req.body.email;
		veterinario.web = req.body.web;
		veterinario.telefono = req.body.telefono;

		const veterianrioActualizado = await veterinario.save();
		res.json(veterianrioActualizado);
	} catch (error) {
		console.log(error);
	}
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

		res.json({ msg: "Veterinario Confirmado Correctamente" })
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
		res.json({
			_id: veterinario._id,
			nombre: veterinario.nombre,
			email: veterinario.email,
			token: generarJWT(veterinario.id)
		})
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

		//Enviar el email
		emailOlvidePassword({ email, nombre: existeVeterinario.nombre, token: existeVeterinario.token })

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

const actualizarPassword = async (req, res) => {
	// Leer los datos
	const { id } = req.veterinario;
	const { pwd_actual, pwd_nuevo } = req.body;

	// Comprobar que el veterinario existe
	const veterinario = await Veterinario.findById(id);
	if (!veterinario) {
		const error = new Error("Hubo un error");
		return res.status(400).json({ msg: error.message });
	}

	// Comprobar su password
	if (await veterinario.comprobarPassword(pwd_actual)) {
		// Almacenar el nuevo password
		veterinario.password = pwd_nuevo;
		await veterinario.save();
		res.json({ msg: "Contraseña Almacenada Correctamente" });
	} else {
		const error = new Error("La Contraseña Actual es Incorrecta");
		return res.status(400).json({ msg: error.message });
	}
};


export {
	registrar,
	perfil,
	confirmar,
	autenticar,
	recuperarPassword,
	comprobarToken,
	nuevoPassword,
	actualizarPerfil,
	actualizarPassword
}