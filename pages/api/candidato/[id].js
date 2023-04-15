const candidatoController = require('../backend/Controllers/candidatoController');
const verifyMiddleware = require('../auth/verifyMiddleware');

export default function handler(req, res) {
    verifyMiddleware.default(req, res);
    
    const method = req.method;
    if(method === 'GET'){
        return candidatoController.get(req, res);
    }else if(method === 'DELETE'){
        return candidatoController.updateStatus(req, res);
    }else if(method === 'PUT'){
        return candidatoController.put(req, res);
    }else{
        return res.status(404).json({message: "Unknow route." });
    }
}
