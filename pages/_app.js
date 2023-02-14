import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
import { MenuContextProvider } from '../Contexts/MenuContext/MenuContext';
import Header from '../Components/Header/Header';
import Menu from '../Components/Menu/Menu';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
  }, []);
  
  return (
    <>
      <Head>
        <title>Gestão de Pessoas RH</title>
        <link href='/favicon.png'></link>
      </Head>
      <MenuContextProvider>
        <Header />
        <div className='d-flex flex-wrap'>
          <Menu /> 
          <div className='col conteiner pe-5 ps-5'>
            <Component {...pageProps} />
          </div>
        </div>
      </MenuContextProvider>
      <Analytics />
    </>
  )
}

export default MyApp
