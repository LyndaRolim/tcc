const mongoose = require('../Database');

const CandidatoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    status: {
        type: Boolean,
        required: false,
        default: true,
    },
    formacao: {
        type: String,
    },
    curriculo: {
        type: String,
    },
    telefone: {
        type: String,
    },
    obs: {
        type: String,
    },
    cep: {
        type: String,
    },
    endereco: {
        type: String,
    },
    cpf:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Candidato = mongoose.models.candidato || mongoose.model('candidato',CandidatoSchema);

module.exports = Candidato;
