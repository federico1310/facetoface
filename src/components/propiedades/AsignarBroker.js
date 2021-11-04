import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { useQuery } from '@apollo/client';
import PropiedadContext from '../../context/propiedades/PropiedadContext';
import { OBTENER_BROKERS } from '../../queries/Brokers/Brokers.ts';


const AsignarBroker = () => {

	const [ broker, setBrokers ] = useState([]);

	const propiedadContext = useContext(PropiedadContext);
	const { agregarBroker } = propiedadContext;

	const { data, loading, error } = useQuery(OBTENER_BROKERS);


	useEffect(() => {
		agregarBroker(broker)
	}, [broker])

	const seleccionarSabor = brokers => {
		setBrokers(brokers);
	}

  	if(loading) return 'Cargando...';

  	const { brokers } = data;

	return(
		<>
			<p className="mt-3 my-2 bg-white border-gray-800 text-gray-700 p-2 text-sm font-bold">Asigna un broker a la propiedad</p>
			<Select 
				className="mt-3"
				options={brokers}
				onChange={opcion => seleccionarSabor(opcion)} 
				getOptionValue={opciones => opciones.id} 
				getOptionLabel={opciones => opciones.name}
				placeholder="Busque o seleccione el broker"
				noOptionsMessage={() => "No hay resultados"}
			/>
		</>
	)	
}

export default AsignarBroker;