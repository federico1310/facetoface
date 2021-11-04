import React, { useReducer } from 'react';
import PropiedadContext from './PropiedadContext';

import {
	SELECCIONAR_BROKER
} from '../../types'

const PropiedadReducer = ( state, action ) => {
	switch(action.type) {
		case SELECCIONAR_BROKER:
			return {
				...state,
				broker: action.payload
			}
		default:
			return state
	}
}

export default PropiedadReducer;