import {transporter,mailOptions} from "../../../config/nodemailer";
const usuarioController = require('../backend/Controllers/usuarioController');
const HTML = `
        <html>
            <h1>Prezado,</b></h1>
            <h1>Sua solicitação de alteração de senha foi realizada com sucesso</b></h1>
            <h1>Sua nova senha é:
    `;
const HTML2 = `</b></h1>
        <h1>Caso não tenha solicitado essa alteração, por favor, contate a equipe de TI o mais breve possível.</b></h1>
        </html>`;


export default async function post(req,res,next){
    const senha = gerarSenha(8);
    const email = req.body.email;

    let erro = await usuarioController.recuperarSenha(email,senha)

    if(erro === ''){
        transporter.sendMail({
            ...mailOptions,
            "to":email,
            "subject":"Senha resetada",
            "html": HTML + senha + HTML2
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