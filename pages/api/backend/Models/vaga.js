const mongoose = require('../Database');

const VagaSchema = new mongoose.Schema({
    empresa: {
        type: {},
        required: true,
    },
    cargo: {
        type:String,
    },
    salario: {
        type: Number,
    },
    valor_vaga: {
        type: Number,
    },
    data_limite: {
        type: Date,
    },
    qtd: {
        type: Number,
    },
    candidatos: [],
    status: {
        type: Boolean,
        required: false,
        default: true,
    },
    obs: {
        type:String,
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

const Vaga = mongoose.models.vaga || mongoose.model('vaga',VagaSchema);

module.exports = Vaga;