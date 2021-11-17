const mongoose = require('mongoose');

const AnunciosSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
	type_groups: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'GrupoTipo'
	},
	types: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Tipo'
	},
	privacy_types: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'PrivacidadTipo'
	},
	street: {
		type: String,
		required: true,
		trim: true
	},
	dpto: {
		type: String,
		trim: true
	},
	city: {
		type: String,
		required: true,
		trim: true
	},
	state: {
		type: String,
		trim: true
	},
	zip_code: {
		type: String,
		trim: true
	},
	country: {
		type: String,
		required: true
	},
	guests: {
		type: Number,
		required: true
	},
	bedrooms: {
		type: Number,
		required: true
	},
	beds: {
		type: Number,
		required: true
	},
	toilets: {
		type: Number,
		required: true
	},
	offices: {
		type: Number,
		default: 0
	},
	per: {
		type: String,
		required: true,
		trim: true
	},
	price: {
		type: Number,
		required: true
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Usuario'
	},
	created_at: {
		type: Date,
		default: Date.now()
	},
	modified_at: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Anuncio', AnunciosSchema)