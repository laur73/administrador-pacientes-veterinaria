import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios'
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {

	const { auth } = useAuth();

	const [pacientes, setPacientes] = useState([]);
	const [paciente, setPaciente] = useState({});

	//Mandar a llamar la API una vez carga el componente
	useEffect(() => {
		const obtenerPacientes = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) return

				const config = {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					}
				}

				const { data } = await clienteAxios('/pacientes', config);
				setPacientes(data)
			} catch (error) {
				console.log(error)
			}
		}

		obtenerPacientes();
	}, [auth])

	const guardarPaciente = async (paciente) => {

		const token = localStorage.getItem('token');
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		}

		if (paciente.id) {
			//Editando uno ya existente
			try {
				const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)

				const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
				setPacientes(pacientesActualizado)
			} catch (error) {
				console.log(error)
			}
		} else {
			//Agregando uno nuevo
			try {

				const { data } = await clienteAxios.post('/pacientes', paciente, config)

				//Descartamos los siguientes campos
				const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;

				//Lo almacenamos en el state
				setPacientes([pacienteAlmacenado, ...pacientes])


			} catch (error) {
				console.log(error.response.data.msg)
			}
		}



	}

	const setEdicion = (paciente) => {
		setPaciente(paciente);
	}

	const eliminarPaciente = async id => {
		const confirmar = confirm('¿Confirmas que deseas eliminar ?')

		if (confirmar) {
			try {
				const token = localStorage.getItem('token')
				const config = {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					}
				}

				const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)

				const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id)
				setPacientes(pacientesActualizado)
			} catch (error) {
				console.log(error)
			}
		}
	}

	return (
		//En value pasas lo que quieres que se muestre a los otros componentes
		//Pueden ser funciones, states, etc
		<PacientesContext.Provider value={{ pacientes, guardarPaciente, setEdicion, paciente, eliminarPaciente }}>
			{children}
		</PacientesContext.Provider>
	)
}


export default PacientesContext;