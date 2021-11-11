import { useState, useEffect, useRef } from "react";
import { useFormikContext, Formik, Form, Field, withFormik, useFormik  } from 'formik';
import * as Yup from "yup";
import styles from '../styles/Login.module.css';
import { DatePicker } from '@material-ui/pickers';

const ModalLoginRegister = ({form}) => {

	/* ---------------- States registro -------------------- */
		const formRef = useRef();
		const [validateStepField, setValidateStepField] = useState([]);
		const [currentStep, setCurrentStep] = useState(0);
		const [data, setData] = useState({
		    email: "",
		    password: "",
		    confirm: "",
		    birthday: "",
		    gender: "",
		    name: "",
		    last_name: ""
		});
		const [dataValidated, setDataValidated] = useState(true);
		
		const today = new Date();
		var eighteenYearsAgo = new Date();
			eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
	/* ------------------------------------------------------ */
	/* ----------------- States generales ------------------- */
		const [ mensaje, guardarMensaje ] = useState(null);
		const [ whichForm, setWhichForm ] = useState(form);
	/* ------------------------------------------------------ */

	/* -------------------------------- Funciones login -------------------------- */
		const formik = useFormik({
		    initialValues: {
		        email: '',
		        password: ''
		    },
		    validationSchema: Yup.object({
		        email: Yup.string().email('El email no es válido').required('El email no puede ir vacío'),
		        password: Yup.string().required('El password es obligatorio')
		    }),
		    onSubmit: async valores => {
		        /*const { email, password } = valores;

		        try {
		            const { data } = await autenticarUsuario({
		                variables: {
		                    input: {
		                        email,
		                        password
		                    }
		                }
		            }) 

		            console.log(data);
		            guardarMensaje('Autenticando...');

		            // Guardar el token en localstorage
		            const { token } = data.autenticarUsuario;
		            localStorage.setItem('token', token); 

		            // Redireccionar hacia clientes
		            setTimeout(() => {
		                guardarMensaje(null);
		                router.push('/');
		            }, 2000);

		        } catch(error) {
		            guardarMensaje(error.message.replace('GraphQL error: ',''));

		            setTimeout(() => {
		                guardarMensaje(null);
		            }, 3000);
		        }*/
		    }
		})

	  	const mostrarMensaje = () => {
		    return(
		        <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
		            <p>{mensaje}</p>
		        </div>
		    )
		}
	/* --------------------------------------------------------------------------- */
	/* -------------------------------- Funciones registro ----------------------- */
		useEffect(() => {
		    switch(currentStep)
		    {
		      case 0:
		        setValidateStepField(['email', 'password', 'confirm']);		      
		      break;
		      case 1:
		        setValidateStepField(['name', 'last_name', 'gender', 'birthday']); 
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
		    <StepOne next={handleNextStep} />,
		    <StepTwo next={handleNextStep} />,
		];
	/* --------------------------------------------------------------------------- */
  	return (
	  	<>
	      {mensaje && mostrarMensaje()}
	      {whichForm == 'login' ? (

	        <div className={styles.formContainer}>
	        	<div className={styles.titleInputFieldsContainer}>Inicia sesión</div>
	            <form className={styles.inputFieldsContainer} onSubmit={formik.handleSubmit}>
	            	{ formik.touched.email && formik.errors.email ? (
	                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
	                        <p className="font-bold">Error</p>
	                        <p>{formik.errors.email}</p>
	                    </div>
	                ) : null}
	                { formik.touched.password && formik.errors.password ? (
	                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
	                        <p className="font-bold">Error</p>
	                        <p>{formik.errors.password}</p>
	                    </div>
	                ) : null}
	                <div className={styles.fullLoginSetterContainer}>
			          	<div className={styles.loginSetterContainer}>
				            <div className={styles.loginSetter}>
				              <label className={styles.loginSetterTitle} htmlFor="email">Email</label>
				              <input className={styles.inputsSearch} id="email" type="email" placeholder="Email Usuario" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
				            </div>
			          	</div>
			          	<div className={styles.loginSetterContainer}>
				            <div className={styles.loginSetter}>
				              <label className={styles.loginSetterTitle} htmlFor="password">Contraseña</label>
				              <input className={styles.inputsSearch} id="password" type="password" placeholder="Contraseña Usuario" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
				            </div>
			          	</div>
			        </div>
			        <div className={styles.changeFormContainer}>Si aún no estas registrado hace <strong className={styles.changeFormLink} onClick={() => {setWhichForm('registro')}}>click aquí</strong></div>
	                <input type="submit" className={styles.submitLogin} value="Iniciar Sesión" />
	            </form>
	        </div>

	      ) : (

	      	<div className={styles.formContainer}>
	            <div className={styles.stepContainer}>
	              <Formik
	                  innerRef={formRef}
	                  initialValues={{
	                  	email: "",
					    password: "",
					    confirm: "",
					    name: "",
					    last_name: "",
					    gender: "",
	                  }} 
	                  validationSchema={Yup.object({
		        		email: Yup.string().email('El email no es válido').required('Por favor ingrese su email'),
            			password: Yup.string().required('El password no puede ir vacío').min(6, 'La contraseña debe ser de al menos 6 caracteres'),
	                    confirm: Yup.string().oneOf([Yup.ref('password'), null], "Las contraseñas no coinciden").required('El password es obligatorio'),
	                    name: Yup.string().required('Por favor ingrese su nombre'),
	                    last_name: Yup.string().required('Por favor ingrese su apellido'),
	                    gender: Yup.string().required('Por favor seleccione su género'),
	                    birthday: Yup.date().max(eighteenYearsAgo, "Debe ser mayor de 18 años").required('Por favor ingrese su fecha de nacimiento'),
	                  })}
	                  onSubmit={async (valores) => {
	                      //const { place, startDate, endDate, guests} = valores;
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
            	  <div className={styles.changeFormContainer}>Si ya estas registrado hace <strong className={styles.changeFormLink} onClick={() => {setWhichForm('login')}}>click aquí</strong></div>
	              <div className={styles.stepFooterButtonsContainer}>
	                <div className={`${styles.stepFooterButtons} ${currentStep == 0 ? styles.disabledButtonBack : ""}`} onClick={handlePrevStep}>Atrás</div>
	                <div className={`${styles.stepFooterButtons} ${dataValidated ? styles.disabledButtonBackNext : ""}`} onClick={handleNextStep}>Siguiente</div>
	              </div>
	            </div>
	          </div>
	      )}
	    </>
  	);
}
export default ModalLoginRegister;

const StepOne = () => {
  const { values, setFieldValue, handleChange, handleBlur, touched, errors } = useFormikContext();
  return (
    <>
    	{ touched.email && errors.email ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{errors.email}</p>
            </div>
        ) : null}
        { touched.password && errors.password ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{errors.password}</p>
            </div>
        ) : null}
        { touched.confirm && errors.confirm ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{errors.confirm}</p>
            </div>
        ) : null}
      <div className={styles.inputFieldsContainer}>
        <div className={styles.titleInputFieldsContainer}>Ingresa los datos de tu cuenta</div>
        <div className={styles.fullLoginSetterContainer}>
          <div className={styles.loginSetterContainer}>
            <div className={styles.loginSetter}>
              <label className={styles.loginSetterTitle} htmlFor="email">Email</label>
              <input className={styles.inputsSearch} id="email" name="email" type="email" placeholder="Email Usuario" onChange={handleChange} onBlur={handleBlur} value={values.email} />
            </div>
          </div>
          <div className={styles.loginSetterContainer}>
            <div className={styles.loginSetter}>
              <label className={styles.loginSetterTitle} htmlFor="password">Contraseña</label>
              <input className={styles.inputsSearch} id="password" name="password" type="password" placeholder="Contraseña Usuario" onChange={handleChange} onBlur={handleBlur} value={values.password} />
            </div>
          </div>
          <div className={styles.loginSetterContainer}>
            <div className={styles.loginSetter}>
              <label className={styles.loginSetterTitle} htmlFor="confirm">Confirmar Contraseña</label>
              <input className={styles.inputsSearch} id="confirm" name="confirm" type="password" placeholder="Contraseña Usuario" onChange={handleChange} onBlur={handleBlur} value={values.confirm} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const StepTwo = () => {
  const { values, setFieldValue, handleChange, handleBlur, touched, errors } = useFormikContext();
  return (
    <>
    	{ touched.name && errors.name ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{errors.name}</p>
            </div>
        ) : null}
        { touched.last_name && errors.last_name ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{errors.last_name}</p>
            </div>
        ) : null}
        { touched.gender && errors.gender ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{errors.gender}</p>
            </div>
        ) : null}
    	{ touched.birthday && errors.birthday ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{errors.birthday}</p>
            </div>
        ) : null}
      	<div className={styles.inputFieldsContainer}>
	        <div className={styles.titleInputFieldsContainer}>Contanos más sobre vos</div>
	        <div className={styles.fullLoginSetterContainer}>
	        	<div className={styles.loginSetterContainer}>
		            <div className={styles.loginSetter}>
		              <label className={styles.loginSetterTitle} htmlFor="name">Nombre</label>
		              <input className={styles.inputsSearch} id="name" name="name" type="text" placeholder="Ingrese su nombre" onChange={handleChange} onBlur={handleBlur} value={values.name} />
		            </div>
		        </div>
		        <div className={styles.loginSetterContainer}>
		            <div className={styles.loginSetter}>
		              <label className={styles.loginSetterTitle} htmlFor="last_name">Apellido</label>
		              <input className={styles.inputsSearch} id="last_name" name="last_name" type="text" placeholder="Ingrese su apellido" onChange={handleChange} onBlur={handleBlur} value={values.last_name} />
		            </div>
		        </div>
		        <div className={styles.loginSetterContainer}>
		            <div className={styles.loginSetter}>
		              <label className={styles.loginSetterTitle} htmlFor="last_name">Elija su género</label>
		              <div className="radio">
				          <label>
				            <input type="radio" value="masculino" checked={values.gender === "Male"} onChange={(ev) => setFieldValue("gender", 'masculino')} /> Masculino 
				          </label>
				        </div>
				        <div className="radio">
				          <label>
				            <input type="radio" value="femenino" checked={values.gender === "femenino"} onChange={(ev) => setFieldValue("gender", 'femenino')} /> Femenino 
				          </label>
				        </div>
				        <div className="radio">
				          <label>
				            <input type="radio" value="otro" checked={values.gender === "otro"} onChange={(ev) => setFieldValue("gender", 'otro')} /> Otro
				          </label>
				        </div>
		            </div>
		        </div>
	            <div className={styles.loginSetterContainer}>
		            <div className={`${styles.loginSetter} loginSetter`}>
		            	<label className={styles.loginSetterTitle} htmlFor="birthday">Ingrese fecha de nacimiento</label>
		              	<DatePicker format="DD/MM/yyyy" value={values.birthday} onChange={(val) => {
			                setFieldValue('birthday', val);
			            }} id="birthday" name="birthday" disableFuture={true} onBlur={handleBlur} />
		            </div>
	          	</div>
	        </div>
      </div>
    </>
  );
};