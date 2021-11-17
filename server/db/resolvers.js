const Usuario = require('../models/Usuario');
const Producto = require('../models/Producto');
const Cliente = require('../models/Cliente');
const Pedido = require('../models/Pedido');
const Anuncio = require('../models/Anuncio');
const GrupoTipos = require('../models/GrupoTipos');
const Tipos = require('../models/Tipos');
const PrivacidadTipos = require('../models/PrivacidadTipos');
const Reserva = require('../models/Reserva');


const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' })

const crearToken = (usuario, secreta, expiresIn) => {

    const { id, name, email, last_name, gender, birthday, registered_at } = usuario;

    return jwt.sign( { id, name, email, last_name, gender, birthday, registered_at }, secreta, { expiresIn } )
}

// Resolvers
const resolvers = {
	Query: {
		obtenerUsuario: async (_, {}, ctx) => {
            return ctx.usuario;
        },
        obtenerAnuncios: async (_, {}, ctx) => {
            console.log(ctx)
            try {
                const anuncios = await Anuncio.find({ owner: ctx.usuario.id.toString() });
                for await ( const anuncio of anuncios ) {
                    anuncio.estado = 'AVAILABLE';
                };
                return anuncios;
            } catch(error) {
                console.log(error);
            }
        },
        obtenerListadoAnuncios: async (_, { input }) => {
            try {
                const {city, guests, startDate, endDate} = input;

                const anuncios = await Anuncio.find({ city, guests: {$gte: guests} });
                var finalArr = [];
                for await ( const anuncio of anuncios ) {
                    let reservas = await Reserva.find({anuncio: anuncio._id, endDate: {$gt: startDate}, startDate: {$lt: endDate}});

                    if(reservas.length == 0)
                    {
                        finalArr.push(anuncio)
                    }
                };
                return finalArr;
            } catch(error) {
                console.log(error);
            }
        },
        /*obtenerProducto: async (_, { id } ) => {
            // Revisar si el producto existe
            const producto = await Producto.findById(id);
            
            if(!producto) {
                throw new Error('Producto no encontrado');
            }

            return producto;
        },*/
        obtenerClientes: async () => {
            try {
                const clientes = await Cliente.find({});
                return clientes;
            } catch (error) {
                console.log(error)
            }
        },
        obtenerClientesVendedor: async (_, {}, ctx) => {
            try {
                const clientes = await Cliente.find({ vendedor: ctx.usuario.id.toString() });
                
                return clientes;
            } catch (error) {
                console.log(error)
            }
        },
        obtenerCliente: async (_, {id}, ctx) => {

            // Revisar si el cliente existe o no
            const cliente = await Cliente.findById(id);

            if(!cliente) {
                throw new Error('Cliente no encontrado');
            }

            // Quien lo creo puede verlo
            if(cliente.vendedor.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales');
            }

            return cliente;
        },
        obtenerPedidos: async () => {
            try {
                const pedidos = await Pedido.find({});
                return pedidos;
            } catch(error) {
                console.log(error);
            }
        },
        obtenerPedidosVendedor: async (_, { }, ctx) => {
            try {
                const pedidos = await Pedido.find({ vendedor: ctx.usuario.id});
                return pedidos;
            } catch(error) {
                console.log(error);
            }
        },
        obtenerPedido: async (_, { id }, ctx) => {
            // Verifica si el pedido existe o no
            const pedido = await Pedido.findById(id);
            if(!pedido) {
                throw new Error('Pedido no encontrado');
            } 

            // Solo quien lo creo puede verlo
            if(pedido.vendedor.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales');
            }

            // Retorna el resultado
            return pedido;
        },
        obtenerPedidoEstado: async (_, {estado}, ctx) => {
            const pedidos = await Pedido.find({ vendedor: ctx.usuario.id, estado});
            return pedidos;
        },
        mejoresClientes: async () => {
            const clientes = await Pedido.aggregate([
                {   $match : { estado : "COMPLETADO"} },
                {   $group: {
                    _id : "$cliente",
                    total: {    $sum: '$total' }
                }},
                {
                    $lookup: {
                        from: 'clientes',
                        localField: '_id',
                        foreignField: '_id',
                        as: "cliente"
                    }
                },
                {
                    $limit: 10
                },
                {
                    $sort: { total : -1 }
                }
            ]);

            return clientes;
        },
        mejoresVendedores: async () => {
            const vendedores = await Pedido.aggregate([
                { $match : { estado: "COMPLETADO" } },
                { $group : {
                    _id : "$vendedor",
                    total: {$sum : '$total'}
                }},
                {
                    $lookup: {
                        from: 'usuarios',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'vendedor'
                    }
                },
                {
                    $limit: 3
                },
                {
                    $sort: { total : -1}
                }
            ])

            return vendedores;
        },
        /*buscarProducto: async (_, {texto}) => {
            const productos = await Producto.find({ $text: { $search: texto} }).limit(10);

            return productos;
        }*/
	},
    Mutation: {
        nuevoUsuario: async (_, { input } ) => {
            
            const { email, password } = input;

            // Revisar si el usuario ya esta registrado
            const existeUsuario = await Usuario.findOne({email});
            if(existeUsuario) {
                throw new Error('El usuario ya esta registrado');
            }

            // Hashear su password
            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);
            input.host = false;

            try {
                // Guardarlo en DB
                const usuario = new Usuario(input);
                usuario.save(); // Guardarlo
                return usuario;
            } catch (error) {
                console.log(error);
            }
        },
        autenticarUsuario: async (_, { input }) => {

            const { email, password } = input; 
            
            // Si el usuario existe
            const existeUsuario = await Usuario.findOne({email});
            if(!existeUsuario) {
                throw new Error('El usuario no existe');
            }

            // Revisar si el password es correcto
            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            if(!passwordCorrecto) {
                throw new Error('El Password es Incorrecto');
            }

            // Crear el token
            return {
                token: crearToken(existeUsuario, process.env.SECRETA, '24h' )
            }
        },
        nuevoAnuncio: async (_, {input}, ctx) => {

            // Crear un nuevo pedido
            const nuevoAnuncio = new Anuncio(input);

            // Asignar el vendedor
            nuevoAnuncio.owner = ctx.usuario.id;

            // Guardarlo en la base de datos
            const resultado = await nuevoAnuncio.save();
            return resultado;
        },
        nuevoTipo: async (_, {input}) => {
            // Crear un nuevo pedido
            const nuevoTipo = new Tipos(input);

            // Guardarlo en la base de datos
            const resultado = await nuevoTipo.save();
            return resultado;
        },
        nuevoGrupoTipo: async (_, {input}) => {

            // Crear un nuevo pedido
            const nuevoGrupoTipo = new GrupoTipos(input);
            
            // Guardarlo en la base de datos
            const resultado = await nuevoGrupoTipo.save();
            return resultado;
        },
        nuevoPrivacidadTipo: async (_, {input}) => {

            // Crear un nuevo pedido
            const nuevoPrivacidadTipo = new PrivacidadTipos(input);
            
            // Guardarlo en la base de datos
            const resultado = await nuevoPrivacidadTipo.save();
            return resultado;
        },
        nuevaReserva: async (_, {input}, ctx) => {

            const {anuncio, startDate, endDate, totalPrice} = input;

            // Verificar si el anuncio existe
            let anuncioExiste = await Anuncio.findById(anuncio);
            if(!anuncioExiste) {
                throw new Error('Ese anuncio no existe');
            }

            const reserva = await Reserva.find({endDate: {$gt: startDate}, startDate: {$lt: endDate}});

            if(reserva && reserva.length > 0) {
                throw new Error('Ya existe una reserva entre las fechas seleccionadas');
            }

            if(totalPrice == 0)
            {
                throw new Error('El precio total no puede ser 0');
            }

            // Crear una nueva reserva
            const nuevaReserva = new Reserva(input);
            
            // Asignar el usuario
            nuevaReserva.usuario = ctx.usuario.id;


            // Guardarlo en la base de datos
            const resultado = await nuevaReserva.save();
            return resultado;
        },
        /*actualizarProducto: async (_, {id, input}) => {

            // Revisar si el producto existe
            let producto = await Producto.findById(id);
            
            if(!producto) {
                throw new Error('Producto no encontrado');
            }

            // Guardarlo en la base de datos
            producto = await Producto.findOneAndUpdate({_id : id}, input, { new: true });

            return producto;
        },
        eliminarProducto: async (_, { id }) => {

            // Revisar si el producto existe
            const producto = await Producto.findById(id);
            
            if(!producto) {
                throw new Error('Producto no encontrado');
            }

            await Producto.findOneAndDelete({ _id : id});

            return "Producto elminado";
        },*/
        nuevoCliente: async (_, {input}, ctx) => {

            // Verificar si el cliente esta registrado
            const { email } = input;

            const cliente = await Cliente.findOne({ email });
            if(cliente) {
                throw new Error('Ese cliente ya esta registrado');
            }

            const nuevoCliente = new Cliente(input);

            // Asignar el vendedor
            nuevoCliente.vendedor = ctx.usuario.id;
            
            try {
                // Guardarlo en la base de datos
                const resultado = await nuevoCliente.save();
                
                return resultado;
            } catch (error) {
                console.log(error);
            }
        },
        actualizarCliente: async (_, {id, input}, ctx) => {
            // Verificar si el cliente esta registrado
            let cliente = await Cliente.findById(id);
            if(!cliente) {
                throw new Error('Ese cliente no existe');
            }

            // Verificar si el vendedor puede editarlo
            if(cliente.vendedor.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales');
            }

            // Guardarlo en la base
            cliente = await Cliente.findOneAndUpdate({_id : id}, input, { new: true});
            return cliente;
        },
        eliminarCliente: async (_, {id}, ctx) => {
            // Verificar si el cliente esta registrado
            let cliente = await Cliente.findById(id);
            if(!cliente) {
                throw new Error('Ese cliente no existe');
            }

            // Verificar si el vendedor puede editarlo
            if(cliente.vendedor.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales');
            }

            // Eliminar cliente
            await Cliente.findOneAndDelete({_id : id});
            return "Cliente Eliminado";
        },
        nuevoPedido: async (_, {input}, ctx) => {

            const {cliente} = input; 
            // Verificar si el cliente existe
            let clienteExiste = await Cliente.findById(cliente);
            if(!clienteExiste) {
                throw new Error('Ese cliente no existe');
            }


            // Verificar si el cliente es del vendedor
             if(clienteExiste.vendedor.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales');
            }

            // Revisar que haya stock del producto
            for await ( const articulo of input.pedido ) {
                const { id } = articulo;

                const producto = await Producto.findById(id);

                if(articulo.cantidad > producto.existencia) {
                    throw new Error(`El articulo: ${producto.nombre} excede la cantidad disponible`);
                } else {
                    // Restar la cantidad a lo disponible
                    producto.existencia = producto.existencia - articulo.cantidad;

                    await producto.save();
                }
            };

            // Crear un nuevo pedido
            const nuevoPedido = new Pedido(input);

            
            // Asignar el vendedor
            nuevoPedido.vendedor = ctx.usuario.id;


            // Guardarlo en la base de datos
            const resultado = await nuevoPedido.save();
            return resultado;
        },
        actualizarPedido: async (_,{ id, input }, ctx) => {
            
            const { cliente } = input;

            // Verificar si el pedido existe
            const existePedido = await Pedido.findById(id);
            if(!existePedido) {
                throw new Error('El pedido no existe');
            }

            // Verificar si el cliente existe
            const existeCliente = await Cliente.findById(cliente);
            if(!existeCliente) {
                throw new Error('El Cliente no existe');
            }

            // Verificar si el cliente y el pedido pertenecen al vendedor
            if(existeCliente.vendedor.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales');
            }

            if(existePedido.vendedor.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales');
            }

            // Revisar el stock
            if(input.pedido) {
                for await ( const articulo of input.pedido ) {
                    const { id } = articulo;

                    const producto = await Producto.findById(id);

                    if(articulo.cantidad > producto.existencia) {
                        throw new Error(`El articulo: ${producto.nombre} excede la cantidad disponible`);
                    } else {
                        // Restar la cantidad a lo disponible
                        producto.existencia = producto.existencia - articulo.cantidad;

                        await producto.save();
                    }
                };
            }

            // Guardar el pedido
            const resultado = await Pedido.findOneAndUpdate({_id: id}, input, { new: true });
            return resultado;
        },
        eliminarPedido: async (_, { id }, ctx) => {
            // Verificar si el pedido existe o no
            const pedido = await Pedido.findById(id);
            if(!pedido) {
                throw new Error('El pedido no existe');
            }

            // Verificar si el vendedor es quien lo borra
            if(pedido.vendedor.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales');
            }

            await Pedido.findOneAndDelete({_id: id});
            return "Pedido Eliminado";
        }
    }
}

module.exports = resolvers;