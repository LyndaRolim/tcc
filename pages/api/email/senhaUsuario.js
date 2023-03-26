import {transporter,mailOptions} from "../../../config/nodemailer";

export default function get(req,res,next){
    transporter.sendMail({
        ...mailOptions,
        "to":req.body.email,
        "subject":"Senha padrão",
        "text":req.body.senha
    });



    res.status(200).json();
};