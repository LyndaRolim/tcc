import { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../config/http';
import { useRouter } from 'next/router';
import { UserContext } from '../../Contexts/UserContext/UserContext';

const CadastroEmpresas = () => {
    const navigate = useRouter().push;
    const [nome, setNome] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [obs, setObs] = useState("");
    const { validaAcesso } = useContext(UserContext);

    useEffect(() => {
        Salvar(); 
        validaAcesso(["Diretoria", "Coordenador", "Assistente"]);
    },[])
    
    function Salvar(){
        if(temErro() !== ""){
            toast(temErro(), {
                type: 'error'
            });
        }else{
            toast.promise(
                axios.post("/api/empresa",{
                    nome: nome,
                    cnpj: cnpj,
                    email: email,
                    telefone: telefone,
                    obs: obs
                })
            ,{
                pending: "Enviado informações.",
                error: "Não foi possível salvar a empresa",
                success: "Empresa salva."
            })
            .then(()=>setTimeout(()=>{
                navigate("/empresas")
            },500));
        }
    }

    function buscaCnpj(){
        const URL = "https://publica.cnpj.ws/cnpj/";
        toast.promise(
            axios.get(URL+cnpj.replace(".","").replace("/","").replace("-",""))
            .then(r=>r.data)
            .then(data=>{
                setNome(data.razao_social);
                setEmail(data.estabelecimento.email);
                setTelefone("(" + data.estabelecimento.ddd1 + ") " + data.estabelecimento.telefone1);
            })
        ,
            {
                pending: "Enviando dados...",
                error: "Erro ao buscar CNPJ",
                success: "Busca do CNPJ feita com sucesso."
            }
        )

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

    return (
        <div className="box mt-4">
            <ToastContainer />
            <div className='box-header'>
                Cadastrar Empresa
            </div>
            <div className='box-body'>
                <div className='col-12'>
                    <label>CNPJ</label>
                    <input onBlur={()=>{buscaCnpj()}} value={cnpj} onChange={e=>{setCnpj(e.target.value)}} type='text' />
                </div>

                <div className='col-12 pt-3'>
                    <label>Nome</label>
                    <input value={nome} onChange={(e)=>{setNome(e.target.value)}} type="text" />
                </div>
                <div className='col-6 pt-3'>
                    <label>Email</label>
                    <input value={email} onChange={e=>{setEmail(e.target.value)}} type='email' />
                </div>

                <div className='col pt-3'>
                    <label>Telefone</label>
                    <input value={telefone} onChange={e=>{setTelefone(e.target.value)}} type='tel' />
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

export default CadastroEmpresas;
