import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import { UserContext } from '../../Contexts/UserContext/UserContext';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [menuData, setMenuData] = useState(true);
    const { temAcesso } = useContext(UserContext);

    useEffect(() => {
        getInfo();
    }, [])

    async function getInfo() {
        const response = await axios.get("/api/home");
        const data = response.data;
        setMenuData(data);
        setLoading(false);
    }

    return (
        <div className="mt-3 col d-flex flex-wrap mb-5">
            <div className='col-12 box-header'>
                Dashboard
            </div>

            {temAcesso(["Diretoria", "Coordenador", "Recrutador"]) ?
                <>
                    <div className="box col-md-5 col-xs-12 m-auto mt-3 shadow">
                        <div className='text-center'>
                            <div className='fs-5 border-bottom'>Candidatos</div>
                            {loading ?
                                <Loading className="rounded-bottom" />
                                :
                                <>
                                    <div>Ativos / Inativos</div>
                                    <div className="fs-4 text-primary">
                                        {menuData.candidatos.ativo} / {menuData.candidatos.inativo}
                                    </div>
                                </>
                            }
                        </div>
                    </div>

                    <div className="box col-md-5 col-xs-12 mt-3 m-auto shadow">

                        <div className='text-center'>
                            <div className='fs-5 border-bottom'>Vagas</div>
                            {loading ?
                                <Loading className="rounded-bottom" />
                                :
                                <>
                                    <div>Em aberto / Finalizadas</div>
                                    <div className="fs-4 text-primary">
                                        {menuData.vagas.ativo} / {menuData.vagas.inativo}
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </>
                : null}


            <div className="box col-md-5 col-xs-12 mt-3 m-auto shadow">
                <div className='text-center'>
                    <div className='fs-5 border-bottom'>Empresas</div>
                    {loading ?
                        <Loading className="rounded-bottom" />
                        :
                        <>
                            <div>Ativas / Inativas</div>
                            <div className="fs-4 text-primary">
                                {menuData.empresas.ativo} / {menuData.empresas.inativo}
                            </div>
                        </>
                    }
                </div>
            </div>
            {temAcesso(["Diretoria", "Coordenador"]) ?

                <div className='box col-md-5 col-xs-12 mt-3 shadow m-auto'>
                    <div className='text-center'>
                        <div className='fs-5 border-bottom'>Valor Recebido</div>
                        {loading ?
                            <Loading className="rounded-bottom" />
                            :
                            <>
                                <div className='text-white'>.</div>
                                <div className="fs-4 text-primary">
                                    R${menuData.valorTotal.toFixed(2)}
                                </div>
                            </>
                        }
                    </div>
                </div>
                : null}
        </div>
    );
}

export default Home;
