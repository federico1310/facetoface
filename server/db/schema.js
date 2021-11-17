const { gql } = require('apollo-server');

// Schema
const typeDefs = gql`
	type Usuario {
		id: ID
		name: String
		last_name: String
		email: String
		gender: String
		birthday: String
		registered_at: String
	}

	type Token {
		token: String
	}

	type Tipo {
		id: ID
		label: String
	}

	type GrupoTipo {
		id: ID
		label: String
	}

	type PrivacidadTipo {
		id: ID
		label: String
	}

	type Anuncio {
		id: ID
		title: String
		description: String
		type_groups: ID
		types: ID
		privacy_types: ID
		street: String
		dpto: String
		city: String
		state: String
		zip_code: String
		country: String
		guests: Int
		bedrooms: Int
		beds: Int
		toilets: Int
		offices: Int
		per: String
		price: Float
		estado: EstadoAnuncio
		owner: ID
		created_at: String
		modified_at: String
	}

	type Reserva {
		id: ID
		anuncio: ID
		usuario: ID
		startDate: String
		endDate: String
		totalPrice: Float
		status: EstadoReserva
		created_at: String
	}

	enum EstadoReserva {
		TO_CONFIRM
		CANCELLED
		CONFIRMED
	}

	enum EstadoAnuncio {
		RESERVED
		CANCELLED
		AVAILABLE
	}

	type Cliente {
		id: ID
		nombre: String
		apellido: String
		empresa: String
		email: String
		telefono: String
		creado: String
		vendedor: ID
	}

	type Pedido {
		id: ID
		pedido: [PedidoGrupo]
		total: Float
		cliente: ID
		vendedor: ID
		fecha: String
		estado: EstadoPedido
	}

	type PedidoGrupo {
		id: ID
		cantidad: Int
	}

	type TopCliente {
		total: Float
		cliente: [Cliente]
	}

	type TopVendedor {
		total: Float
		vendedor: [Usuario]
	}

	input UsuarioInput {
		name: String!
		last_name: String!
		email: String!
		password: String!
		gender: String!
		birthday: String!
	}

	input AutenticarInput {
		email: String!
		password: String!
	}

	input ListadoAnunciosInput {
		city: String
		guests: Int
		startDate: String
		endDate: String
	}
	input AnuncioInput {
		title: String
		description: String
		type_groups: ID
		types: ID
		privacy_types: ID
		street: String
		dpto: String
		city: String
		state: String
		zip_code: String
		country: String
		guests: Int
		bedrooms: Int
		beds: Int
		toilets: Int
		offices: Int
		per: String
		price: Float
	}

	input ReservaInput {
		anuncio:ID
		status: EstadoReserva
		startDate: String
		endDate: String
		totalPrice: Float
	}

	input PrivacidadInput {
		label: String!
	}

	input GrupoInput {
		label: String!
	}

	input TipoInput {
		label: String!
	}

	input ClienteInput {
		nombre: String!
		apellido: String!
		empresa: String!
		email: String!
		telefono: String
	}

	input PedidoProductoInput {
		id: ID
		cantidad: Int
	}

	input PedidoInput {
		pedido: [PedidoProductoInput]
		total: Float
		cliente: ID
		estado: EstadoPedido
	}

	enum EstadoPedido {
		PENDIENTE
		COMPLETADO
		CANCELADO
	}


	type Query {
		# Usuarios
		obtenerUsuario(token: String!) : Usuario

		# Anuncios
		obtenerAnuncios : [Anuncio]
		obtenerListadoAnuncios(input: ListadoAnunciosInput) : [Anuncio]

		# Clientes
		obtenerClientes : [Cliente]
		obtenerClientesVendedor : [Cliente]
		obtenerCliente(id : ID!): Cliente

		# Pedidos
		obtenerPedidos : [Pedido]
		obtenerPedidosVendedor : [Pedido]
		obtenerPedido(id: ID!) : Pedido
		obtenerPedidoEstado(estado: String!): [Pedido]

		# Busquedas Avanzadas
		mejoresClientes: [TopCliente]
		mejoresVendedores: [TopVendedor]
	}

	type Mutation {
		# Usuarios
		nuevoUsuario(input: UsuarioInput) : Usuario
		autenticarUsuario(input: AutenticarInput) : Token

		# Anuncios
		nuevoAnuncio(input: AnuncioInput) : Anuncio
		nuevoTipo(input: TipoInput) : Tipo
		nuevoGrupoTipo(input: GrupoInput) : GrupoTipo
		nuevoPrivacidadTipo(input: PrivacidadInput) : PrivacidadTipo

		#Reservas
		nuevaReserva(input: ReservaInput) : Reserva

		# Clientes
		nuevoCliente(input: ClienteInput) : Cliente
		actualizarCliente(id: ID!, input: ClienteInput) : Cliente
		eliminarCliente(id: ID!) : String

		# Pedidos
		nuevoPedido(input: PedidoInput) : Pedido
		actualizarPedido(id: ID!, input: PedidoInput) : Pedido
		eliminarPedido(id: ID!) : String
	}
`;

module.exports = typeDefs;