import React, { useReducer } from 'react';
import PropiedadContext from './PropiedadContext';
import PropiedadReducer from './PropiedadReducer'

import {
	SELECCIONAR_BROKER
} from '../../types'

const PropiedadState = ({children}) => {

	// State de propiedad
	const initialState = {
		broker: {}
	}

	const [ state, dispatch ] = useReducer(PropiedadReducer, initialState);

	// Modificar el broker
	const agregarBroker = broker => {
		// console.log(broker)
		dispatch({
			type: SELECCIONAR_BROKER,
			payload: broker
		})
	}

	return(
		<PropiedadContext.Provider value={{broker: state.broker, agregarBroker}}>
			{children}
		</PropiedadContext.Provider>
	)
}

export default PropiedadState;