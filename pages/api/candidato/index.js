const candidatoController = require('../backend/Controllers/candidatoController');

export default function handler(req, res) {
    const method = req.method;
    if(method === 'GET'){
        return candidatoController.get(req, res);
    }else if(method === 'POST'){
        return candidatoController.post(req, res);
    }else{
        return res.status(404).json({message: "Unknow route." });
    }
}
