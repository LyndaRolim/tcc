const candidatoController = require('../backend/Controllers/candidatoController');

export default function handler(req, res) {
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
