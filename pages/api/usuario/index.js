const usuarioController = require('../backend/Controllers/usuarioController');
const verifyMiddleware = require('../auth/verifyMiddleware');

export default function handler(req, res) {
    verifyMiddleware.default(req, res);
    const method = req.method;
    if(method === 'GET'){
        return usuarioController.getAll(req, res);
    }else if(method === 'POST'){
        return usuarioController.post(req, res);
    }else{
        return res.status(404).json({message: "Unknow route." });
    }
}
