const usuarioDAO = require('../backend/Models/usuario');
const jsonwebtoken = require("jsonwebtoken");

export default async function handler(req, res) {
    const TOKEN = req.body.token;
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (TOKEN !== '') {
        try {
            jsonwebtoken.verify(TOKEN, SECRET_KEY);
            return res.json(TOKEN);
        } catch (e) {
            let token;

            if (e.name === 'TokenExpiredError') {
                token = jsonwebtoken.decode(TOKEN, SECRET_KEY);
                const userId = token.data._id;
                const usuario = await usuarioDAO.findById(userId);
                const data = {
                    data: usuario,
                    exp: Math.floor(Date.now() / 1000) + (60 * 5),
                    iat: Math.floor(Date.now() / 1000)
                }
                token = jsonwebtoken.sign(data, SECRET_KEY);
                return res.json(token);
            } else {
                return res.status(401).json("Erro de assinatura");
            }
        }
    } else {
        return res.status(401).json("Token vazio");
    }
}