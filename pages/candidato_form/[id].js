import { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Axios from '../../config/http';
import { useRouter } from 'next/router';
import { FaDownload } from 'react-icons/fa';
import { UserContext } from '../../Contexts/UserContext/UserContext';
import axios from 'axios';

const CadastroCandidatos = () => {
    const navigate = useRouter().push;
    const [nome, setNome] = useState("");
    const [formacao, setFormacao] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [obs, setObs] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [curriculo, setCurriculo] = useState([]);
    const [curriculoBase64, setCurriculoBase64] = useState("");
    const [cpf, setCpf] = useState("");
    const route = useRouter();
    const { id } = route.query;
    const { validaAcesso } = useContext(UserContext);

    useEffect(() => {
        carregaCandidato();
        validaAcesso(["Diretoria", "Coordenador", "Recrutador"]);
    },[])

    function carregaCandidato(){
        if(id){
            Axios.get("/api/candidato/"+id)
                .then(r => r.data)
                .then(data => data.candidatos)
                .then(candidato => {
                    setNome(candidato.nome);
                    setEmail(candidato.email);
                    setFormacao(candidato.formacao);
                    setTelefone(candidato.telefone);
                    setEndereco(candidato.endereco);
                    setCep(candidato.cep);
                    setCurriculoBase64(candidato.curriculo);
                    setObs(candidato.obs);
                    setCpf(candidato.cpf);
                });
        }
    }

    async function Salvar(){
        if(temErro() !== ""){
            toast(temErro(), {
                type: 'error'
            });
        }else{
            const to64 = file => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });

            let pdf_response="";
            if(curriculo.length > 0){
                pdf_response = await to64(curriculo[0]);
                setCurriculoBase64(pdf_response);
            }else{
                pdf_response = curriculoBase64;
            }

            if(id){
                toast.promise(
                    Axios.put("/api/candidato/"+id,{
                        id: id,
                        nome: nome,
                        formacao: formacao,
                        email: email,
                        cep: cep,
                        endereco: endereco,
                        telefone: telefone,
                        obs: obs,
                        curriculo: pdf_response,
                        cpf: cpf,
                    })
                ,{
                    pending: "Enviado informações.",
                    error: "Não foi possível salvar a candidato",
                    success: "Candidato salvo."
                })
                .then(()=>setTimeout(()=>{
                    navigate("/candidatos")
                },500));
            }
            
        }
    }

    function temErro(){
        var erro = "";

        if(nome === ""){
            erro = "Insira o nome. ";
        }
        if(email === ""){
            erro += "Informe o email. ";
        }
        if(telefone === ""){
            erro += "Informe o telefone. ";
        }
        return erro;
    }

    function downloadPDF(){
        const linkSource = curriculoBase64;
        const fileName = "Curriculo "+nome+".pdf";
        const downloadLink = document.createElement("a");

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    function buscaCep(){
        function urlCep(cep){
            return "https://viacep.com.br/ws/"+ cep.replace(".","").replace("-","") +"/json/"
        }

        toast.promise(
            axios.get(urlCep(cep))
            .then(r=>r.data)
            .then(data=>{
                setEndereco(
                    "Cidade: "+ data.localidade+"/"+data.uf
                    +" \nRua: "+ data.logradouro
                    +" \nNº: "
                    +" \nComplemento: "
                )
            })
        ,{
            pending: "Enviando dados...",
            error: "Erro ao buscar o CEP.",
            success: "Busca do CEP realizada com sucesso."
        }
        )
    }

    return (
        <div className="box mt-4">
            <ToastContainer />
            <div className='box-header'>
                Cadastrar Candidato
            </div>
            <div className='box-body'>
                <div className='col-6'>
                    <label>Nome</label>
                    <input value={nome} onChange={(e)=>{setNome(e.target.value)}} type="text" />
                </div>
                <div className='col-6'>
                    <label>Email</label>
                    <input value={email} onChange={e=>{setEmail(e.target.value)}} type='email' />
                </div>

                <div className='col-6 pt-3'>
                    <label>Formação</label>
                    <input value={formacao} onChange={e=>{setFormacao(e.target.value)}} type='text' />
                </div>
                <div className='col-3 pt-3'>
                    <label>Telefone</label>
                    <input value={telefone} onChange={e=>{setTelefone(e.target.value)}} type='tel' />
                </div>
                <div className='col-3 pt-3'>
                    <label>CPF</label>
                    <input value={cpf} onChange={e=>{setCpf(e.target.value.replace(/\./g,"").replace("-","").replace(" ",""))}} type='text' />
                </div>

                <div className='col-3 pt-3'>
                    <label>CEP</label>
                    <input onBlur={buscaCep} value={cep} onChange={e=>{setCep(e.target.value)}} type='text' />
                </div>
                <div className='col-9 pt-3'>
                    <label>Endereco</label>
                    <textarea className="form-control h-110px" value={endereco} onChange={e=>{setEndereco(e.target.value)}} type='text' >
                    </textarea>
                </div>
                

                <div className='col-11 pt-3'>
                    <label>Curriculo</label>
                    <input type="file" onChange={e=>{setCurriculo(e.target.files)}} className="form-control" accept="application/pdf"></input>
                </div>
                <div className='col-1 pt-3'>
                    {curriculoBase64 !== ""?
                    <button className="btn mt-3" id="curriculo_btn" onClick={downloadPDF}>
                        <FaDownload />
                    </button>
                    :
                    null
                    }
                </div>

                <div className='col-12 pt-3'>
                    <label>Observações</label>
                    <textarea value={obs} onChange={e=>{setObs(e.target.value)}} className="form-control">
                    </textarea>
                </div>
            </div>
            <div className='box-footer'>
                <button className='btn btn-primary' onClick={Salvar}>Salvar</button>
            </div>
        </div>
    );
}

export default CadastroCandidatos;
