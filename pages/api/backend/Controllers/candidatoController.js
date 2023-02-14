const Candidato = require("../Models/candidato");

exports.post = async (req, res) => {
    try{
        const candidato = await Candidato.create(req.body);
        return res.status(200).send({ candidato });
    }catch(erro){
        return res.status(200).send({ erro });
    }
}

exports.get = async (req, res) => {
    try{
        const candidato_id = req.query.id;
        var candidatos;
        var retorno = [];

        if(candidato_id){
            candidatos = await Candidato.findOne({"_id": candidato_id});
        }else{
            candidatos = await Candidato.find();
            candidatos.map(candidato=>{
                var aux = {
                    nome: candidato.nome,
                    _id: candidato._id,
                    email: candidato.email,
                    formacao: candidato.formacao,
                    telefone: candidato.telefone,
                    endereco: candidato.endereco,
                    status: candidato.status
                }
                retorno.push(aux);
            });
            candidatos = retorno;
        }
        return res.status(200).send({ candidatos });
    }catch(erro){
        return res.status(200).send({ erro });
    }
}

exports.getByCpf = async (req, res) => {
    try{
        const candidato = await Candidato.findOne({cpf: req.query.cpf});
        if(candidato){
            return res.status(200).send(candidato);
        }else{
            return res.status(400).send({erro: "CPF não encontrado."});
        }
    }catch(erro){
        return res.status(400).send(erro);
    }
}

exports.put = async(req,res) => {
    try{
        let candidato = await Candidato.findOne({ "_id": req.query.id });
        await Candidato.findByIdAndUpdate(req.query.id, req.body);
        candidato = await Candidato.findOne({ "_id": req.query.id });
        return res.status(200).send({ candidato });
    }catch(erro){
        return res.status(200).send({ erro });
    }
}

exports.updateStatus = async (req,res) =>{
    try {
        let candidato = await Candidato.findOne({"_id":req.query.id})
        candidato.status = !candidato.status;
        await Candidato.findByIdAndUpdate(req.query.id, { status: candidato.status });
        return res.status(200).send({ candidato });
    } catch(err){
        return res.status(400).send({erro: ''+err });
    }
}