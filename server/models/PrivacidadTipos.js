const mongoose = require('mongoose');

const PrivacidadTiposSchema = mongoose.Schema({
	label: {
		type: String,
		required: true,
		trim: true
	}
});

module.exports = mongoose.model('PrivacidadTipo', PrivacidadTiposSchema)