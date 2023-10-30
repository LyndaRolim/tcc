import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useRouter();
    const [routeActive, setRouteActive] = useState("" + navigate.pathname);

    function validaAcesso(acesso = []) {
        let erro = false;
        if (usuario !== null) {
            const existe = acesso.find(item => item === usuario.acesso)
            if (!existe) {
                erro = true;
            }
        } else {
            erro = true;
        }

        if (erro) {
            toast.error("Acesso não autorizado.")
            setRouteActive("/");
            navigate.push("/");
        }
    }

    function temAcesso(acesso = []) {
        let liberado = true;
        if (usuario !== null) {
            const existe = acesso.find(item => item === usuario.acesso)
            if (!existe) {
                liberado = false;
            }
        } else {
            liberado = false;
        }
        return liberado
    }

    async function verifyToken() {
        const token = localStorage.getItem("token");
        if (token !== '') {
            await axios.post('/api/auth/verify', {
                token
            }).then(r => r.data)
                .then(data => {
                    localStorage.setItem("token", data);
                    setToken(data);
                });
        }
    }

    async function getUserByToken() {
        const token = localStorage.getItem("token");
        if (token !== '') {
            await axios.post('/api/auth/decodeToken', {
                token
            }).then(r => r.data)
                .then(data => {
                    setUsuario(data)
                });
        }

    }

    useEffect(() => {
        if (navigate.pathname !== '/' && navigate.pathname.indexOf('/esqueci_senha') < 0 && navigate.pathname.indexOf('/trocar_senha') < 0 ) {
            verifyToken();
            getUserByToken();
        }
    }, [navigate.pathname]);

    return (
        <UserContext.Provider
            value={{
                usuario, setUsuario, validaAcesso, temAcesso,
                routeActive, setRouteActive,
                token, setToken,
                verifyToken, getUserByToken
            }}>
            {children}
        </UserContext.Provider>
    )
}
