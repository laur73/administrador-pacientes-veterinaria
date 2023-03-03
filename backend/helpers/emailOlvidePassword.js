import nodemailer from 'nodemailer';

//Credenciales de acceso
const emailOlvidePassword = async (datos) => {
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		}
	});

	const { email, nombre, token } = datos;

	//Enviar el email
	const info = await transporter.sendMail({
		from: 'APV - Adminsitrador de Pacientes de Veterinaria',
		to: email,
		subject: 'Reestablece tu contraseña',
		text: 'Reestablece tu contraseña',
		html: `<p>Hola: ${nombre}, has solicitado reestablecer tu contraseña.</p>
			<p>Haz click en el siguiente enlace para generar una nueva contraseña:
			<a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Contraseña</a></p>

			<p>Si tu no solicitaste este cambio, puedes ignorar este mensaje</p>
		`
	});

	console.log('Solicitud de nueva contraseña enviada: %s', info.messageId)
}


export default emailOlvidePassword;