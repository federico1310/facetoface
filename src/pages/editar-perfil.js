import { useState, useEffect, useRef } from "react";
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import styles from '../styles/ProfileEdit.module.css';
import { render } from 'react-dom';
import Gallery from 'react-grid-gallery';
import Image from 'next/image';
import Link from 'next/link';
// import { OBTENER_PROPIEDADES } from '../queries/Propiedades/Propiedades.ts';

const getYear = function(date){
  let jsDate = new Date(date);
  
  return jsDate.getFullYear()
}

const Perfil = () => {
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isGenderEditable, setIsGenderEditable] = useState(false);
  const [isBirthdayEditable, setIsBirthdayEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isMobileEditable, setIsMobileEditable] = useState(false);
  const [isOfficialIdEditable, setIsOfficialIdEditable] = useState(false);
  const [isAddressEditable, setIsAddressEditable] = useState(false);
  const [isEmergencyContactEditable, setIsEmergencyContactEditable] = useState(false);
  const [isEditting, setIsEditting] = useState(false);

  useEffect(() => {
    if(isNameEditable || isGenderEditable || isBirthdayEditable || isEmailEditable || isMobileEditable || isOfficialIdEditable || isAddressEditable || isEmergencyContactEditable)
    {
      setIsEditting(true);
    } 
    else
    {
      setIsEditting(false);
    }
  }, [isNameEditable, isGenderEditable, isBirthdayEditable, isEmailEditable, isMobileEditable, isOfficialIdEditable, isAddressEditable, isEmergencyContactEditable])

  const profile_example = {
    'id':1,
    'first_name':'Alan',
    'last_name':'Silvero',
    'registered_at':'2019/08/10 10:00:00',
    'gender': 'Masculino',
    'birthday': '1985/09/12',
    'email':'asilvero@gmail.com',
    'mobile': null,
    'official_id':'',
    'address':'',
    'emergency_contact':'',
    'image':'/assets/properties/property_1.jpg',
    'email_verified':true,
    'mobile_verified':true,
    'is_actual_user': true
  };
  const { query, isReady } = useRouter();

  if(!isReady)
    return null;
  
  // const { data, loading, error } = useQuery(OBTENER_PROPIEDADES);
  
    // if(loading) return 'Cargando...';

    return (
      <Layout>
        <div className="min-h-screen flex positionRelative bg-white">
          <div className={styles.profileEditDisplayMain}>
            <div className={styles.navigationDisplayContainer}>
              <div className={styles.navigationDisplayDescription}>Cuenta</div><div className={styles.navigationDisplaySeparator}><Image src="/icons/next.png" layout="intrinsic" width={30} height={30} /></div><div className={styles.navigationDisplayDescription}>Información personal</div>
            </div>
            <div className={styles.profileEditTitle}>Datos personales</div>
            <div className={styles.profileEditFormContainer}>
              <form className={styles.profileEditForm}>

                <div className={styles.profileEditFormLine}>
                  <div className={styles.profileEditFormLineInformation}>
                    <label className={styles.profileEditLineLabel} htmlFor="name">Nombre</label>
                    <div className={`${styles.profileEditLineContent} ${!isNameEditable ? styles.show : styles.hide}`}>{profile_example.first_name || 'No proporcionado'}</div>
                    <input className={`${styles.inputsSearch} ${isNameEditable ? styles.show : styles.hide}`} id="name" type="text" placeholder="Nombre" value={profile_example.first_name} />
                  </div>
                  <div className={styles.profileEditFormLineAction}>
                    <div className={`${styles.enableEdit} ${!isNameEditable ? styles.show : styles.hide}`} onClick={() => {setIsNameEditable(true)}}>Editar</div>
                    <div className={`${styles.closeEdit} ${!isNameEditable ? styles.hide : styles.show}`} onClick={() => {setIsNameEditable(false)}}>
                      <Image src="/icons/close.png" layout="intrinsic" width={24} height={24} />
                    </div>
                  </div>
                </div>
                <div className={styles.profileEditFormLineSeparator}></div>

                <div className={styles.profileEditFormLine}>
                  <div className={styles.profileEditFormLineInformation}>
                    <label className={styles.profileEditLineLabel} htmlFor="gender">Sexo</label>
                    <div className={`${styles.profileEditLineContent} ${!isGenderEditable ? styles.show : styles.hide}`}>{profile_example.gender || 'No proporcionado'}</div>
                    <input className={`${styles.inputsSearch} ${isGenderEditable ? styles.show : styles.hide}`} id="gender" type="text" placeholder="Sexo" value={profile_example.gender} />
                  </div>
                  <div className={styles.profileEditFormLineAction}>
                    <div className={`${styles.enableEdit} ${!isGenderEditable ? styles.show : styles.hide}`} onClick={() => {setIsGenderEditable(true)}}>Editar</div>
                    <div className={`${styles.closeEdit} ${!isGenderEditable ? styles.hide : styles.show}`} onClick={() => {setIsGenderEditable(false)}}>
                      <Image src="/icons/close.png" layout="intrinsic" width={24} height={24} />
                    </div>
                  </div>
                </div>
                <div className={styles.profileEditFormLineSeparator}></div>

                <div className={styles.profileEditFormLine}>
                  <div className={styles.profileEditFormLineInformation}>
                    <label className={styles.profileEditLineLabel} htmlFor="birthday">Fecha de nacimiento</label>
                    <div className={`${styles.profileEditLineContent} ${!isBirthdayEditable ? styles.show : styles.hide}`}>{profile_example.birthday || 'No proporcionado'}</div>
                    <input className={`${styles.inputsSearch} ${isBirthdayEditable ? styles.show : styles.hide}`} id="birthday" type="text" placeholder="Fecha de nacimiento" value={profile_example.birthday} />
                  </div>
                  <div className={styles.profileEditFormLineAction}>
                    <div className={`${styles.enableEdit} ${!isBirthdayEditable ? styles.show : styles.hide}`} onClick={() => {setIsBirthdayEditable(true)}}>Editar</div>
                    <div className={`${styles.closeEdit} ${!isBirthdayEditable ? styles.hide : styles.show}`} onClick={() => {setIsBirthdayEditable(false)}}>
                      <Image src="/icons/close.png" layout="intrinsic" width={24} height={24} />
                    </div>
                  </div>
                </div>
                <div className={styles.profileEditFormLineSeparator}></div>

                <div className={styles.profileEditFormLine}>
                  <div className={styles.profileEditFormLineInformation}>
                    <label className={styles.profileEditLineLabel} htmlFor="email">Dirección de correo electrónico</label>
                    <div className={`${styles.profileEditLineContent} ${!isEmailEditable ? styles.show : styles.hide}`}>{profile_example.email || 'No proporcionado'}</div>
                    <input className={`${styles.inputsSearch} ${isEmailEditable ? styles.show : styles.hide}`} id="email" type="email" placeholder="Correo electrónico" value={profile_example.email} />
                  </div>
                  <div className={styles.profileEditFormLineAction}>
                    <div className={`${styles.enableEdit} ${!isEmailEditable ? styles.show : styles.hide}`} onClick={() => {setIsEmailEditable(true)}}>Editar</div>
                    <div className={`${styles.closeEdit} ${!isEmailEditable ? styles.hide : styles.show}`} onClick={() => {setIsEmailEditable(false)}}>
                      <Image src="/icons/close.png" layout="intrinsic" width={24} height={24} />
                    </div>
                  </div>
                </div>
                <div className={styles.profileEditFormLineSeparator}></div>

                <div className={styles.profileEditFormLine}>
                  <div className={styles.profileEditFormLineInformation}>
                    <label className={styles.profileEditLineLabel} htmlFor="mobile">Número de teléfono</label>
                    <div className={`${styles.profileEditLineContent} ${!isMobileEditable ? styles.show : styles.hide}`}>{profile_example.mobile || 'No proporcionado'}</div>
                    <input className={`${styles.inputsSearch} ${isMobileEditable ? styles.show : styles.hide}`} id="mobile" type="text" placeholder="Celular" value={profile_example.mobile} />
                  </div>
                  <div className={styles.profileEditFormLineAction}>
                    <div className={`${styles.enableEdit} ${!isMobileEditable ? styles.show : styles.hide}`} onClick={() => {setIsMobileEditable(true)}}>Editar</div>
                    <div className={`${styles.closeEdit} ${!isMobileEditable ? styles.hide : styles.show}`} onClick={() => {setIsMobileEditable(false)}}>
                      <Image src="/icons/close.png" layout="intrinsic" width={24} height={24} />
                    </div>
                  </div>
                </div>
                <div className={styles.profileEditFormLineSeparator}></div>

                <div className={styles.profileEditFormLine}>
                  <div className={styles.profileEditFormLineInformation}>
                    <label className={styles.profileEditLineLabel} htmlFor="official_id">Identificación oficial</label>
                    <div className={`${styles.profileEditLineContent} ${!isOfficialIdEditable ? styles.show : styles.hide}`}>{profile_example.official_id || 'No proporcionado'}</div>
                    <input className={`${styles.inputsSearch} ${isOfficialIdEditable ? styles.show : styles.hide}`} id="official_id" type="text" placeholder="Identificación oficial" value={profile_example.official_id} />
                  </div>
                  <div className={styles.profileEditFormLineAction}>
                    <div className={`${styles.enableEdit} ${!isOfficialIdEditable ? styles.show : styles.hide}`} onClick={() => {setIsOfficialIdEditable(true)}}>Editar</div>
                    <div className={`${styles.closeEdit} ${!isOfficialIdEditable ? styles.hide : styles.show}`} onClick={() => {setIsOfficialIdEditable(false)}}>
                      <Image src="/icons/close.png" layout="intrinsic" width={24} height={24} />
                    </div>
                  </div>
                </div>
                <div className={styles.profileEditFormLineSeparator}></div>

                <div className={styles.profileEditFormLine}>
                  <div className={styles.profileEditFormLineInformation}>
                    <label className={styles.profileEditLineLabel} htmlFor="address">Dirección</label>
                    <div className={`${styles.profileEditLineContent} ${!isAddressEditable ? styles.show : styles.hide}`}>{profile_example.address || 'No proporcionado'}</div>
                    <input className={`${styles.inputsSearch} ${isAddressEditable ? styles.show : styles.hide}`} id="address" type="text" placeholder="Direccion" value={profile_example.address} />
                  </div>
                  <div className={styles.profileEditFormLineAction}>
                    <div className={`${styles.enableEdit} ${!isAddressEditable ? styles.show : styles.hide}`} onClick={() => {setIsAddressEditable(true)}}>Editar</div>
                    <div className={`${styles.closeEdit} ${!isAddressEditable ? styles.hide : styles.show}`} onClick={() => {setIsAddressEditable(false)}}>
                      <Image src="/icons/close.png" layout="intrinsic" width={24} height={24} />
                    </div>
                  </div>
                </div>
                <div className={styles.profileEditFormLineSeparator}></div>

                <div className={styles.profileEditFormLine}>
                  <div className={styles.profileEditFormLineInformation}>
                    <label className={styles.profileEditLineLabel} htmlFor="emergency_contact">Contacto de emergencia</label>
                    <div className={`${styles.profileEditLineContent} ${!isEmergencyContactEditable ? styles.show : styles.hide}`}>{profile_example.emergency_contact || 'No proporcionado'}</div>
                    <input className={`${styles.inputsSearch} ${isEmergencyContactEditable ? styles.show : styles.hide}`} id="emergency_contact" type="text" placeholder="Celular" value={profile_example.emergency_contact} />
                  </div>
                  <div className={styles.profileEditFormLineAction}>
                    <div className={`${styles.enableEdit} ${!isEmergencyContactEditable ? styles.show : styles.hide}`} onClick={() => {setIsEmergencyContactEditable(true)}}>Editar</div>
                    <div className={`${styles.closeEdit} ${!isEmergencyContactEditable ? styles.hide : styles.show}`} onClick={() => {setIsEmergencyContactEditable(false)}}>
                      <Image src="/icons/close.png" layout="intrinsic" width={24} height={24} />
                    </div>
                  </div>
                </div>

                <div className={styles.profileEditFormLine}>
                  <input className={`${styles.inputSubmit} ${isEditting ? styles.show : styles.hide}`} type="submit" value="Guardar cambios" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
}

export default Perfil;