import { useState, useEffect } from "react";
import moment from 'moment';
import Layout from '../components/Layout';
import Propiedad from '../components/Propiedad';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import styles from '../styles/Properties.module.css';
import Map from '../components/Map';
// import { OBTENER_PROPIEDADES } from '../queries/Propiedades/Propiedades.ts';


const Propiedades = () => {
	const properties_example = [
		{
			'id':1,
			'real_property_name':'Casa entero en Tigre',
			'fake_property_name':'Muy buena casa en Tigre, es para visitarla, no se la pierdan',
			'price':'41',
			'per':'noche',
			'guests':4,
			'rooms': {
				'bedrooms':3,
				'offices':2
			},
			'beds':2,
			'toilets':4,
			'thumbnails': [
				{
					'id':1,
					'path':'/assets/properties/property_1.jpg',
					'original_height':800,
					'original_width':1200
				},
				{
					'id':2,
					'path':'/assets/properties/property_2.jpg',
					'original_height':600,
					'original_width':800
				},
				{
					'id':3,
					'path':'/assets/properties/property_3.jpg',
					'original_height':408,
					'original_width':612
				}
			],
			"coordinates": {
				"latitude":-34.661003, 
				"longitude":-58.489005
			}
		},
		{
			'id':2,
			'real_property_name':'Casa entero en Tigre',
			'fake_property_name':'Muy buena casa en Tigre, es para visitarla, no se la pierdan',
			'price':'41',
			'per':'noche',
			'guests':2,
			'rooms': {
				'bedrooms':0,
				'offices':2
			},
			'beds':1,
			'toilets':2,
			'thumbnails': [
				{
					'id':1,
					'path':'/assets/properties/property_1.jpg',
					'original_height':800,
					'original_width':1200
				},
				{
					'id':2,
					'path':'/assets/properties/property_2.jpg',
					'original_height':600,
					'original_width':800
				},
				{
					'id':3,
					'path':'/assets/properties/property_3.jpg',
					'original_height':408,
					'original_width':612
				}
			],
			"coordinates": {
				"latitude":-34.618915,
				"longitude":-58.676802
			}
		},
		{
			'id':3,
			'real_property_name':'Casa entero en Tigre',
			'fake_property_name':'Muy buena casa en Tigre, es para visitarla, no se la pierdan',
			'price':'61',
			'per':'noche',
			'guests':2,
			'rooms': {
				'bedrooms':1,
				'offices':3
			},
			'beds':4,
			'toilets':5,
			'thumbnails': [
				{
					'id':1,
					'path':'/assets/properties/property_1.jpg',
					'original_height':800,
					'original_width':1200
				},
				{
					'id':2,
					'path':'/assets/properties/property_2.jpg',
					'original_height':600,
					'original_width':800
				},
				{
					'id':3,
					'path':'/assets/properties/property_3.jpg',
					'original_height':408,
					'original_width':612
				}
			],
			"coordinates": {
				"latitude":-34.748329,
				"longitude":-58.637979
			}
		},
		{
			'id':4,
			'real_property_name':'Casa entero en El Uritorco',
			'fake_property_name':'Muy buena casa en Tigre, es para visitarla, no se la pierdan',
			'price':'111',
			'per':'noche',
			'guests':11,
			'rooms': {
				'bedrooms':10,
				'offices':3
			},
			'beds':4,
			'toilets':5,
			'thumbnails': [
				{
					'id':1,
					'path':'/assets/properties/property_1.jpg',
					'original_height':800,
					'original_width':1200
				},
				{
					'id':2,
					'path':'/assets/properties/property_2.jpg',
					'original_height':600,
					'original_width':800
				},
				{
					'id':3,
					'path':'/assets/properties/property_3.jpg',
					'original_height':408,
					'original_width':612
				}
			],
			"coordinates": {
				"latitude":-34.738066,
				"longitude":-58.310298
			}
		},
		{
			'id':5,
			'real_property_name':'Casa entero en El Uritorco',
			'fake_property_name':'Muy buena casa en Tigre, es para visitarla, no se la pierdan',
			'price':'111',
			'per':'noche',
			'guests':11,
			'rooms': {
				'bedrooms':10,
				'offices':3
			},
			'beds':4,
			'toilets':5,
			'thumbnails': [
				{
					'id':1,
					'path':'/assets/properties/property_1.jpg',
					'original_height':800,
					'original_width':1200
				},
				{
					'id':2,
					'path':'/assets/properties/property_2.jpg',
					'original_height':600,
					'original_width':800
				},
				{
					'id':3,
					'path':'/assets/properties/property_3.jpg',
					'original_height':408,
					'original_width':612
				}
			],
			"coordinates": {
				"latitude":-34.912363,
				"longitude":-58.389941
			}
		},
		{
			'id':6,
			'real_property_name':'Casa entero en El Uritorco',
			'fake_property_name':'Muy buena casa en Tigre, es para visitarla, no se la pierdan',
			'price':'111',
			'per':'noche',
			'guests':11,
			'rooms': {
				'bedrooms':10,
				'offices':3
			},
			'beds':4,
			'toilets':5,
			'thumbnails': [
				{
					'id':1,
					'path':'/assets/properties/property_1.jpg',
					'original_height':800,
					'original_width':1200
				},
				{
					'id':2,
					'path':'/assets/properties/property_2.jpg',
					'original_height':600,
					'original_width':800
				},
				{
					'id':3,
					'path':'/assets/properties/property_3.jpg',
					'original_height':408,
					'original_width':612
				}
			],
			"coordinates": {
				"latitude":-34.914882,
				"longitude":-58.595310
			}
		},
		{
			'id':7,
			'real_property_name':'Casa entero en El Uritorco',
			'fake_property_name':'Muy buena casa en Tigre, es para visitarla, no se la pierdan',
			'price':'111',
			'per':'noche',
			'guests':11,
			'rooms': {
				'bedrooms':10,
				'offices':3
			},
			'beds':4,
			'toilets':5,
			'thumbnails': [
				{
					'id':1,
					'path':'/assets/properties/property_1.jpg',
					'original_height':800,
					'original_width':1200
				},
				{
					'id':2,
					'path':'/assets/properties/property_2.jpg',
					'original_height':600,
					'original_width':800
				},
				{
					'id':3,
					'path':'/assets/properties/property_3.jpg',
					'original_height':408,
					'original_width':612
				}
			],
			"coordinates": {
				"latitude":-34.821137,
				"longitude":-58.641782
			}
		},
		{
			'id':8,
			'real_property_name':'Casa entero en El Uritorco',
			'fake_property_name':'Muy buena casa en Tigre, es para visitarla, no se la pierdan',
			'price':'111',
			'per':'noche',
			'guests':11,
			'rooms': {
				'bedrooms':10,
				'offices':3
			},
			'beds':4,
			'toilets':5,
			'thumbnails': [
				{
					'id':1,
					'path':'/assets/properties/property_1.jpg',
					'original_height':800,
					'original_width':1200
				},
				{
					'id':2,
					'path':'/assets/properties/property_2.jpg',
					'original_height':600,
					'original_width':800
				},
				{
					'id':3,
					'path':'/assets/properties/property_3.jpg',
					'original_height':408,
					'original_width':612
				}
			],
			"coordinates": {
				"latitude":-31.447441,
				"longitude":-65.059917
			}
		},
		{
			'id':9,
			'real_property_name':'Casa entero en El Uritorco',
			'fake_property_name':'Muy buena casa en Tigre, es para visitarla, no se la pierdan',
			'price':'111',
			'per':'noche',
			'guests':11,
			'rooms': {
				'bedrooms':10,
				'offices':3
			},
			'beds':4,
			'toilets':5,
			'thumbnails': [
				{
					'id':1,
					'path':'/assets/properties/property_1.jpg',
					'original_height':800,
					'original_width':1200
				},
				{
					'id':2,
					'path':'/assets/properties/property_2.jpg',
					'original_height':600,
					'original_width':800
				},
				{
					'id':3,
					'path':'/assets/properties/property_3.jpg',
					'original_height':408,
					'original_width':612
				}
			],
			"coordinates": {
				"latitude":-38.026201,
				"longitude":-57.563800
			}
		},{
			'id':10,
			'real_property_name':'Casa entero en El Uritorco',
			'fake_property_name':'Muy buena casa en Tigre, es para visitarla, no se la pierdan',
			'price':'111',
			'per':'noche',
			'guests':11,
			'rooms': {
				'bedrooms':10,
				'offices':3
			},
			'beds':4,
			'toilets':5,
			'thumbnails': [
				{
					'id':1,
					'path':'/assets/properties/property_1.jpg',
					'original_height':800,
					'original_width':1200
				},
				{
					'id':2,
					'path':'/assets/properties/property_2.jpg',
					'original_height':600,
					'original_width':800
				},
				{
					'id':3,
					'path':'/assets/properties/property_3.jpg',
					'original_height':408,
					'original_width':612
				}
			],
			"coordinates": {
				"latitude":-37.957340,
				"longitude":-57.556305
			}
		}
	];
	const { query, isReady } = useRouter();

	const [infoGuests, setInfoGuests] = useState('');
	const [queryGuests, setQueryGuests] = useState(query.guests);
	const [formatStartDate, setFormatStartDate] = useState(moment.unix(parseInt(query.startDate)).format('D MMM'));
	const [formatEndDate, setFormatEndDate] = useState(moment.unix(parseInt(query.endDate)).format('D MMM'));
	const [markedProp, setMarkedProp] = useState();

	useEffect(() => {
		let word = 'Huéspedes';
		if(queryGuests == 1)
			word = 'Huésped';

		setInfoGuests(queryGuests + ' ' + word);
	}, [queryGuests])
	
	useEffect(() => {
	    setQueryGuests(query.guests)
		setFormatStartDate(moment.unix(parseInt(query.startDate)).format('D MMM'))
		setFormatEndDate(moment.unix(parseInt(query.endDate)).format('D MMM'))
	}, [query]);

	const date = moment.unix(parseInt(query.startDate)).format("MM/DD/YYYY");
	console.log(date)


	if(!isReady)
		return null;
	
	// const { data, loading, error } = useQuery(OBTENER_PROPIEDADES);
	
	  // if(loading) return 'Cargando...';

	  return (
	    <Layout>
	    	<div className="min-h-screen flex positionRelative">
	    		<div className={`min-h-screen flex ${styles.sectionContainer}`}>
	    			<div className={styles.halfScreenPropertiesList}>
	    				<div className={styles.propertiesFiltersContainer}>
	    					<div className={styles.subTitle}>Mas de X alojamientos entre el {formatStartDate} - {formatEndDate}, {infoGuests}</div>
	    					<div className={styles.title}>Estadías en el área seleccionada</div>
	    					<div className={styles.propertiesCardContainer} onMouseLeave={() => setMarkedProp(0)}>
	    						{properties_example.map( propiedad => (
						              <Propiedad 
						                key={propiedad.id}
						                propiedad={propiedad}
						                markedProp={markedProp}
						                setMarkedProp={setMarkedProp}
						              />
						          ))}
	    					</div>
	    				</div>
	    			</div>
	    			<div className={styles.propertiesListMapContainer} id="mapPropertyList">
		    			<Map latitude={properties_example[0].coordinates.latitude} longitude={properties_example[0].coordinates.longitude} data={properties_example} markedProp={markedProp} setMarkedProp={setMarkedProp}/>
		    		</div>
	    		</div>
	    		
	    	</div>
	    </Layout>
	  );
}

export default Propiedades;