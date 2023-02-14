import { FaArrowUp, FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function Usuarios() {

    const navigate = useRouter().push;
    const [usuarios, setUsuarios] = useState([]);
    const [busca, setBusca] = useState("");
    const buscaLower = busca?.toLowerCase();
    const usuariosFiltrados = usuarios.filter((usuario) => usuario.nome?.toLowerCase().includes(buscaLower) || usuario.email?.toLowerCase().includes(buscaLower));

    useEffect(() => {
        preencherLista();
    },[])
    
    async function preencherLista(){
        const response = await axios.get("/api/usuario");
        const data = response.data;
        setUsuarios(data.usuarios);
    }

    function alterarStatus(id,status){
        let acao = "";

        if(status){
            acao = "inativado";
        }else{
            acao = "ativado";
        }

        toast.promise(
            axios.delete("/api/usuario/"+id)
        ,{
            error: 'Não foi possível atualizar o usuário',
            pending: 'Enviando dados...',
            success: 'Usuário '+acao+' com sucesso.'
        })
        .then(()=>{
            preencherLista();
        })
    }

    function listaUsuario(){
        return(
            <div className="col-12 mt-3 overflow-auto">
                <div class="d-flex">
                    <div className='col'>Nome</div>
                    <div className='col'>Email</div>
                    <div className='col-2'>Status</div>
                    <div className='col-2 text-center'>Opções</div>
                </div>
                <ul className='list-group '>
                    {usuariosFiltrados && usuariosFiltrados.map(usuario => {
                        return (                            
                            <li className='list-group-item d-flex flex-wrap' key={usuario._id}>
                                <div className="col align-self-center">{usuario.nome}</div>
                                <div className="col align-self-center">{usuario.email}</div>
                                <div className="col-2 align-self-center">{usuario.status?"Ativo":"Inativo"}</div>
                                <div className='col-2 d-flex text-end'>
                                    <div className="col">
                                        <button onClick={() => {alterarStatus(usuario._id, usuario.status)}} className='btn'>
                                            {usuario.status?
                                                <FaTrash  />
                                            :
                                                <FaArrowUp /> 
                                            }
                                        </button>
                                    </div>
                                    <div className="col"><button className='btn' onClick={()=>{navigate("/usuario_form/"+usuario._id)}}><FaEdit  /></button></div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }

    return (
        <div className='col'>
            <ToastContainer />
            <div className='col-12 mt-3 text-end'>
                <button className='btn btn-primary' onClick={()=>{navigate("/usuario_form")}}>Cadastrar</button>
            </div>
            <div className='box mt-3'>
                <div className='box-header'>
                    Listagem de Usuários
                </div>
                <div className='box-body'>
                    <div className='col'>Quantidade {usuariosFiltrados.length}</div>
                    <div className='col-4'>
                        <input type='text' placeholder='Pesquisar' value={busca} onChange={e=>{setBusca(e.target.value)}} />
                    </div>

                    { listaUsuario() }
                </div>
            </div>
        </div>
    );
    
}

export default Usuarios;
