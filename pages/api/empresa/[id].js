const empresaController = require('../backend/Controllers/empresaController');

export default function handler(req, res) {
    const method = req.method;
    if(method === 'GET'){
        return empresaController.get(req, res);
    }else if(method === 'DELETE'){
        return empresaController.updateStatus(req, res);
    }else if(method === 'PUT'){
        return empresaController.put(req, res);
    }else{
        return res.status(404).json({message: "Unknow route." });
    }
}
