const usuarioController = require('../backend/Controllers/usuarioController');

export default function handler(req, res) {
    const method = req.method;
    if(method === 'POST'){
        return usuarioController.login(req, res);
    }else{
        return res.status(404).json({message: "Unknow route." });
    }
}
