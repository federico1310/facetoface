import React, { useState, useContext } from 'react';
import Layout from '../components/Layout';
import AsignarBroker from '../components/propiedades/AsignarBroker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import PropiedadContext from '../context/propiedades/PropiedadContext';
import { OBTENER_PROPIEDADES, NUEVA_PROPIEDAD } from '../queries/Propiedades/Propiedades.ts';


const NuevoBroker = () => {

    const verificaBrokerVacio = (broker) => {
        return Object.keys(broker).length ==  0
    }
    // Utilizar context y extraer valores
    const propiedadContext = useContext(PropiedadContext);
    const { broker } = propiedadContext;

    const router = useRouter();

    const [ mensaje, guardarMensaje] = useState(null);

    // Mutation para crear nuevas properties
    const [ createProperty ] = useMutation(NUEVA_PROPIEDAD, {
        update(cache, { data: { createProperty } }) {
            // Obtener objeto de cache que deseamos actualizar
            try {
                const query = cache.readQuery({ query: OBTENER_PROPIEDADES });
                if(query)
                {
                    const { properties } = query;

                    // Reescribimos el cache (el cache nunca se debe modificar)
                    cache.writeQuery({
                        query: OBTENER_PROPIEDADES,
                        data: {
                            properties : [...properties, createProperty]
                        }
                    })
                }

            } catch(error) {
                console.log(error);
            }
        }
    });

    const formik = useFormik({
        initialValues: {
            address: '',
            price: '',
            currency: '',
            latitude: '',
            longitude: ''
        },
        validationSchema: Yup.object({
            address: Yup.string().required('La dirección de la propiedad es obligatoria')
        }),
        onSubmit: async valores => {

            if(verificaBrokerVacio(broker)) {
                guardarMensaje('Por favor seleccione un broker al que asignar la propiedad');
                
                setTimeout(() => {
                    guardarMensaje(null);
                }, 2000);

                return null;
            }

            const { address, price, currency, latitude, longitude} = valores;
            const { id: brokerId } = broker

            let sentPrice = price;
            let sentCurrency = currency;
            let sentLatitude = latitude;
            let sentLongitude = longitude;
            if(price === '') 
                sentPrice = undefined;
            if(currency === '') 
                sentCurrency = undefined;
            if(latitude === '') 
                sentLatitude = undefined;
            if(longitude === '') 
                sentLongitude = undefined;   

            try {

                const { data } = await createProperty({
                    variables: {
                        propertyInput: {
                            brokerId,
                            address,
                            latitude: sentLatitude,
                            longitude: sentLongitude,
                            price: sentPrice,
                            currency: sentCurrency
                        }
                    }
                }) 
                // console.log(data.createProperty);
                router.push('/propiedades') // Redireccionar hacia clientes
            } catch(error) {
                guardarMensaje(error.message.replace('GraphQL error: ',''));
                
                setTimeout(() => {
                    guardarMensaje(null);
                }, 2000);
            }
        }
    });

    const mostrarMensaje = () => {
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    const validarPropiedad = () => {
        return verificaBrokerVacio(broker) ? "opacity-50 cursor-not-allowed" : "";
    }

    return ( 
        <Layout>
            <h1 className="text-2xl tituloPage font-light">Nueva Propiedad</h1>

            {mensaje && mostrarMensaje()}

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                                Dirección
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="Dirección Propiedad" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address} />
                        </div>

                        { formik.touched.address && formik.errors.address ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.address}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                Precio
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder="Precio" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.price} />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currency">
                                Divisa
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="currency" type="text" placeholder="Divisa" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.currency} />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">
                                Latitud
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="latitude" type="number" placeholder="Latitud" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.latitude} />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">
                                Longitud
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="longitude" type="number" placeholder="Longitud" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.longitude} />
                        </div>                        

                        <AsignarBroker />

                        <input type="submit" className={`buttonGral w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-400 ${ validarPropiedad() }`} value="Registrar Broker" />

                    </form>
                </div>
            </div>
        </Layout>
     );
}
 
export default NuevoBroker;