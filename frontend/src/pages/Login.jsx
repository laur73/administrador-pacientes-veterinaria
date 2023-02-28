const Login = () => {
	return (
		<>

			<div className="flex items-center">
				<h1 className="text-indigo-600 font-black text-5xl text-center">Inicia Sesión y Administra tus <span className="text-black">Pacientes</span></h1>
			</div>

			<div>
				<form>
					<div className="my-5">
						<label className="uppercase text-gray-600 block text-xl font-bold mb-3">Correo Electrónico</label>
						<input type="email" placeholder="Escribe tu correo electrónico..." className="border w-full p-3 bg-gray-50 rounded-md" />
					</div>
					<div className="my-5">
						<label className="uppercase text-gray-600 block text-xl font-bold mb-3">Contraseña</label>
						<input type="password" placeholder="Escribe tu contraseña..." className="border w-full p-3 bg-gray-50 rounded-md" />
					</div>

					<div className="my-5 flex justify-center">
						<input type="submit" value="Iniciar Sesión" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-3/4 " />
					</div>
				</form>
			</div>

		</>
	);
};

export default Login;
