const empresaController = require('../backend/Controllers/empresaController');
const verifyMiddleware = require('../auth/verifyMiddleware');

export default function handler(req, res) {
    verifyMiddleware.default(req, res);
    const method = req.method;
    if(method === 'GET'){
        return empresaController.get(req, res);
    }else if(method === 'POST'){
        return empresaController.post(req, res);
    }else{
        return res.status(404).json({message: "Unknow route." });
    }
}
