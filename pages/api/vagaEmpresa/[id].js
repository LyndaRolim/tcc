const vagaController = require('../backend/Controllers/vagaController');

export default function handler(req, res) {
    const method = req.method;
    if(method === 'GET'){
        return vagaController.getVagaEmpresa(req, res);
    }else{
        return res.status(404).json({message: "Unknow route." });
    }
}
