const jsonwebtoken = require("jsonwebtoken");

export default async function handler(req, res) {
    const TOKEN = req.headers.token;
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (TOKEN !== '') {
        try {
            jsonwebtoken.verify(TOKEN, SECRET_KEY);
            return false;
        } catch (e) {
            if (e.name === 'TokenExpiredError') {
                return res.status(401).json("Token expirado");
            } else {
                return res.status(401).json("Erro de assinatura");
            }
        }
    } else {
        return res.status(401).json("Token vazio");
    }
}