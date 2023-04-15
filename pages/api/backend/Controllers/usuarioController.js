const Usuario = require("../Models/usuario");
const md5 = require("md5");
const jsonwebtoken = require("jsonwebtoken");

exports.login = async (req,res) => {
    try{
        const usuario = await Usuario.findOne({
            email: req.body.email,
            senha: md5(req.body.senha)
        });
        if(usuario){
            if (usuario.status){
                const data = {
                    data: usuario,
                    exp: Math.floor(Date.now() / 1000) + (60*5),
                    iat: Math.floor(Date.now() / 1000)
                }
                const token = jsonwebtoken.sign(data,process.env.JWT_SECRET_KEY);
                return res.status(200).send(token);
            }else{
                return res.status(400).send({erro: "Usuário inativo."});
            }
        }else{
            return res.status(400).send({erro: "Usuário não encontrado ou senha inválida."});
        }
    }catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.post = async (req,res) => {
    try {
        const senha = gerarSenha(8)
        req.body.senha=md5(senha);
        const usuario = await Usuario.create(req.body);
        return res.status(200).json( senha );
    }catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.get = async (req, res) => {
    try {
        var usuarios;
        if(req.query.id){
            usuarios = await Usuario.findOne({"_id":req.query.id})
        }else{
            usuarios = await Usuario.find({status:true});
        }
        return res.status(200).send({usuarios});
    }catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.getAll = async (req, res) => {
    try {        
        const usuarios = await Usuario.find();
        return res.status(200).send({usuarios});
    }catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.put = async (req, res) => {
    try {
        let usuario = await Usuario.findOne({ "_id": req.query.id });
        if(req.body.senha !== usuario.senha){
            req.body.senha = md5(req.body.senha);
        }
        await Usuario.findByIdAndUpdate(req.query.id, req.body);
        usuario = await Usuario.findOne({ "_id": req.query.id });
        return res.status(200).send( usuario );
    } catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.delete = async (req,res) => {
    try {
        let usuario = await Usuario.findOne({"_id":req.query.id})
        usuario.status = !usuario.status;
        await Usuario.findByIdAndUpdate(req.query.id, { status: usuario.status });
        return res.status(200).send({ usuario });
    } catch(err){
        return res.status(400).send({erro: ''+err });
    }
}


function gerarSenha(tamanho) {
    var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var senha = "";
    for (var i = 0; i < tamanho; i++) {
      senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return senha;
  }