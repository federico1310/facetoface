const mongoose = require('mongoose');

const ReservasSchema = mongoose.Schema({
	anuncio: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Anuncio'
	},
	usuario: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Usuario'
	},
	startDate: {
		type: Date,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	},
	totalPrice: {
		type: Number,
		required: true
	},
	status: {
		type: String,
		required: true,
		trim: true
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

module.exports = mongoose.model('Reserva', ReservasSchema)