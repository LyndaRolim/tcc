import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function trocarSenha() {
    const [senhaRepetida, setsenhaRepetida] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useRouter();
    const { email } = navigate.query;

    function salvar() {
        if (senhaRepetida === '' || senha === '') {
            toast.error('Informe e confirme a senha.')
        } else {
            if (senhaRepetida !== senha) {
                toast.error('As duas senhas devem ser iguais.')
            } else {
                axios.post('/api/alterar_senha', {
                    email,
                    senha
                }).then(()=>{
                    toast.success('Senha alterada com sucesso.');
                    navigate.push('/')
                })
            }
        }
    }

    return (
        <div className="row justify-content-center align-item-center">
            <ToastContainer />
            <div className='box col-10 col-lg-4 login-box shadow'>

                <div className='p-3 text-center border-bottom fs-5'>
                    Alterar senha
                </div>
                <div className='box-body mb-4 row justify-content-center'>
                    <div className='col-8 pt-3'>
                        <label htmlFor='senhaRepetida'>Senha</label>
                        <input value={senhaRepetida} id='senhaRepetida' onChange={e => setsenhaRepetida(e.target.value)} type='password' />
                    </div>
                    <div className='col-8 pt-3'>
                        <label>Confirmar senha</label>
                        <input value={senha} onChange={e => setSenha(e.target.value)} type='password' />
                    </div>
                </div>
                <div className='box-footer'>
                    <button onClick={() => { navigate.push('/') }} className='btn'>
                        Cancelar
                    </button>
                    <button onClick={salvar} className='btn btn-primary'>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    )
}