import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<>
			<main className="container mx-auto lg:grid lg:grid-cols-2 mt-16 gap-12 p-5 items-center">
				<Outlet />
			</main>
		</>
	);
};

export default AuthLayout;
