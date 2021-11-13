import { useState, useEffect, useRef } from "react";
import { useFormikContext, Formik, Form, Field, withFormik  } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from "yup";
import Layout from '../components/Layout';
import styles from '../styles/Publish.module.css';
import { NUEVO_ANUNCIO, OBTENER_ANUNCIOS } from '../queries/Anuncios/Anuncios.ts';
import { useMutation, gql} from '@apollo/client';

const NuevoAnuncio = () => {

  // State para el mensaje
  const [mensaje, guardarMensaje] = useState(null);
  const settings_example = {
    'type_groups': [
      {'id':"618f54ba7b99028198da66bd", 'label': 'Departamento'},
      {'id':"618f54be7b99028198da66be", 'label': 'Casa'},
      {'id':"618f54c77b99028198da66bf", 'label': 'Vivienda anexa'},
      {'id':"618f54cd7b99028198da66c0", 'label': 'Alojamiento único'},
      {'id':"618f54d47b99028198da66c1", 'label': 'Bed and breakfast'},
      {'id':"618f54db7b99028198da66c2", 'label': 'Hotel boutique'}
    ],
    'types': [
      {'id':"618f54727b99028198da66b8", 'label': 'Casa residencial'},
      {'id':"618f547d7b99028198da66b9", 'label': 'Cabaña'},
      {'id':"618f54837b99028198da66ba", 'label': 'Casona'},
      {'id':"618f548a7b99028198da66bb", 'label': 'Vivienda unifamiliar'},
      {'id':"618f54927b99028198da66bc", 'label': 'Casa rural'}
    ],
    'privacy_types': [
      {'id':"618f54f57b99028198da66c3", 'label': 'Un alojamiento entero'},
      {'id':"618f54fc7b99028198da66c4", 'label': 'Una habitación privada'},
      {'id':"618f55047b99028198da66c5", 'label': 'Una habitación compartida'}
    ]
  } 
  const formRef = useRef();
  const [stepDescription, setStepDescription] = useState(null);
  const [validateStepField, setValidateStepField] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const [data, setData] = useState({
    type_groups: "",
    privacy_types: "",
    types: "",
    street: "",
    dpto: "",
    city: "",
    state: "",
    zip_code: "",
    country: "Argentina",
    guests: 0,
    bedrooms: 0,
    beds: 0,
    offices: 0,
    toilets: 0,
    price: 0,
    per: "",
    description: "",
    title: ""
  });
  const [dataValidated, setDataValidated] = useState(true);
  const [ nuevoAnuncio ] = useMutation(NUEVO_ANUNCIO, {
    update(cache, {data: { nuevoProducto }}) {
      const { obtenerAnuncios } = cache.readQuery({ query: OBTENER_ANUNCIOS });

      cache.writeQuery({
        query: OBTENER_ANUNCIOS,
        data: {
          obtenerAnuncios: [...obtenerAnuncios, nuevoAnuncio]
        }
      })
    }
  });

  useEffect(() => {
    switch(currentStep)
    {
      case 0:
        setValidateStepField(['type_groups']);
        setStepDescription('¿En que tipo de espacio te vas a hospedar?');
      break;
      case 1:
        setValidateStepField(['types']);
        setStepDescription('¿Cuál de estas opciones describe mejor tu espacio?');
      break;
      case 2:
        setValidateStepField(['privacy_types']);
        setStepDescription('¿De qué tipo de espacio van a disponer los huéspedes?');
      break;
      case 3:
        setValidateStepField(['street', 'city', 'country']);
        setStepDescription('¿Dónde queda tu espacio?');
      break;
      case 4:
        setValidateStepField(['guests', 'bedrooms', 'beds', 'toilets', 'price', 'per', 'description', 'title']);
        setStepDescription('Contanos más acerca de tu espacio');
      break;
      default:
      break;
    }

    validateData();
  }, [currentStep]);

  useEffect(() => {
        validateData();
  }, [data]);

  const makeRequest = (formData) => {
    console.log("Form Submitted", formData);
    if (formRef.current) {
      formRef.current.handleSubmit()
    }
  };

  const validateData = function() {
      let result = false;
      for(var i = 0; i < validateStepField.length; i++)
      {
        let fieldToCheck = validateStepField[i];
        if(data[fieldToCheck] == '')
          result = true;  
      }
      setDataValidated(result);
    }

    const checkFields = function() {
      let result = true;
      for(var i = 0; i < validateStepField.length; i++)
      {
        let fieldToCheck = validateStepField[i];

        if(formRef.current.values[fieldToCheck] == "" || Object.keys(formRef.current.errors).indexOf(fieldToCheck) != -1)
          result = false; 
      }
      return result;
    }

  const handleNextStep = () => {

      if(checkFields()) {

        if (currentStep == (steps.length - 1)) {
          makeRequest(formRef.current.values)
          return;
        }

        setCurrentStep((prev) => prev + 1);

      }
  };
  const onFormChange = function(values) {
    setData(values)
  }

  const handlePrevStep = (newData) => {
    if(currentStep > 0)
    {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const steps = [
    <StepOne next={handleNextStep} settings={settings_example} />,
    <StepTwo next={handleNextStep} settings={settings_example} />,
    <StepThree next={handleNextStep} settings={settings_example} />,
    <StepFour next={handleNextStep} settings={settings_example} />,
    <StepFive next={handleNextStep} settings={settings_example} />
  ];

  console.log("data", data);

  const mostrarMensaje = () => {
      return(
          <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
              <p>{mensaje}</p>
          </div>
      )
  }

  return (
    <Layout>
      <div className="min-h-screen flex positionRelative bg-white">
        <div className={styles.newPublicationMain}>
          <div className={styles.newPublicationHalf}>
            <div className={styles.newPublicationDescriptionContainer}>{stepDescription}</div>
          </div>
          <div className={styles.newPublicationHalf}>
            <div className={styles.stepContainer}>
              {mensaje && mostrarMensaje()}
              <Formik
                  innerRef={formRef}
                  initialValues={{type_groups: '', privacy_types: '', types: '', street: '', dpto: '', city: '', state: '', zip_code: '', country: 'Argentina', guests: 0, bedrooms: 0, beds: 0, offices: 0, toilets: 0, price: 0, per: '', description: '', title: ''}} validationSchema={Yup.object({
                     type_groups: Yup.string().required("Seleccione grupo"),
                     types: Yup.string().required("Seleccione tipo"),
                     privacy_types: Yup.string().required("Seleccione privacidad"),
                     street: Yup.string().required("Por favor ingrese la calle"),
                     dpto: Yup.string(),
                     city: Yup.string().required("Por favor ingrese la ciudad"),
                     state: Yup.string(),
                     zip_code: Yup.string(),
                     country: Yup.string().required("Por favor ingrese el país"),
                     guests: Yup.number().min(1,"El mínimo de huéspedes es 1").required("Por favor ingrese la cantidad de huéspedes"),
                     bedrooms: Yup.number().min(1,"El mínimo de habitaciones es 1").required("Por favor ingrese la cantidad de habitaciones"),
                     beds: Yup.number().min(1,"El mínimo de camas es 1").required("Por favor ingrese la cantidad de camas"),
                     offices: Yup.number(),
                     toilets: Yup.number().min(1,"El mínimo de baños es 1").required("Por favor ingrese la cantidad de baños"),
                     price: Yup.number().required("Por favor ingrese el precio"),
                     per: Yup.string().required("Por favor seleccione concepto de cobro"),
                     description: Yup.string().required("Por favor ingrese la descripción"),
                     title: Yup.string().required("Por favor ingrese un título para el anuncio"),
                  })}
                  onSubmit={async (valores) => {
                  
                    const { type_groups, types, privacy_types, street, dpto, city, state, zip_code, country, guests, bedrooms, beds, offices, toilets, price, per, description, title } = valores;
                    try {
                        const { data } = await nuevoAnuncio({
                            variables: {
                                input: {
                                    type_groups,
                                    types,
                                    privacy_types,
                                    street,
                                    dpto,
                                    city,
                                    state,
                                    zip_code,
                                    country,
                                    guests,
                                    bedrooms,
                                    beds,
                                    offices,
                                    toilets,
                                    price,
                                    per,
                                    description, 
                                    title
                                }
                            }
                        });

                        // Usuario creado correctamente
                        guardarMensaje(`Se creo correctamente el Anuncio: ${data.nuevoAnuncio.title} `);

                        setTimeout(() => {
                            guardarMensaje(null);
                            router.push('/anuncios');
                        }, 3000);

                        // Redirecciona usuario al login

                    } catch(error) {
                        guardarMensaje(error.message.replace('GraphQL error: ',''));

                        setTimeout(() => {
                            guardarMensaje(null);
                        }, 3000);
                    }
                  }}
               >
                  {({ values }) => 
                  (
                    <Form className={styles.formContainer}>
                      {onFormChange(values)}
                      {steps[currentStep]}
                    </Form>
                  )}
              </Formik>
            </div>
            <div className={styles.stepFooter}>
              <div className={styles.stepFooterLineBackground}>
                <div className={styles.stepFooterLineBackgroundProgress} style={{width: (100 / steps.length * (currentStep + 1))+'%'}}></div>
              </div>
              <div className={styles.stepFooterButtonsContainer}>
                <div className={`${styles.stepFooterButtons} ${currentStep == 0 ? styles.disabledButtonBack : ""}`} onClick={handlePrevStep}>Atrás</div>
                <div className={`${styles.stepFooterButtons} ${dataValidated ? styles.disabledButtonBackNext : ""}`} onClick={handleNextStep}>Siguiente</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default NuevoAnuncio;

const StepOne = ({settings}) => {
  const { values, setFieldValue } = useFormikContext();
  return (
    <>
      {settings.type_groups.map( type_group => (
        <label key={type_group.id} htmlFor={`type_group`+type_group.id} className={`${styles.labelCheckboxPublication} ${values.type_groups === type_group.id ? styles.isSelected : ''}`}>
          <input type="radio" name="type_groups" value={type_group.id} className={styles.checkboxPublication} checked={values.type_groups === type_group.id} id={`type_group`+type_group.id} onChange={(ev) => setFieldValue("type_groups", type_group.id)} />
          {type_group.label}
        </label>
      ))}
    </>
  );
};

const StepTwo = ({settings}) => {
  const { values, setFieldValue } = useFormikContext();
  return (
    <>
      {settings.types.map( types => (
        <label key={types.id} htmlFor={`types`+types.id} className={`${styles.labelCheckboxPublication} ${values.types === types.id ? styles.isSelected : ''}`}>
          <input type="radio" name="types" value={types.id} className={styles.checkboxPublication} checked={values.types === types.id} id={`types`+types.id} onChange={(ev) => setFieldValue("types", types.id)} />
          {types.label}
        </label>
      ))}
    </>
  );
};

const StepThree = ({settings}) => {
  const { values, setFieldValue } = useFormikContext();
  return (
    <>
      {settings.privacy_types.map( privacy_types => (
        <label key={privacy_types.id} htmlFor={`privacy_types`+privacy_types.id} className={`${styles.labelCheckboxPublication} ${values.privacy_types === privacy_types.id ? styles.isSelected : ''}`}>
          <input type="radio" name="privacy_types" value={privacy_types.id} className={styles.checkboxPublication} checked={values.privacy_types === privacy_types.id} id={`privacy_types`+privacy_types.id} onChange={(ev) => setFieldValue("privacy_types", privacy_types.id)} />
          {privacy_types.label}
        </label>
      ))}
    </>
  );
};

const StepFour = ({settings}) => {
  const { values, setFieldValue, handleChange, handleBlur, touched, errors } = useFormikContext();
  return (
    <>
      { touched.street && errors.street ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{errors.street}</p>
          </div>
      ) : null}
      { touched.dpto && errors.dpto ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{errors.dpto}</p>
          </div>
      ) : null}
      { touched.city && errors.city ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{errors.city}</p>
          </div>
      ) : null}
      { touched.state && errors.state ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{errors.state}</p>
          </div>
      ) : null}
      { touched.zip_code && errors.zip_code ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{errors.zip_code}</p>
          </div>
      ) : null}
      { touched.country && errors.country ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{errors.country}</p>
          </div>
      ) : null}
      <div className={styles.inputFieldsContainer}>
        <div className={styles.titleInputFieldsContainer}>Ingresa tu dirección</div>
        <div className={styles.fullAddressSetterContainer}>
          <div className={styles.addressSetterContainer}>
            <div className={styles.addressSetter}>
              <div className={styles.addressSetterTitle}>Calle</div>
              <input className={styles.inputsSearch} id="street" type="text" placeholder="Ingrese la calle" onChange={handleChange} onBlur={handleBlur} value={values.street} />
            </div>
          </div>
          <div className={styles.addressSetterContainer}>
            <div className={styles.addressSetter}>
              <input className={styles.inputsSearch} id="dpto" type="text" placeholder="Dpto., piso, etc. (opcional)" onChange={handleChange} onBlur={handleBlur} value={values.dpto} />
            </div>
          </div>
          <div className={styles.addressSetterContainer}>
            <div className={styles.addressSetter}>
              <div className={styles.addressSetterTitle}>Ciudad</div>
              <input className={styles.inputsSearch} id="city" type="text" placeholder="Ingrese ciudad" onChange={handleChange} onBlur={handleBlur} value={values.city} />
            </div>
          </div>
          <div className={styles.addressSetterContainer}>
            <div className={styles.addressSetter}>
              <div className={styles.addressSetterTitle}>Provincia/Estado (opcional)</div>
              <input className={styles.inputsSearch} id="state" type="text" placeholder="Ingrese provincia o estado (opcional)" onChange={handleChange} onBlur={handleBlur} value={values.state} />
            </div>
          </div>
          <div className={styles.addressSetterContainer}>
            <div className={styles.addressSetter}>
              <input className={styles.inputsSearch} id="zip_code" type="text" placeholder="Código postal (opcional)" onChange={handleChange} onBlur={handleBlur} value={values.zip_code} />
            </div>
          </div>
          <div className={styles.addressSetterContainer}>
            <div className={styles.addressSetter}>
              <div className={styles.addressSetterTitle}>País o región</div>
              <input className={styles.inputsSearch} id="country" type="text" disabled placeholder="Ingrese país o región" onChange={handleChange} onBlur={handleBlur} value={values.country} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const StepFive = ({settings}) => {
  const { values, setFieldValue, handleChange, handleBlur, touched, errors } = useFormikContext();
  return (
    <>
      { touched.title && errors.title ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{errors.title}</p>
          </div>
      ) : null}
      { touched.guests && errors.guests ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{errors.guests}</p>
          </div>
      ) : null}
      { touched.bedrooms && errors.bedrooms ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{errors.bedrooms}</p>
          </div>
      ) : null}
      { touched.beds && errors.beds ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{errors.beds}</p>
          </div>
      ) : null}
      { touched.offices && errors.offices ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{errors.offices}</p>
          </div>
      ) : null}
      { touched.toilets && errors.toilets ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{errors.toilets}</p>
          </div>
      ) : null}
      { touched.price && errors.price ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{errors.price}</p>
          </div>
      ) : null}
      { touched.per && errors.per ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{errors.per}</p>
          </div>
      ) : null}
      { touched.description && errors.description ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{errors.description}</p>
          </div>
      ) : null}
      <div className={styles.inputFieldsContainer}>
        <div className={styles.titleInputFieldsContainer}>Ingresa más información sobre tu espacio</div>
        <div className={styles.fullAddressSetterContainer}>
          <div className={styles.addressSetterContainer}>
            <div className={styles.addressSetter}>
              <div className={styles.addressSetterTitle}>Título de la publicación</div>
              <input className={styles.inputsSearch} id="title" type="text" placeholder="Ingrese un título para su publicación" onChange={handleChange} onBlur={handleBlur} value={values.title} />
            </div>
          </div>
          <div className={styles.addressSetterContainer}>
            <div className={styles.addressSetter}>
              <div className={styles.addressSetterTitle}>Cantidad de huéspedes máxima</div>
              <input className={styles.inputsSearch} id="guests" type="number" placeholder="Ingrese la cantidad" onChange={handleChange} onBlur={handleBlur} value={values.guests} />
            </div>
          </div>
          <div className={styles.addressSetterContainer}>
            <div className={styles.addressSetter}>
              <div className={styles.addressSetterTitle}>Cantidad total de habitaciones</div>
              <input className={styles.inputsSearch} id="bedrooms" type="number" placeholder="Ingrese cantidad de habitaciones" onChange={handleChange} onBlur={handleBlur} value={values.bedrooms} />
            </div>
          </div>
          <div className={styles.addressSetterContainer}>
            <div className={styles.addressSetter}>
              <div className={styles.addressSetterTitle}>Cantidad total de camas</div>
              <input className={styles.inputsSearch} id="beds" type="number" placeholder="Ingrese cantidad de camas" onChange={handleChange} onBlur={handleBlur} value={values.beds} />
            </div>
          </div>
          <div className={styles.addressSetterContainer}>
            <div className={styles.addressSetter}>
              <div className={styles.addressSetterTitle}>Cantidad total de oficinas</div>
              <input className={styles.inputsSearch} id="offices" type="number" placeholder="Ingrese cantidad de oficinas" onChange={handleChange} onBlur={handleBlur} value={values.offices} />
            </div>
          </div>
          <div className={styles.addressSetterContainer}>
            <div className={styles.addressSetter}>
              <div className={styles.addressSetterTitle}>Cantidad total de baños</div>
              <input className={styles.inputsSearch} id="toilets" type="number" placeholder="Ingrese cantidad de baños" onChange={handleChange} onBlur={handleBlur} value={values.toilets} />
            </div>
          </div>
          <div className={styles.addressSetterContainer}>
            <div className={styles.addressSetter}>
              <div className={styles.addressSetterTitle}>Precio</div>
              <input className={styles.inputsSearch} id="price" type="number" placeholder="Ingrese ciudad" onChange={handleChange} onBlur={handleBlur} value={values.price} />
            </div>
            <div className={styles.addressSetter}>
              <div className={styles.addressSetterTitle}>Cobra por</div>
              <select className={styles.inputsSearch} id="per" value={values.per} onChange={handleChange} onBlur={handleBlur}>
                <option value="" label="Seleccione cobro por" />
                <option value="noche" label="Noche" />
                <option value="dia" label="Día" />
              </select>
            </div>
          </div>
          <div className={styles.addressSetterContainer}>
            <div className={styles.addressSetter}>
              <div className={styles.addressSetterTitle}>Ingrese un breve descripción de su espacio</div>
              <textarea className={styles.inputsSearch} id="description" type="number" placeholder="Ingrese descripción" onChange={handleChange} onBlur={handleBlur} value={values.description} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};