import { FaArrowUp, FaEdit, FaTrash, FaDoorOpen } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import React, { useEffect, useState, useContext} from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../Contexts/UserContext/UserContext';

const Vagas = () => {
    const navigate = useRouter().push;
    const [vagas, setVagas] = useState([]);
    const [busca, setBusca] = useState("");
    const buscaLower = busca?.toLowerCase();
    const vagasFiltrados = vagas.filter((vaga) => vaga.cargo?.toLowerCase().includes(buscaLower) || vaga.empresa.nome?.toLowerCase().includes(buscaLower));
    const { validaAcesso } = useContext(UserContext);

    useEffect(() => {
        preencherLista();
        validaAcesso(["Diretoria", "Coordenador", "Recrutador"]);
    },[])

    async function preencherLista(){
        const response = await axios.get("/api/vaga");
        let data = response.data;
        setVagas(data.vagas);
    }

    function alterarStatus(id,status){
        let acao = "";
        if(status){
            acao = "inativado";
        }else{
            acao = "ativado";
        }
        toast.promise(
            axios.delete("/api/vaga/"+id)
        ,{
            error: 'Não foi possível atualizar a vaga',
            pending: 'Enviando dados...',
            success: 'Empresa '+acao+' com sucesso.'
        })
        .then(()=>{
            preencherLista();
        })
    }

    function listaVagas(){
        return(
            <div className="col-12 mt-3 overflow-auto">
                <div className="d-flex">
                    <div className='col'>Empresa</div>
                    <div className='col'>Cargo</div>
                    <div className='col'>Data</div>
                    <div className='col-1 text-center'>QTD</div>
                    <div className='col-1 text-center'>Status</div>
                    <div className='col-3 text-center'>Opções</div>
                </div>
                <ul className='list-group'>
                    {vagasFiltrados && vagasFiltrados.map(vaga => {
                        return (                            
                            <li className='list-group-item d-flex flex-wrap' key={vaga._id}>
                                <div className="col align-self-center">{vaga.empresa.nome}</div>
                                <div className="col align-self-center">{vaga.cargo}</div>
                                <div className="col align-self-center">{vaga.data_limite.split("T")[0]}</div>
                                <div className="col-1 align-self-center text-center">{vaga.qtd}</div>
                                <div className="col-1 align-self-center text-center">{vaga.status?"Ativo":"Inativo"}</div>
                                <div className='col-3 d-flex text-end'>
                                    <div className="col">
                                        <button onClick={() => {alterarStatus(vaga._id, vaga.status)}} className='btn'>
                                            {vaga.status?
                                                <FaTrash  />
                                            :
                                                <FaArrowUp /> 
                                            }
                                        </button>
                                    </div>
                                    <div className="col"><button className='btn' onClick={()=>{navigate("/vaga_form/"+vaga._id)}}><FaEdit  /></button></div>
                                    {vaga.status?
                                        <div className='col'>
                                            <button className="btn" onClick={()=>{navigate("/candidato_vaga/"+vaga._id)}}>
                                                <FaDoorOpen />
                                            </button>
                                        </div>
                                        :
                                        null
                                    }
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
                <button className='btn btn-primary' onClick={()=>{navigate("/vaga_form")}}>Cadastrar</button>
            </div>
            <div className='box mt-3'>
                <div className='box-header'>
                    Listagem de Vagas
                </div>
                <div className='box-body'>
                    <div className='col'>Quantidade {vagasFiltrados.length}</div>
                    <div className='col-4'>
                        <input type='text' placeholder='Pesquisar' value={busca} onChange={e=>{setBusca(e.target.value)}} />
                    </div>

                    { listaVagas() }
                </div>
            </div>
        </div>
    );
}

export default Vagas;
