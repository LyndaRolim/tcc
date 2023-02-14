const vagaController = require('../backend/Controllers/vagaController');

export default function handler(req, res) {
    const method = req.method;
    if(method === 'GET'){
        return vagaController.get(req, res);
    }else if(method === 'DELETE'){
        return vagaController.updateStatus(req, res);
    }else if(method === 'PUT'){
        return vagaController.put(req, res);
    }else{
        return res.status(404).json({message: "Unknow route." });
    }
}
