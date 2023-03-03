import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {

	const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
	const [cargando, setCargando] = useState(true);
	const [alerta, setAlerta] = useState({});

	const params = useParams();
	const { id } = params;

	useEffect(() => {
		const confirmarCuenta = async () => {
			try {
				const url = `/veterinarios/confirmar/${id}`;
				const { data } = await clienteAxios(url);

				setCuentaConfirmada(true);
				setAlerta({ msg: data.msg })
			} catch (error) {
				setAlerta({ msg: error.response.data.msg, error: true })
			}

			setCargando(false);
		}
		confirmarCuenta();
	}, [])

	return (
		<>
			<div>
				<h1 className="text-indigo-600 font-black text-5xl text-center">Confirma tu Cuenta y Administra tus <span className="text-black">Pacientes</span></h1>
			</div>

			<div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
				{!cargando && <Alerta alerta={alerta} />}

				{cuentaConfirmada && (
					<Link to="/" className="flex justify-center bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-full">Inicia Sesión</Link>
				)}
			</div>
		</>
	);
};

export default ConfirmarCuenta;
