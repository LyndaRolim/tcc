const verifyMiddleware = require('./auth/verifyMiddleware');

export default function get(req,res,next){
    verifyMiddleware.default(req, res);
    res.status(200).json({
        title: "Rota de API"
    });
};