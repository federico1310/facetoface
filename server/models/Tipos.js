const mongoose = require('mongoose');

const TiposSchema = mongoose.Schema({
	label: {
		type: String,
		required: true,
		trim: true
	}
});

module.exports = mongoose.model('Tipo', TiposSchema)