import { FaUserCircle, FaBars } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import { useContext } from 'react';
import { MenuContext } from '../../Contexts/MenuContext/MenuContext';
import { useRouter } from 'next/router';
import Logo from '../../public/Logo.png';

const Header = () => {
    const navigate = useRouter().push;
    const { open, setOpen } = useContext(MenuContext);
    let usuario = { nome: "", _id: "" };
    let user = "";

    if (typeof window !== 'undefined') {
        if (window.localStorage.getItem("user") === "null" || window.localStorage.getItem("user") === null) {
            if (window.location.pathname !== "/") {
                navigate("/");
            }
        } else {
            usuario = JSON.parse(window.localStorage.getItem("user"));
            user = {
                name: usuario.nome
            };
        }
    }

    function logOut() {
        window.localStorage.clear();
        setOpen(false);
        navigate("/");
    }

    if (user !== "") {
        return (
            <div>
                <div className="bg-light shadow pt-2 pb-2 ps-2 d-flex text-wrap">
                    <div class="col-1 text-center align-self-center d-none d-md-inline ">
                        <button className='btn' onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="collapseMenu">
                            <FaBars size={20} />
                        </button>
                    </div>
                    <div className='col align-self-center d-none d-md-inline fs-3'>LOGO</div>
                    <div class="col text-end pe-4 align-self-center d-none d-md-inline">
                        <Dropdown>
                            <Dropdown.Toggle className='btn' variant="" id="dropdownUser">
                                <label className='d-none d-md-inline'>Bem vindo, {user.name} </label><FaUserCircle size={30} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => { navigate("/usuario_form/" + usuario._id) }}>Perfil</Dropdown.Item>
                                <Dropdown.Item onClick={logOut}>Sair</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='col align-self-center d-inline d-md-none'>
                        <h4 className="text-dark">
                            <img src={Logo.src} style={{ width: '150px' }} />
                        </h4>
                    </div>
                    <div className='col text-end pe-4 align-self-center d-inline d-md-none'>
                        <button className='btn' type="button" data-bs-toggle="collapse" data-bs-target="#collapsMenuMobile" aria-expanded="false" aria-controls="collapsMenuMobile">
                            <FaBars size={20} />
                        </button>
                    </div>
                </div>
                <div className="col-12 collapse d-md-none" id="collapsMenuMobile">
                    <ul class="list-group shadow">
                        <li className='list-group-item' onClick={()=>{navigate('/home')}}><button className='btn' >Home</button></li>
                        <li className='list-group-item' onClick={()=>{navigate('/usuarios')}}><button className='btn'>Usuários</button></li>
                        <li className='list-group-item' onClick={()=>{navigate('/empresas')}}><button className='btn'>Empresas</button></li>
                        <li className='list-group-item' onClick={()=>{navigate('/candidatos')}}><button className='btn'>Candidatos</button></li>
                        <li className='list-group-item' onClick={()=>{navigate('/vagas')}}><button className='btn'>Vagas</button></li>
                        <li className='list-group-item' onClick={() => { navigate("/usuario_form/" + usuario._id) }}><button className='btn'>Perfil</button></li>
                        <li className='list-group-item text-danger'><button className='btn' onClick={logOut}>Sair</button></li>
                    </ul>
                </div>
            </div>
        );
    } else {
        return <div></div>
    }
};

export default Header;