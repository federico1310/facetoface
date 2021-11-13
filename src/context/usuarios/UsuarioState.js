import React, { useReducer } from 'react';
import UsuarioContext from './UsuarioContext';
import UsuarioReducer from './UsuarioReducer'

import {
	MODIFICAR_USUARIO,
	MODIFICAR_TOKEN
} from '../../types'

const UsuarioState = ({children}) => {

	// State de propiedad
	const initialState = {
		usuario: {},
		token: null
	}

	const [ state, dispatch ] = useReducer(UsuarioReducer, initialState);

	// Modificar el broker
	const modificarUsuario = usuario => {
		// console.log(broker)
		dispatch({
			type: MODIFICAR_USUARIO,
			payload: usuario
		})
	}

	const modificarToken = token => {
		// console.log(broker)
		dispatch({
			type: MODIFICAR_TOKEN,
			payload: token
		})
	}

	return(
		<UsuarioContext.Provider value={{usuario: state.usuario, token: state.token, modificarToken, modificarUsuario}}>
			{children}
		</UsuarioContext.Provider>
	)
}

export default UsuarioState;