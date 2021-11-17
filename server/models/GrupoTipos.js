const mongoose = require('mongoose');

const GrupoTiposSchema = mongoose.Schema({
	label: {
		type: String,
		required: true,
		trim: true
	}
});

module.exports = mongoose.model('GrupoTipo', GrupoTiposSchema)