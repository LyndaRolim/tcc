const homeController = require('../backend/Controllers/homeController');

export default function handler(req, res) {
    const method = req.method;
    if(method === 'GET'){
        return homeController.get(req, res);
    }else{
        return res.status(404).json({message: "Unknow route." });
    }
}
