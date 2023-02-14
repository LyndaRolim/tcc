const Candidato = require("../Models/candidato");
const Vaga = require("../Models/vaga");

exports.post = async (req, res) => {
    try{
        const vaga = await Vaga.create(req.body);
        return res.status(200).send({ vaga });
    }catch(erro){
        return res.status(200).send({ erro });
    }
}

exports.get = async (req, res) => {
    try{
        const vaga_id = req.query.id;
        var vagas;
        if(vaga_id){
            vagas = await Vaga.findOne({"_id": vaga_id});
        }else{
            vagas = await Vaga.find();
        }
        return res.status(200).send({ vagas });
    }catch(erro){
        return res.status(200).send({ erro });
    }
}

exports.getVagaEmpresa = async (req,res) => {
    try{
        const empresa_id = req.query.id;
        const vagas = await Vaga.findOne({
            empresa_id: empresa_id,
            status: true
        });
        return res.status(200).send({ vagas });
    }catch(erro){
        return res.status(200).send({ erro });
    }
}

exports.getVagasExterno = async (req, res) => {
    try {
        let vagasAux = null;

        if(req.query.id){
            vagasAux = await Vaga.find({
                status: true,
                _id: req.query.id
            }); 
        }else{
            vagasAux = await Vaga.find({
                status: true
            });
        }
        
        const vagas = vagasAux;
        
        let vagasExterno = [];
        let aux_vaga;
        for(i=0; i < vagas.length; i++){
            aux_vaga = {
                _id: vagas[i]._id,
                cargo: vagas[i].cargo,
                qtd: vagas[i].qtd,
                salario: vagas[i].salario,
                qtd_candidatos: vagas[i].candidatos.length,
                descricao: vagas[i].obs,
            }
            vagasExterno.push(aux_vaga);
        }
        return res.status(200).send({vagas:vagasExterno});
    }catch(erro){
        return res.status(200).send({ erro });
    }
}

exports.candidatoDentroVaga = async (req, res) => {
    try {
        const candidato_id = req.body.candidato_id;
        const vaga_id = req.body.vaga_id;
        const vaga = await Vaga.findOne({
            _id: vaga_id
        });
        let usuario_inserido = false;
        for(i=0;i<vaga.candidatos.length;i++){
            if(candidato_id == vaga.candidatos[i]._id){
                usuario_inserido = true;
            }
        }
        if(usuario_inserido){
            return res.status(400).send({ usuario_inserido });
        }else{
            return res.status(200).send({ usuario_inserido });
        }
    }catch(erro){
        return res.status(400).send({ erro });
    }
}

exports.insereCandidatoExterno = async (req, res) => {
    try {
        const body = req.body;
        const vaga_id = body.vaga_id;
        const vaga = await Vaga.findById(vaga_id);
        let candidato_inserido = false;
        const candidato_id = body.candidato_id;
        const candidato = {
            nome: body.nome,
            formacao: body.formacao,
            email: body.email,
            cep: body.cep,
            endereco: body.endereco,
            telefone: body.telefone,
            obs: body.obs,
            curriculo: body.curriculo,
            cpf: body.cpf,
        }

        for(i=0;i<vaga.candidatos.length;i++){
            if(vaga.candidatos[i] == null){
                vaga.candidatos.pop(vaga.candidatos[i]);
            }
        }
        await Vaga.findByIdAndUpdate(vaga_id,vaga);

        for(i=0;i<vaga.candidatos.length;i++){
            if(candidato_id == vaga.candidatos[i]._id){
                candidato_inserido = true;
            }
        }

        if(candidato_id){
            if(candidato_inserido){
                const candidato_antigo = await Candidato.findById(candidato_id);
                vaga.candidatos.pop(candidato_antigo);
                const candidato_atualizado = await Candidato.findByIdAndUpdate(candidato_id,candidato);
                vaga.candidatos.push(candidato_atualizado);
                await Vaga.findByIdAndUpdate(vaga_id,vaga);
                return res.status(200).send({ callback: "Candidato existente atualizado na vaga." });
            }else{
                const candidato_atualizado = await Candidato.findByIdAndUpdate(candidato_id,candidato);
                vaga.candidatos.push(candidato_atualizado);
                await Vaga.findByIdAndUpdate(vaga_id,vaga);
                return res.status(200).send({ callback: "Candidato existente inserido na vaga." });
            }
        }else{
            const candidato_novo = await Candidato.create(candidato);
            vaga.candidatos.push(candidato_novo);
            await Vaga.findByIdAndUpdate(vaga_id,vaga);
            return res.status(200).send({ callback: "Novo candidato inserido na vaga." });
        }
    }catch(erro){
        return res.status(400).send({ erro });
    }
} 

exports.put = async(req,res) => {
    try{
        let vaga = await Vaga.findOne({ "_id": req.query.id });
        await Vaga.findByIdAndUpdate(req.query.id, req.body);
        vaga = await Vaga.findOne({ "_id": req.query.id });
        return res.status(200).send({ vaga });
    }catch(erro){
        return res.status(200).send({ erro });
    }
}

exports.updateStatus = async (req,res) =>{
    try {
        let vaga = await Vaga.findOne({"_id":req.query.id})
        vaga.status = !vaga.status;
        await Vaga.findByIdAndUpdate(req.query.id, { status: vaga.status });
        return res.status(200).send({ vaga });
    } catch(err){
        return res.status(400).send({erro: ''+err });
    }
}