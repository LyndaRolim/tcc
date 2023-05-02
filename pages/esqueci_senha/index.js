import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const EsqueciSenha = () => {
    const [email, setEmail] = useState('');
    const navigate = useRouter();

    function enviar(){
        axios.post('/api/email/recuperarSenha', {
            email
        }).then(r => r.data)
        .then(data => {
            if(data === ''){
                toast.success('Senha resetada com sucesso, entre no email para conferir a nova senha.');
                setEmail('');
                navigate.push('/');
            }else{
                toast.error(data)
            }
        })

    }

    return (
        <div className="row justify-content-center align-item-center">
            <ToastContainer />
            <div className='box col-10 col-lg-4 login-box shadow p-3'>
                <div className='box-header'>
                    <h5>Recuperar senha</h5>
                </div>
                <div className='box-body'>
                    <label>E-mail</label>
                    <input onChange={e=>setEmail(e.target.value)} className='form-control' placeholder='Insira o e-mail' />
                </div>
                <div className='box-footer'>
                    <button className='btn' onClick={()=>{navigate.push('/')}}>
                        Cancelar
                    </button>
                    <button className='btn btn-primary' onClick={enviar}>
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EsqueciSenha;
