import { useState, useEffect, useRef, useContext } from "react";
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import styles from '../styles/Profile.module.css';
import { render } from 'react-dom';
import Gallery from 'react-grid-gallery';
import Image from 'next/image';
import Link from 'next/link';
import UsuarioContext from '../context/usuarios/UsuarioContext';
import { OBTENER_USUARIO } from '../queries/Usuarios/Usuarios.ts';

const getYear = function(date){
  let jsDate = new Date(date);
  
  return jsDate.getFullYear()
}

const Perfil = () => {
  
  const profile_example = {
    'id':1,
    'name':'Alan',
    'last_name':'Silvero',
    'registered_at':'2019/08/10 10:00:00',
    'image':'/assets/properties/property_1.jpg',
    'email_verified':true,
    'mobile_verified':true,
    'is_actual_user': true
  };
  const usuarioContext = useContext(UsuarioContext);
  const { token } = usuarioContext;
  const { query, isReady, pathname, push } = useRouter();
  const { data, loading, error } = useQuery(OBTENER_USUARIO, {
      variables: {
          token
      }
  });

  
  useEffect(() => {
      console.log(token)
  }, [token]);

  if(!isReady)
    return null;
  
    if(loading) 
      return 'Cargando...';
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
          <div className={styles.profileDisplayMain}>
            <div className={styles.profileCardContainer}>
              <div className={styles.profileCard}>
                <div className={styles.profileTop}>
                  <div className={styles.profileImageContainer}>
                    {data?.obtenerUsuario.image ? (
                      <Image src={data?.obtenerUsuario.image} layout="intrinsic" width={100} height={100} className={styles.profileImage} />
                    ) : (
                      <Image src={profile_example.image} layout="intrinsic" width={100} height={100} className={styles.profileImage} />
                    )}
                  </div>
                </div>
                {(profile_example.email_verified || profile_example.mobile_verified) && (
                    <div className={styles.verifiedData}>{data?.obtenerUsuario.name} confirmó</div>
                )}
                {(profile_example.email_verified) && (
                  <>
                    <div className={styles.verifiedDataLine}>
                      <div className={styles.verifiedDataIcon}>
                        <Image src="/icons/checked.png" layout="intrinsic" width={30} height={30} />
                      </div><div className={styles.verifiedDataTitle}>Dirección de correo electrónico</div>
                    </div>
                  </>
                )}
                {(profile_example.mobile_verified) && (
                  <>
                    <div className={styles.verifiedDataLine}>
                      <div className={styles.verifiedDataIcon}>
                        <Image src="/icons/checked.png" layout="intrinsic" width={30} height={30} />
                      </div><div className={styles.verifiedDataTitle}>Teléfono celular</div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className={styles.titleContainer}>
              <div className={styles.profileTitle}>¡Hola! Soy {data?.obtenerUsuario.name} {data?.obtenerUsuario.last_name}</div>
              <div className={styles.registeredAtTitle}> Se registro en {getYear(data?.obtenerUsuario.registered_at)}</div>
              {profile_example.is_actual_user && (
                <div className={styles.editProfileLink}>
                  <Link href="/editar-perfil">
                    <a>Editar Perfil</a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
}

export default Perfil;