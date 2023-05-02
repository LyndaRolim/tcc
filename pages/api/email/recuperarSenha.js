import {transporter,mailOptions} from "../../../config/nodemailer";
const usuarioController = require('../backend/Controllers/usuarioController');

export default async function post(req,res,next){
    const senha = gerarSenha(8);
    const email = req.body.email;
    
    let erro = await usuarioController.recuperarSenha(email,senha)

    if(erro === ''){
        transporter.sendMail({
            ...mailOptions,
            "to":email,
            "subject":"Senha resetada",
            "text":'Senha: '+ senha
        });
    }

    res.status(200).json(erro);
};

function gerarSenha(tamanho) {
    var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var senha = "";
    for (var i = 0; i < tamanho; i++) {
      senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return senha;
  }