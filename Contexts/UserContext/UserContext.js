import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
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
            setRouteActive("/home");
            navigate.push("/home");
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

    useEffect(() => {
        setUsuario(JSON.parse(localStorage.getItem("user")))
    }, [])

    return (
        <UserContext.Provider
            value={{
                usuario, setUsuario, validaAcesso,temAcesso,
                routeActive, setRouteActive
            }}>
            {children}
        </UserContext.Provider>
    )
}
