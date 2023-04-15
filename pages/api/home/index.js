const homeController = require('../backend/Controllers/homeController');
const verifyMiddleware = require('../auth/verifyMiddleware');

export default function handler(req, res) {
    verifyMiddleware.default(req, res);
    const method = req.method;
    if(method === 'GET'){
        return homeController.get(req, res);
    }else{
        return res.status(404).json({message: "Unknow route." });
    }
}
