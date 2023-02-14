import { Collapse } from "react-bootstrap"
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../Contexts/MenuContext/MenuContext";
import { useRouter } from 'next/router';
import Link from 'next/link'

const Menu = () => {
    const { open } = useContext(MenuContext);
    const router = useRouter();
    const routes = ["/home", "/usuarios", "/empresas", "/candidatos", "/vagas"];
    const [routeActive, setRouteActive] = useState("" + router.pathname);
    let mostrar = false;

    if (typeof window !== 'undefined') {
        if (window.localStorage.getItem("user") !== "null" || window.localStorage.getItem("user") !== null) {
            if (router.pathname !== "/") {
                mostrar = true;
            } else {
                mostrar = false;
            }
        }
    }


    useEffect(() => {
        selecionaActive();
    });

    function selecionaActive() {
        let lista = document.getElementsByTagName("li");
        setRouteActive(router.pathname);

        for (let i = 0; i < lista.length; i++) {
            let item_atual = '/' + lista[i].innerHTML.replace(" ", "_");
            if (item_atual === routeActive) {
                lista[i].classList.add("active");
            } else {
                lista[i].classList.remove("active");
            }
        }
    }

    function listaMenu() {
        return routes.map(route => {
            return (
                <button className="border-0 p-0 m-0 text-start" key={route} onClick={() => { router.push('/' + route); setRouteActive(route) }}>
                    <li className="list-group-item list-group-item-action text-capitalize">
                        {route.replace('/', "").replace(/_/g, " ")}
                    </li>
                </button>
            );
        });
    }

    function retornoMenu() {
        return (
            <>
                <div className="col-md-2 col-4 me-2 float-start d-none d-md-block">.</div>
                <div className='bg-light position-absolute left-0 menu bottom-0 d-none d-md-block shadow col-md-2 col-4 me-2'>
                    <Collapse in={open} dimension="width">
                        <div id="collapseMenu" className='h-100 bg-light'>
                            <ul className='list-group list-group-flush'>
                                {listaMenu()}
                            </ul>
                        </div>
                    </Collapse>
                </div>
            </>
        );
    };

    if (open && mostrar) {
        return (retornoMenu());
    } else {
        return (
            <div></div>
        )
    }
}

export default Menu;