const usuarioController = require('../backend/Controllers/usuarioController');

export default function handler(req, res) {
    const method = req.method;
    if(method === 'GET'){
        return usuarioController.getAll(req, res);
    }else if(method === 'POST'){
        return usuarioController.post(req, res);
    }else{
        return res.status(404).json({message: "Unknow route." });
    }
}
