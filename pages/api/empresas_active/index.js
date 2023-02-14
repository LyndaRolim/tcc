const empresaController = require('../backend/Controllers/empresaController');

export default function handler(req, res) {
    const method = req.method;
    if(method === 'GET'){
        return empresaController.getActive(req, res);
    }else{
        return res.status(404).json({message: "Unknow route." });
    }
}
