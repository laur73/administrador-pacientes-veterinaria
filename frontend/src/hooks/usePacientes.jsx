//Extrae los datos
import { useContext } from 'react';
//De que context va a extraer los datos
import PacientesContext from '../context/PacientesProvider';

const usePacientes = () => {
	return useContext(PacientesContext);
}

export default usePacientes;