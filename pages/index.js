import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
    const navigate = useRouter().push;
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    let usuario = null;

    useEffect(() => {
        if (window.localStorage.getItem("user") !== "null" && window.localStorage.getItem("user") !== null) {
            toast.success("Usuário logado com sucesso.");
            setTimeout(() => {
                navigate("/home");
            }, 500);
        }
    }, [])

    function login() {
        let erro = false;

        if (email === "") {
            erro = true;
            toast.error("Insira o email.")
        }
        if (senha === "") {
            erro = true;
            toast.error("Insira a senha.")
        }

        if (!erro) {
            const data = { email, senha };
            toast.promise(
                axios.post("/api/login", data)
                    .then(r => r.data)
                    .then(data => {
                        if (data !== "" && data !== null) {
                            window.localStorage.setItem("user", JSON.stringify(data));
                            usuario = data;
                        }
                    })

                , {
                    pending: "Enviando dados...",
                    success: "Usuário encontrado.",
                    error: "Usuário não encontrado."
                })
                .then(() => {
                    if (usuario !== null) {
                        setTimeout(() => {
                            navigate("/home");
                        }, 500);
                    }
                })
        }
    }

    return (
        <div className="row justify-content-center align-item-center">
            <div className='box col-10 col-lg-4 login-box shadow'>
                <ToastContainer />
                <div className='p-3 text-center border-bottom fs-1'>
                    Logo
                </div>
                <div className='box-body mb-4 row justify-content-center'>
                    <div className='col-8 pt-3'>
                        <label htmlFor='email'>Email</label>
                        <input value={email} id='email' onChange={e => setEmail(e.target.value)} type='email' />
                    </div>
                    <div className='col-8 pt-3'>
                        <label>Senha</label>
                        <input value={senha} onChange={e => setSenha(e.target.value)} type='password' />
                    </div>
                </div>
                <div className='box-footer'>
                    <button className='btn btn-primary' onClick={login}>
                        Logar
                    </button>
                </div>
            </div>
        </div>
    )
}