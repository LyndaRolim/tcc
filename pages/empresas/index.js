import { FaArrowUp, FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../config/http';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../Contexts/UserContext/UserContext';

const Empresas = () => {
    const navigate = useRouter().push;
    const [empresas, setEmpresas] = useState([]);
    const [busca, setBusca] = useState("");
    const buscaLower = busca?.toLowerCase();
    const empresasFiltrados = empresas.filter((empresa) => empresa.nome?.toLowerCase().includes(buscaLower) || empresa.email?.toLowerCase().includes(buscaLower));
    const { validaAcesso } = useContext(UserContext);

    useEffect(() => {
        preencherLista();
        validaAcesso(["Diretoria", "Coordenador", "Assistente"]);
    },[])

    async function preencherLista(){
        const response = await axios.get("/api/empresa");
        const data = response.data;
        setEmpresas(data.empresas);
    }

    function alterarStatus(id,status){
        let acao = "";
        if(status){
            acao = "inativado";
        }else{
            acao = "ativado";
        }
        toast.promise(
            axios.delete("/api/empresa/"+id)
        ,{
            error: 'Não foi possível atualizar a empresa',
            pending: 'Enviando dados...',
            success: 'Empresa '+acao+' com sucesso.'
        })
        .then(()=>{
            preencherLista();
        })
    }

    function listaEmpresas(){
        return(
            <div className="col-12 mt-3 overflow-auto">
                <div className="d-flex">
                    <div className='col'>Nome</div>
                    <div className='col'>Email</div>
                    <div className='col-2'>Status</div>
                    <div className='col-2 text-center'>Opções</div>
                </div>
                <ul className='list-group '>
                    {empresasFiltrados && empresasFiltrados.map(empresa => {
                        return (                            
                            <li className='list-group-item d-flex flex-wrap' key={empresa._id}>
                                <div className="col align-self-center">{empresa.nome}</div>
                                <div className="col align-self-center">{empresa.email}</div>
                                <div className="col-2 align-self-center">{empresa.status?"Ativo":"Inativo"}</div>
                                <div className='col-2 d-flex text-end'>
                                    <div className="col">
                                        <button onClick={() => {alterarStatus(empresa._id, empresa.status)}} className='btn'>
                                            {empresa.status?
                                                <FaTrash  />
                                            :
                                                <FaArrowUp /> 
                                            }
                                        </button>
                                    </div>
                                    <div className="col"><button className='btn' onClick={()=>{navigate("/empresa_form/"+empresa._id)}}><FaEdit  /></button></div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }

    return (
        <div className='col-12'>
            <ToastContainer />
            <div className='col-12 mt-3 text-end'>
                <button className='btn btn-primary' onClick={()=>{navigate("/empresa_form")}}>Cadastrar</button>
            </div>
            <div className='box mt-3'>
                <div className='box-header'>
                    Listagem de Empresas
                </div>
                <div className='box-body'>
                    <div className='col'>Quantidade {empresasFiltrados.length}</div>
                    <div className='col-4'>
                        <input type='text' placeholder='Pesquisar' value={busca} onChange={e=>{setBusca(e.target.value)}} />
                    </div>

                    { listaEmpresas() }
                </div>
            </div>
        </div>
    );
}

export default Empresas;
