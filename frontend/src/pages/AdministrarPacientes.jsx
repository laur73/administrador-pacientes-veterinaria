import { useState } from "react"
import Formulario from "../components/Formulario"
import ListadoPacientes from "../components/ListadoPacientes"

const AdministrarPacientes = () => {

	const [mostrarFormulario, setMostrarFormulario] = useState(false)

	return (
		<div className="flex flex-col lg:flex-row px-10 gap-10">

			<button
				type="button" className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md md:hidden" onClick={() => setMostrarFormulario(!mostrarFormulario)}>{!mostrarFormulario ? 'Mostrar Formulario' : 'Ocultar Formulario'}
			</button>

			<div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block lg:w-1/2 xl:w-2/5`}>
				<Formulario />
			</div>

			<div className="lg:w-1/2 xl:w-3/5">
				<ListadoPacientes />
			</div>
		</div>
	)
}

export default AdministrarPacientes