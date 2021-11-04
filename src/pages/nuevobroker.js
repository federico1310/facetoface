import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { NUEVO_BROKER, OBTENER_BROKERS } from '../queries/Brokers/Brokers.ts';

const NuevoBroker = () => {

    const router = useRouter();

    const [ mensaje, guardarMensaje] = useState(null);

    // Mutation para crear nuevos brokers
    const [ createBroker ] = useMutation(NUEVO_BROKER, {
        update(cache, { data: { createBroker } }) {
            // Obtener objeto de cache que deseamos actualizar
            try {
                 
                const query = cache.readQuery({ query: OBTENER_BROKERS });
                if(query)
                {
                    const  { brokers } = query;
                    // Reescribimos el cache (el cache nunca se debe modificar)
                    cache.writeQuery({
                        query: OBTENER_BROKERS,
                        data: {
                            brokers : [...brokers, createBroker]
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
            nombre: '',
            address: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre del broker es obligatorio')
        }),
        onSubmit: async valores => {
            const { nombre: name, address} = valores;
            
            try {

                const { data } = await createBroker({
                    variables: {
                        brokerInput: {
                            name,
                            address
                        }
                    }
                }) 
                // console.log(data.createBroker);
                router.push('/') // Redireccionar hacia clientes
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


    return ( 
        <Layout>
            <h1 className="text-2xl tituloPage font-light">Nuevo Broker</h1>

            {mensaje && mostrarMensaje()}

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                Nombre
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nombre" type="text" placeholder="Nombre Broker" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nombre} />
                        </div>

                        { formik.touched.nombre && formik.errors.nombre ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.nombre}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                                Dirección
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="Dirección Broker" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address} />
                        </div>

                        <input type="submit" className="buttonGral w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-400" value="Registrar Broker" />

                    </form>
                </div>
            </div>
        </Layout>
     );
}
 
export default NuevoBroker;