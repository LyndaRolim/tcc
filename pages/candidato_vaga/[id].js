import { FaArrowDown, FaArrowUp, FaFilePdf } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const CadastroCandidatoVaga = () => {
    const route = useRouter();
    const { id } = route.query;
    const [candidatos, setCandidatoVaga] = useState([]);
    const [vaga, setVaga] = useState(null);
    const [busca, setBusca] = useState("");
    const [buscaSelecionados, setBuscaSelecionados] = useState("");
    const buscaLower = busca?.toLowerCase();
    const buscaSelecionadosLower = buscaSelecionados?.toLowerCase();
    const candidatosFiltrados = candidatos.filter((candidato) => candidato.status === true && (candidato.nome?.toLowerCase().includes(buscaLower) || candidato.email?.toLowerCase().includes(buscaLower) ||  candidato.endereco?.toLowerCase().includes(buscaLower)));
    let candidatosSelecionadosFiltrados = [];
    
    if(vaga !== null){
        candidatosSelecionadosFiltrados = vaga.candidatos.filter((candidato) => candidato.nome?.toLowerCase().includes(buscaSelecionadosLower) || candidato.email?.toLowerCase().includes(buscaSelecionadosLower) ||  candidato.endereco?.toLowerCase().includes(buscaSelecionadosLower));   
    }

    useEffect(() => {
        preencherListaFora();
        preencheListaSelecionados();
    },[]);

    async function preencherListaFora(){
        const response = await axios.get("/api/candidato");
        const data = response.data;
        setCandidatoVaga(data.candidatos);
    }

    async function preencheListaSelecionados(){
        const response = await axios.get("/api/vaga/"+id);
        const data = response.data;
        setVaga(data.vagas);
    }

    function adicionaCandidato(candidato){
        vaga.candidatos.push(candidato);
        updateVaga();
    }

    function retiraCandidato(candidato){
        vaga.candidatos.pop(candidato);
        updateVaga();
    }

    function updateVaga(){
        toast.promise(
            axios.put("/api/vaga/"+vaga._id,vaga)
            .then(r=>r.data)
            .then(r=> {
                preencherListaFora();
                preencheListaSelecionados();
            })
        ,
        {
            success: "Vaga alterada com sucesso.",
            error: 'Erro ao alterar a vaga',
            pending: 'Enviando dados...'
        })
    }

    function candidatoIncluido(candidato){
        let retorno = false;
        if(vaga !== null){
            vaga.candidatos.map(c => {
                if(c._id === candidato._id){
                    retorno = true;
                }
            });
        }
        return retorno;
    }

    async function downloadPDF(candidato){
        const res = await axios.get("/api/candidato/"+candidato._id);
        const data = res.data;
        const linkSource = data.candidatos.curriculo;
        const fileName = "Curriculo "+candidato.nome+".pdf";
        const downloadLink = document.createElement("a");

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }


    function listaCandidatoVaga(){
        return(
            <div className="col-12 mt-3 h-350px overflow-auto">
                <div class="d-flex">
                    <div className='col'>Nome</div>
                    <div className='col'>Email</div>
                    <div className='col'>Formação</div>
                    <div className='col'>Telefone</div>
                    <div className='col-2 text-center'>Opções</div>
                </div>
                <ul className='list-group '>
                    {candidatosFiltrados && candidatosFiltrados.map(candidato => {
                        if(!candidatoIncluido(candidato)){
                            return (                            
                                <li className='list-group-item d-flex flex-wrap' key={candidato._id}>
                                    <div className="col align-self-center">{candidato.nome}</div>
                                    <div className="col align-self-center overflow-auto">{candidato.email}</div>
                                    <div className="col align-self-center">{candidato.formacao}</div>
                                    <div className="col align-self-center">{candidato.telefone}</div>
                                    <div className='col-2 d-flex text-end'>
                                        <div className='col align-self-center'>
                                            <button onClick={() => {downloadPDF(candidato)}} className='btn text-danger'>
                                                <FaFilePdf /> 
                                            </button>
                                        </div>
                                        <div className="col align-self-center">
                                            <button onClick={() => {adicionaCandidato(candidato)}} className='btn'>
                                                <FaArrowUp /> 
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                        
                    })}
                </ul>
            </div>
        );
    }

    function listaSelecionados(){
        return(
            <div className="col-12 mt-3 h-350px overflow-auto">
                <div class="d-flex">
                    <div className='col'>Nome</div>
                    <div className='col'>Email</div>
                    <div className='col'>Formação</div>
                    <div className='col'>Telefone</div>
                    <div className='col-2 text-center'>Opções</div>
                </div>
                <ul className='list-group '>
                    {candidatosSelecionadosFiltrados && candidatosSelecionadosFiltrados.map(candidato => {
                        return (                            
                            <li className='list-group-item d-flex flex-wrap' key={candidato._id}>
                                <div className="col align-self-center">{candidato.nome}</div>
                                <div className="col align-self-center overflow-auto">{candidato.email}</div>
                                <div className="col align-self-center">{candidato.formacao}</div>
                                <div className="col align-self-center">{candidato.telefone}</div>
                                <div className='col-2 d-flex text-end'>
                                    <div className='col align-self-center'>
                                        <button onClick={() => {downloadPDF(candidato)}} className='btn text-danger'>
                                            <FaFilePdf /> 
                                        </button>
                                    </div>
                                    <div className="col align-self-center">
                                        <button onClick={() => {retiraCandidato(candidato)}} className='btn'>
                                            <FaArrowDown /> 
                                        </button>
                                    </div>
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

            <div className='box mt-3'>
                <div className='box-header'>
                    informações da vaga
                </div>
                <div className='box-body'>
                    {vaga?
                        <ul>
                            <li>Empresa: {vaga.empresa.nome}</li>
                            <li>Cargo: {vaga.cargo}</li>
                            <li>Salário: R${vaga.salario}</li>
                            <li>Data Limite: {vaga.data_limite.split("T")[0]}</li>
                            <li>Quantidade de vagas: {vaga.qtd}</li>
                        </ul>
                    :
                    null} 
                </div>

            </div>

            <div className='box mt-3'>
                <div className='box-header'>
                    Listagem de Candidatos Selecionados
                </div>
                <div className='box-body'>
                    <div className='col'>Quantidade {candidatosSelecionadosFiltrados.length}</div>
                    <div className='col-4'>
                        <input type='text' placeholder='Pesquisar' value={buscaSelecionados} onChange={e=>{setBuscaSelecionados(e.target.value)}} />
                    </div>

                    { listaSelecionados() }
                </div>
            </div>


            <div className='box mt-3 '>
                <div className='box-header'>
                    Listagem de Candidados do Banco de Dados
                </div>
                <div className='box-body'>
                    <div className='col'>Quantidade {candidatosFiltrados.length - candidatosSelecionadosFiltrados.length}</div>
                    <div className='col-4'>
                        <input type='text' placeholder='Pesquisar' value={busca} onChange={e=>{setBusca(e.target.value)}} />
                    </div>

                    { listaCandidatoVaga() }
                </div>
            </div>
        </div>
    );
}

export default CadastroCandidatoVaga;
