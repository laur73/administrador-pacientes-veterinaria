import { Link } from "react-router-dom";

const Registrar = () => {
	return (
		<>
			<div>
				<h1 className="text-indigo-600 font-black text-5xl text-center">Crea una cuenta y Administra tus <span className="text-black">Pacientes</span></h1>
			</div>

			<div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
				<form>

					<div className="my-5">
						<label className="uppercase text-gray-600 block text-xl bg- font-bold mb-3">Nombre</label>
						<input type="text" placeholder="Escribe tu nombre..." className="border w-full p-3 bg-gray-50 rounded-md" />
					</div>

					<div className="my-5">
						<label className="uppercase text-gray-600 block text-xl bg- font-bold mb-3">Correo Electrónico</label>
						<input type="email" placeholder="Escribe tu correo electrónico..." className="border w-full p-3 bg-gray-50 rounded-md" />
					</div>

					<div className="my-5">
						<label className="uppercase text-gray-600 block text-xl font-bold mb-3">Contraseña</label>
						<input type="password" placeholder="Escribe tu contraseña..." className="border w-full p-3 bg-gray-50 rounded-md" />
					</div>

					<div className="my-5">
						<label className="uppercase text-gray-600 block text-xl font-bold mb-3">Vuelve a Escribir tu Contraseña</label>
						<input type="password" placeholder="Escribe de nuevo tu contraseña..." className="border w-full p-3 bg-gray-50 rounded-md" />
					</div>

					<div className="my-5 flex justify-center">
						<input type="submit" value="Crear Cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-full " />
					</div>

				</form>

				<nav className="lg:flex lg:justify-evenly">
					<Link to="/" className="block text-center my-5 text-gray-500">¿Ya tienes una cuenta? Inicia Sesión</Link>
				</nav>
			</div>

		</>
	);
};

export default Registrar;
