const Empresa = require("../Models/empresa");

exports.post = async (req, res) => {
    try{
        const empresa = await Empresa.create(req.body);
        return res.status(200).send({ empresa });
    }catch(erro){
        return res.status(200).send({ erro });
    }
}

exports.get = async (req, res) => {
    try{
        const empresa_id = req.query.id;
        var empresas;
        if(empresa_id){
            empresas = await Empresa.findOne({"_id": empresa_id});
        }else{
            empresas = await Empresa.find();
        }
        return res.status(200).send({ empresas });
    }catch(erro){
        return res.status(200).send({ erro });
    }
}

exports.getActive = async (req, res) => {
    try{
        const empresas = await Empresa.find({status: true});
        return res.status(200).send({ empresas });
    }catch(erro){
        return res.status(200).send({ erro });
    }
}

exports.put = async(req,res) => {
    try{
        let empresa = await Empresa.findOne({ "_id": req.query.id });
        await Empresa.findByIdAndUpdate(req.query.id, req.body);
        empresa = await Empresa.findOne({ "_id": req.query.id });
        return res.status(200).send({ empresa });
    }catch(erro){
        return res.status(200).send({ erro });
    }
}

exports.updateStatus = async (req,res) =>{
    try {
        let empresa = await Empresa.findOne({"_id":req.query.id})
        empresa.status = !empresa.status;
        await Empresa.findByIdAndUpdate(req.query.id, { status: empresa.status });
        return res.status(200).send({ empresa });
    } catch(err){
        return res.status(400).send({erro: ''+err });
    }
}