const vagaController = require('../backend/Controllers/vagaController');

export default function handler(req, res) {
    const method = req.method;
    if(method === 'GET'){
        return vagaController.get(req, res);
    }else if(method === 'POST'){
        return vagaController.post(req, res);
    }else{
        return res.status(404).json({message: "Unknow route." });
    }
}
