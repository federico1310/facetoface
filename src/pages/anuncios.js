import { useState, useEffect, useRef } from "react";
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import styles from '../styles/Listing.module.css';
import { render } from 'react-dom';
import Gallery from 'react-grid-gallery';
import Image from 'next/image';
import Anuncio from '../components/Anuncio';
// import { OBTENER_PROPIEDADES } from '../queries/Propiedades/Propiedades.ts';

const getYear = function(date){
  let jsDate = new Date(date);
  
  return jsDate.getFullYear()
}

const Anuncios = () => {
  const [isNameEditable,setIsNameEditable] = useState(false);
  const listing_example = [{
      'id':1,
      'title':'Anuncio de prueba',
      'status':'En proceso',
      'status_id':1,
      'rooms': 3,
      'beds': 4,
      'toilet':2,
      'image':'/assets/properties/property_1.jpg',
      'location': 'Buenos Aires, Argentina',
      'modified_at':'2020/06/13'
    },
    {
      'id':2,
      'title':'Anuncio de prueba',
      'status':'En proceso',
      'status_id':1,
      'rooms': 3,
      'beds': 4,
      'toilet':2,
      'image':'/assets/properties/property_1.jpg',
      'location': 'Buenos Aires, Argentina',
      'modified_at':'2020/06/13'
    },
    {
      'id':3,
      'title':'Anuncio de prueba',
      'status':'En proceso',
      'status_id':1,
      'rooms': 3,
      'beds': 4,
      'toilet':2,
      'image':'/assets/properties/property_1.jpg',
      'location': 'Buenos Aires, Argentina',
      'modified_at':'2020/06/13'
    },
    {
      'id':4,
      'title':'Anuncio de prueba',
      'status':'En proceso',
      'status_id':1,
      'rooms': 3,
      'beds': 4,
      'toilet':2,
      'image':'/assets/properties/property_1.jpg',
      'location': 'Buenos Aires, Argentina',
      'modified_at':'2020/06/13'
    },
    {
      'id':5,
      'title':'Anuncio de prueba',
      'status':'En proceso',
      'status_id':1,
      'rooms': 3,
      'beds': 4,
      'toilet':2,
      'image':'/assets/properties/property_1.jpg',
      'location': 'Buenos Aires, Argentina',
      'modified_at':'2020/06/13'
    },
    {
      'id':6,
      'title':'Anuncio de prueba',
      'status':'En proceso',
      'status_id':1,
      'rooms': 3,
      'beds': 4,
      'toilet':2,
      'image':'/assets/properties/property_1.jpg',
      'location': 'Buenos Aires, Argentina',
      'modified_at':'2020/06/13'
    },
    {
      'id':7,
      'title':'Anuncio de prueba',
      'status':'En proceso',
      'status_id':1,
      'rooms': 3,
      'beds': 4,
      'toilet':2,
      'image':'/assets/properties/property_1.jpg',
      'location': 'Buenos Aires, Argentina',
      'modified_at':'2020/06/13'
    },
    {
      'id':8,
      'title':'Anuncio de prueba',
      'status':'En proceso',
      'status_id':1,
      'rooms': 3,
      'beds': 4,
      'toilet':2,
      'image':'/assets/properties/property_1.jpg',
      'location': 'Buenos Aires, Argentina',
      'modified_at':'2020/06/13'
    },
    {
      'id':9,
      'title':'Anuncio de prueba',
      'status':'En proceso',
      'status_id':1,
      'rooms': 3,
      'beds': 4,
      'toilet':2,
      'image':'/assets/properties/property_1.jpg',
      'location': 'Buenos Aires, Argentina',
      'modified_at':'2020/06/13'
    },
    {
      'id':10,
      'title':'Anuncio de prueba',
      'status':'En proceso',
      'status_id':1,
      'rooms': 3,
      'beds': 4,
      'toilet':2,
      'image':'/assets/properties/property_1.jpg',
      'location': 'Buenos Aires, Argentina',
      'modified_at':'2020/06/13'
    }];
  const { query, isReady } = useRouter();

  if(!isReady)
    return null;
  
  // const { data, loading, error } = useQuery(OBTENER_PROPIEDADES);
  
    // if(loading) return 'Cargando...';

    return (
      <Layout>
        <div className="min-h-screen flex positionRelative bg-white">
          <div className={styles.listingMain}>
            <div className={styles.listingCreate}>+ Crear anuncio</div> 
            <div className={styles.totalListingLength}>{listing_example.length} {listing_example.length == 1 ? 'anuncio' : 'anuncios'}</div>
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
                {listing_example.map( anuncio => (
                  <Anuncio 
                    key={anuncio.id}
                    anuncio={anuncio}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
}

export default Anuncios;