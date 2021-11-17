const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	last_name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	gender: {
		type: String,
		required: true,
		trim: true
	},
	birthday: {
		type: Date,
		required: true
	},
	registered_at: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Usuario', UsuariosSchema)