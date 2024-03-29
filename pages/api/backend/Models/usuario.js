const mongoose = require('../Database');

const UsuarioSchema = new mongoose.Schema({
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
    senha: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: false,
        default: true,
    },
    refreshToken: {
        type: String,
        required: false,
    },
    trocar_senha: {
        type: Boolean,
    },
    acesso:{
        type: String,
        required: false,
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

const Usuario =  mongoose.models.usuario || mongoose.model('usuario',UsuarioSchema);

module.exports = Usuario;