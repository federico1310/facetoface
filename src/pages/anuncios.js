import { useState, useEffect, useRef, useContext } from "react";
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import styles from '../styles/Listing.module.css';
import { render } from 'react-dom';
import Link from 'next/link';
import Gallery from 'react-grid-gallery';
import Image from 'next/image';
import Anuncio from '../components/Anuncio';
import UsuarioContext from '../context/usuarios/UsuarioContext';
import { OBTENER_ANUNCIOS } from '../queries/Anuncios/Anuncios.ts';

const getYear = function(date){
  let jsDate = new Date(date);
  
  return jsDate.getFullYear()
}

const Anuncios = () => {
  const usuarioContext = useContext(UsuarioContext);
  const { token } = usuarioContext;
  const { query, isReady, pathname, push } = useRouter();
  const { data, loading, error } = useQuery(OBTENER_ANUNCIOS);
  const [ totalAnuncios, setTotalAnuncios ] = useState(0)

  useEffect(() => {
    if(data)
    {
      if(data.obtenerAnuncios)
      {
        setTotalAnuncios(data?.obtenerAnuncios.length);
      }
    }
  }, [data]);

  if(!isReady)
    return null;
  
  
    if(loading) 
    {
      return 'Cargando...';
    }
    else
    {
      let savedToken = localStorage.getItem('token')
      if(!savedToken)
      {
        push({pathname: '/'})
        return null;
      }
    }

    return (
      <Layout>
        <div className="min-h-screen flex positionRelative bg-white">
          <div className={styles.listingMain}>
            <div className={styles.listingCreate}>
              <Link href="/nuevo-anuncio">
                <a className={styles.buttonCreatePublication}>+ Crear anuncio</a>
              </Link>
            </div> 
            <div className={styles.totalListingLength}>{totalAnuncios} {totalAnuncios == 1 ? 'anuncio' : 'anuncios'}</div>
            <div className={styles.listingTable}>
              <div className={styles.listingHeader}>
                <div className={`${styles.listingHeaderItem} ${styles.anuncio}`}>ANUNCIO</div>
                <div className={`${styles.listingHeaderItem} ${styles.estado}`}>ESTADO</div>
                <div className={`${styles.listingHeaderItem} ${styles.dormitorios}`}>DORMITORIOS</div>
                <div className={`${styles.listingHeaderItem} ${styles.camas}`}>CAMAS</div>
                <div className={`${styles.listingHeaderItem} ${styles.banios}`}>BAÑOS</div>
                <div className={`${styles.listingHeaderItem} ${styles.ubicacion}`}>UBICACIÓN</div>
                <div className={`${styles.listingHeaderItem} ${styles.modificado}`}>MODIFICADO POR ÚLTIMA VEZ</div>
              </div>
              <div className={styles.listingBody}>
                {data.obtenerAnuncios.length > 0 ? (
                  <>
                    {data.obtenerAnuncios.map( anuncio => (
                      <Anuncio 
                        key={anuncio.id}
                        anuncio={anuncio}
                      />
                    ))}
                  </>
                ) : (
                  <div className={styles.noPublicationsError}>Aun no ha creado anuncios</div>
                )}  
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
}

export default Anuncios;