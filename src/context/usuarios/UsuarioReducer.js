import React, { useReducer } from 'react';
import UsuarioContext from './UsuarioContext';

import {
	MODIFICAR_USUARIO,
	MODIFICAR_TOKEN
} from '../../types'

const UsuarioReducer = ( state, action ) => {
	switch(action.type) {
		case MODIFICAR_USUARIO:
			return {
				...state,
				usuario: action.payload
			}
		case MODIFICAR_TOKEN:
			return {
				...state,
				token: action.payload
			}
		default:
			return state
	}
}

export default UsuarioReducer;