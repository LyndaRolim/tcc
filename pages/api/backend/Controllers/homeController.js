const Candidato = require("../Models/candidato");
const Empresa = require("../Models/empresa");
const Vaga = require("../Models/vaga");

exports.get = async (req, res) => {
    try{
        const menu = {
            candidatos: {
                ativo: 0,
                inativo: 0
            },
            vagas: {
                ativo: 0,
                inativo: 0
            },
            empresas: {
                ativo: 0,
                inativo: 0
            },
            valorTotal: 0
        }
        const vagas = await Vaga.find();
        const candidatos = await Candidato.find();
        const empresas = await Empresa.find();

        vagas.map(vaga => {
            if(vaga.status){
                menu.vagas.ativo++;
            }else{
                menu.vagas.inativo++;
            }
            menu.valorTotal += vaga.valor_vaga*vaga.qtd;
        });

        candidatos.map(candidato => {
            if(candidato.status){
                menu.candidatos.ativo++;
            }else{
                menu.candidatos.inativo++;
            }
        });

        empresas.map(empresa => {
            if(empresa.status){
                menu.empresas.ativo++;
            }else{
                menu.empresas.inativo++;
            }
        });

        return res.status(200).send(menu);
    }catch(erro){
        return res.status(500).send(erro);
    }
}