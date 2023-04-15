const jsonwebtoken = require("jsonwebtoken");

export default async function handler(req, res) {
    const TOKEN = req.body.token;
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    const tokenDecoded = jsonwebtoken.decode(TOKEN, SECRET_KEY);
    const user = tokenDecoded.data;
    return res.send(user);
}