import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from '../components/Alerta';


const NuevoPassword = () => {
	const [password, setPassword] = useState('');
	const [repetirPassword, setRepetirPassword] = useState('');
	const [tokenValido, setTokenValido] = useState(false);

	const [alerta, setAlerta] = useState({})
	const [passwordModificado, setPasswordModificado] = useState(false);

	const params = useParams()
	const { token } = params;

	useEffect(() => {
		const comprobarToken = async () => {
			try {
				await clienteAxios(`/veterinarios/recuperar-password/${token}`)
				setAlerta({ msg: 'Ingresa tu nueva contraseña' })
				setTokenValido(true);
			} catch (error) {
				setAlerta({ msg: 'Hubo un error con el enlace', error: true })
			}
		}
		comprobarToken();

	}, [])

	const handleSubmit = async e => {
		e.preventDefault();

		if (password.length < 6) {
			setAlerta({ msg: 'La contraseña debe tener por lo menos 6 caractéres', error: true })
			return;
		}

		if (password != repetirPassword) {
			setAlerta({ msg: 'Las contraseñas no coinciden', error: true })
			return;
		}

		try {
			const url = `/veterinarios/recuperar-password/${token}`;
			const { data } = await clienteAxios.post(url, { password });

			setPasswordModificado(true);

			setAlerta({ msg: data.msg })
		} catch (error) {
			setAlerta({ msg: error.response.data.msg, error: true })
		}
	}

	const { msg } = alerta;

	return (
		<>
			<div>
				<h1 className="text-indigo-600 font-black text-5xl text-center">Reestablece tu <span className="text-black">Contraseña</span></h1>
			</div>

			<div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

				{msg && <Alerta alerta={alerta} />}

				{tokenValido && (

					<form onSubmit={handleSubmit}>

						<div className="my-5">
							<label className="uppercase text-gray-600 block text-xl font-bold mb-3">Nueva Contraseña</label>
							<input type="password" placeholder="Escribe tu nueva contraseña..." className="border w-full p-3 bg-gray-50 rounded-md" value={password} onChange={e => setPassword(e.target.value)} />
						</div>

						<div className="my-5">
							<label className="uppercase text-gray-600 block text-xl font-bold mb-3">Vuelve a Escribir tu Contraseña</label>
							<input type="password" placeholder="Escribe de nuevo tu contraseña..." className="border w-full p-3 bg-gray-50 rounded-md" value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} />
						</div>

						<div className="my-5 flex justify-center">
							<input type="submit" value="Reestablecer Contraseña" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-full " />
						</div>

					</form>)}




			</div>
		</>
	)
}

export default NuevoPassword