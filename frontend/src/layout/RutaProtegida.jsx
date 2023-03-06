import { Outlet } from "react-router-dom";

const RutaProtegida = () => {
	return (
		<>
			<h1>Layout de las rutas protegidas</h1>
			<Outlet />

		</>
	)
}

export default RutaProtegida