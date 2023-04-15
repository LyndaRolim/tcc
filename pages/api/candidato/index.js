const candidatoController = require('../backend/Controllers/candidatoController');
const verifyMiddleware = require('../auth/verifyMiddleware');

export default function handler(req, res) {
    verifyMiddleware.default(req, res);
    const method = req.method;
    if(method === 'GET'){
        return candidatoController.get(req, res);
    }else if(method === 'POST'){
        return candidatoController.post(req, res);
    }else{
        return res.status(404).json({message: "Unknow route." });
    }
}
