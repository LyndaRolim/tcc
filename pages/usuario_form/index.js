import { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../config/http';
import { useRouter } from 'next/router';
import { UserContext } from '../../Contexts/UserContext/UserContext';

const CadastroUsuario = () => {
    const navigate = useRouter().push;
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [acessoAtual, setAcessoAtual] = useState("");
    const acesso = ["Diretoria", "Coordenador", "Recrutador", "Assistente"];
    const { validaAcesso } = useContext(UserContext);

    useEffect(() => { 
        validaAcesso(["Diretoria", "Coordenador", "Assistente"]);
    },[])

    async function Salvar() {
        if (temErro() !== "") {
            toast(temErro(), {
                type: 'error'
            });
        } else {
            await toast.promise(
                axios.post("/api/usuario", {
                    nome: nome,
                    email: email,
                    acesso: acessoAtual
                }).then(r =>{
                    axios.post('/api/email/senhaUsuario',{
                        email: email,
                        senha: r.data
                    })
                })
                , {
                    pending: "Enviado informações.",
                    error: "Não foi possível salvar o usuário",
                    success: "Usuário salvo."
                })
                .then(() => setTimeout(() => {
                    
                    navigate("/usuarios")
                }, 500));
        }
    }

    function temErro() {
        var erro = "";

        if (nome === "") {
            erro = "Insira o nome. ";
        }
        if (acessoAtual === "") {
            erro = "Selecione o tipo de acesso. ";
        }
        if (email === "") {
            erro += "Informe o email. ";
        }
        return erro;
    }

    return (
        <div className="box mt-4">
            <ToastContainer />
            <div className='box-header'>
                Cadastrar Usuário
            </div>
            <div className='box-body'>
                <div className='col-6'>
                    <label>Nome</label>
                    <input value={nome} onChange={(e) => { setNome(e.target.value) }} type="text" />
                </div>
                <div className='col-6'>
                    <label>Email</label>
                    <input value={email} onChange={e => { setEmail(e.target.value) }} type='email' />
                </div>

                <div className='col pt-3'>
                    <label>Tipo de acesso</label>
                    <select className="form-control" onChange={e => { setAcessoAtual(e.target.value) }} value={acessoAtual}>
                        <option value="">Selecione</option>
                        {acesso.map(item => {
                            return (
                                <option value={item}>{item}</option>
                            )
                        })}
                    </select>
                </div>

            </div>
            <div className='box-footer'>
                <button className='btn btn-primary' onClick={Salvar}>Salvar</button>
            </div>
        </div>
    );
}

export default CadastroUsuario;
