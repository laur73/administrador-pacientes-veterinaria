//Extrae los datos
import { useContext } from "react";
//De que context va a extraer los datos
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
	return useContext(AuthContext);
}

export default useAuth;