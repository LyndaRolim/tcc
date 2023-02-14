const candidatoController = require('../backend/Controllers/candidatoController');

export default function handler(req, res) {
    const method = req.method;
    if(method === 'GET'){
        return candidatoController.getByCpf(req, res);
    }else{
        return res.status(404).json({message: "Unknow route." });
    }
}
