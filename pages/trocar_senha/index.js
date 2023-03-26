import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../Contexts/UserContext/UserContext';

export default function trocarSenha(){
    const navigate = useRouter().push;
    const [senhaRepetida, setsenhaRepetida] = useState("");
    const [senha, setSenha] = useState("");
    const { setUsuario } = useContext(UserContext);
    return(
        <div className="row justify-content-center align-item-center">
            <div className='box col-10 col-lg-4 login-box shadow'>
               
                <div className='p-3 text-center border-bottom fs-1'>
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
                    <button className='btn btn-primary'>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    )
}