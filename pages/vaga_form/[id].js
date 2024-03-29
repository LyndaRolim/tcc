import { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../config/http';
import { useRouter } from 'next/router';
import { UserContext } from '../../Contexts/UserContext/UserContext';

const CadastroVagas = () => {
    const navigate = useRouter().push;
    const route = useRouter();
    const [salario, setSalario] = useState(0);
    const [valor_vaga, setValorVaga] = useState(0);
    const [cargo, setCargo] = useState("");
    const [data_limite, setDataLimite] = useState("");
    const [obs, setObs] = useState("");
    const [qtd, setQtd] = useState(0);
    const [empresa, setEmpresa] = useState("");
    const [empresas, setEmpresas] = useState([]);
    const { id } = route.query;
    const { validaAcesso } = useContext(UserContext);

    useEffect(() => {
        carregaEmpresas();
        carregarVaga();
        validaAcesso(["Diretoria", "Coordenador", "Recrutador"]);
    },[])

    function carregaEmpresas(){
        axios.get("/api/empresas_active")
            .then(r=>r.data)
            .then(data => data.empresas)
            .then(empresas => {
                setEmpresas(empresas);
            });
    }

    function carregarVaga(){
        if(id){
            axios.get("/api/vaga/"+id)
                .then(r => r.data)
                .then(data => data.vagas)
                .then(vaga => {
                    setEmpresa(vaga.empresa);
                    setCargo(vaga.cargo);
                    setSalario(vaga.salario);
                    setValorVaga(vaga.valor_vaga);
                    setDataLimite(vaga.data_limite);
                    setObs(vaga.obs);
                    setQtd(vaga.qtd);
                });
        }
    }

    function Salvar(){
        if(temErro() !== ""){
            toast.error(temErro());
        }else{
            toast.promise(
                axios.put("/api/vaga/"+id,{
                    id: id,
                    empresa: empresa,
                    salario: salario,
                    valor_vaga: valor_vaga,
                    cargo: cargo,
                    qtd: qtd,
                    data_limite: data_limite,
                    obs: obs,
                })
            ,{
                pending: "Enviado informações.",
                error: "Não foi possível salvar a vaga",
                success: "Vaga salva."
            })
            .then(()=>setTimeout(()=>{
                navigate("/vagas")
            },500));
        }
    }

    function temErro(){
        var erro = "";

        if(empresa === ""){
            erro = "Insira o empresa. ";
        }
        if(cargo === ""){
            erro += "Informe o cargo. ";
        }
        if(data_limite === ""){
            erro += "Informe o data_limite. ";
        }
        if(qtd <= 0){
            erro += "Informe a quantidade de vagas. ";
        }
        return erro;
    }

    return (
        <div className="box mt-4">
            <ToastContainer />
            <div className='box-header'>
                Cadastrar Vaga
            </div>
            <div className='box-body'>
                <div className='col-12'>
                    <label>Empresa</label>
                    <select value={JSON.stringify(empresa)} className='form-control' onChange={e=>setEmpresa(JSON.parse(e.target.value))}>
                        <option value=''>Selecione</option>
                        {empresas && empresas.map(empresa_aux => {
                            return <option key={empresa_aux._id} value={JSON.stringify(empresa_aux)}>{empresa_aux.nome}</option>
                        })}
                    </select>
                </div>
                <div className='col-6 pt-3'>
                    <label>Cargo</label>
                    <input value={cargo} onChange={e=>{setCargo(e.target.value)}} type='text' />
                </div>
                <div className='col-3 pt-3'>
                    <label>Salário</label>
                    <input value={salario} onChange={e=>{setSalario(e.target.value)}} type='number' min="0" step="0.01" />
                </div>
                <div className='col-3 pt-3'>
                    <label>Valor Por Vaga</label>
                    <input value={valor_vaga} onChange={e=>{setValorVaga(e.target.value)}} type='number' min="0" step="0.01" />
                </div>

                <div className='col-6 pt-3'>
                    <label>Data Limite</label>
                    <input value={data_limite.split("T")[0]} min={new Date().toISOString().split("T")[0]} onChange={e=>{setDataLimite(e.target.value)}} type='date' />
                </div>
                <div className='col-6 pt-3'>
                    <label>Quatidade</label>
                    <input value={qtd} min="0" onChange={e=>{setQtd(e.target.value)}} type='number' />
                </div>

                <div className='col-12 pt-3'>
                    <label>Descrição</label>
                    <textarea value={obs} onChange={e=>{setObs(e.target.value)}} className="form-control textarea-200px">
                    </textarea>
                </div>
            </div>
            <div className='box-footer'>
                <button className='btn btn-primary' onClick={Salvar}>Salvar</button>
            </div>
        </div>
    );
}

export default CadastroVagas;
