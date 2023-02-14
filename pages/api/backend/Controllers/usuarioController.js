const Usuario = require("../Models/usuario");
const md5 = require("md5");

exports.login = async (req,res) => {
    try{
        const usuario = await Usuario.findOne({
            email: req.body.email,
            senha: md5(req.body.senha)
        });
        if(usuario){
            return res.status(200).send(usuario);
        }else{
            return res.status(400).send({erro: "Usuário não encontrado."});
        }
    }catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.post = async (req,res) => {
    try {
        req.body.senha=md5(req.body.senha);
        const usuario = await Usuario.create(req.body);
        return res.status(200).send({ usuario });
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