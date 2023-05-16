import {transporter,mailOptions} from "../../../config/nodemailer";
const HTML = `
    <html>
    <h1>Prezado, seja bem vindo!</b></h1>
    <text>Seu e-mail foi cadastrado com sucesso no sistema da EmpresaX. Agora você poderá ter acesso as funcionalidades do site.</b></text>
    <text>Para acessar basta entrar com seu e-mail e a senha temporária gerada abaixo:</b></text>
    <h1>Sua senha temporária é:
`;
const HTML2 = `</b></h1>
<h1>Caso desconheça as informações acima, por favor, contate a equipe de TI o mais breve possível através do telefone (22) 9 9226-2716.</b></h1>
</html>`;

export default function get(req,res,next){
    transporter.sendMail({
        ...mailOptions,
        "to":req.body.email,
        "subject":"Senha padrão",
        "html":HTML + req.body.senha + HTML2
    });



    res.status(200).json();
};