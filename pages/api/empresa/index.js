const empresaController = require('../backend/Controllers/empresaController');

export default function handler(req, res) {
    const method = req.method;
    if(method === 'GET'){
        return empresaController.get(req, res);
    }else if(method === 'POST'){
        return empresaController.post(req, res);
    }else{
        return res.status(404).json({message: "Unknow route." });
    }
}
