import { FaArrowUp, FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../config/http';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '../../Components/Loading/Loading';
import { UserContext } from '../../Contexts/UserContext/UserContext';

const Candidatos = () => {
    const navigate = useRouter().push;
    const [candidatos, setCandidatos] = useState([]);
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(true);
    const buscaLower = busca?.toLowerCase();
    const candidatosFiltrados = candidatos.filter((candidato) => candidato.nome?.toLowerCase().includes(buscaLower) || candidato.email?.toLowerCase().includes(buscaLower) || candidato.formacao?.toLowerCase().includes(buscaLower));
    const { validaAcesso } = useContext(UserContext);


    useEffect(() => {
        preencherLista();
        validaAcesso(["Diretoria", "Coordenador", "Recrutador"]);
    },[])

    async function preencherLista(){
        const response = await axios.get("/api/candidato");
        const data = response.data;
        setCandidatos(data.candidatos);
        setLoading(false);
    }

    function alterarStatus(id,status){
        let acao = "";
        if(status){
            acao = "inativado";
        }else{
            acao = "ativado";
        }
        toast.promise(
            axios.delete("/api/candidato/"+id)
        ,{
            error: 'Não foi possível atualizar a candidato',
            pending: 'Enviando dados...',
            success: 'Candidato '+acao+' com sucesso.'
        })
        .then(()=>{
            preencherLista();
        })
    }

    function listaCandidatos(){
        return(
            <div className="col-12 mt-3">
                <div className="d-flex">
                    <div className='col'>Nome</div>
                    <div className='col'>Email</div>
                    <div className='col'>Formação</div>
                    <div className='col-2'>Status</div>
                    <div className='col-2 text-center'>Opções</div>
                </div>
                <ul className='list-group overflow-auto h-680px'>
                    {candidatosFiltrados && candidatosFiltrados.map(candidato => {
                        return (                            
                            <li className='list-group-item d-flex flex-wrap' key={candidato._id}>
                                <div className="col align-self-center">{candidato.nome}</div>
                                <div className="col align-self-center overflow-auto">{candidato.email}</div>
                                <div className="col align-self-center">{candidato.formacao}</div>
                                <div className="col-2 align-self-center">{candidato.status?"Ativo":"Inativo"}</div>
                                <div className='col-2 d-flex text-end align-self-center'>
                                    <div className="col ">
                                        <button onClick={() => {alterarStatus(candidato._id, candidato.status)}} className='btn'>
                                            {candidato.status?
                                                <FaTrash  />
                                            :
                                                <FaArrowUp /> 
                                            }
                                        </button>
                                    </div>
                                    <div className="col"><button className='btn' onClick={()=>{navigate("/candidato_form/"+candidato._id)}}><FaEdit  /></button></div>
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
                <button className='btn btn-primary' onClick={()=>{navigate("/candidato_form")}}>Cadastrar</button>
            </div>
            <div className='box mt-3'>
                <div className='box-header mb-0'>
                    Listagem de Candidatos
                </div>
                {loading?
                    <Loading className='rounded-bottom' />
                :
                    <>
                    <div className='box-body mt-3'>
                        <div className='col'>Quantidade {candidatosFiltrados.length}</div>
                        <div className='col-4'>
                            <input type='text' placeholder='Pesquisar' value={busca} onChange={e=>{setBusca(e.target.value)}} />
                        </div>

                        { listaCandidatos() }
                    </div>
                    </>
                }
            </div>
        </div>
    );
}

export default Candidatos;
