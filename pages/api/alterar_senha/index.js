const usuarioController = require('../backend/Controllers/usuarioController');

export default async function handler(req, res) {
    await usuarioController.alterarSenha(req.body.email, req.body.senha);
    return res.status(200).send()
}
