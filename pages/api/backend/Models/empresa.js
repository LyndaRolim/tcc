const mongoose = require('../Database');

const EmpresaSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    cnpj: {
        type: String,
        require: false,
    },
    telefone: {
        type: String,
        require: false,
    },
    email: {
        type: String,
        require: false,
    },
    obs: {
        type:String,
        require: false,
    },
    status: {
        type: Boolean,
        default: true,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        require: false,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        require: false,
    },
});

const Empresa = mongoose.models.empresa || mongoose.model('empresa',EmpresaSchema);

module.exports = Empresa;