import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {

	const { cerrarSesion } = useAuth();

	return (
		<header className="py-10 px-10 bg-indigo-600">

			<div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">

				<h1 className="font-bold text-2xl text-center text-white">Administrador de Pacientes de <span className="text-black">Veterinaria</span>
				</h1>

				<nav className="flex lg:flex-row gap-5 items-center mt-6 lg:mt-0">
					<Link to="/admin" className="text-white text-lg font-bold">Pacientes</Link>
					<Link to="/admin/perfil" className="text-white text-lg font-bold">Perfil</Link>

					<button type="button" className="text-white text-lg font-bold" onClick={cerrarSesion}>Cerrar Sesión</button>
				</nav>

			</div>


		</header>
	)
}

export default Header