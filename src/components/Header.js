import styles from '../styles/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';

import { DatePicker } from '@material-ui/pickers';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function useComponentSetVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const refDropdown = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = event => {
  	console.log(isComponentVisible)
    if (refDropdown.current && !refDropdown.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { refDropdown, isComponentVisible, setIsComponentVisible };
}

function useComponentSetOpen(initialIsOpen) {
  const [isComponentOpen, setIsComponentOpen] = useState(
    initialIsOpen
  );
  const refOpen = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setIsComponentOpen(false);
    }
  };

  const handleClickOutside = event => {
  	console.log(isComponentOpen)
    if (refOpen.current && !refOpen.current.contains(event.target)) {
      setIsComponentOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { refOpen, isComponentOpen, setIsComponentOpen };
}

const Header = () => {

	const { pathname, query, isReady, push } = useRouter();

	const {
	    refDropdown,
	    isComponentVisible,
	    setIsComponentVisible
	} = useComponentSetVisible(false);

	const {
	    refOpen,
	    isComponentOpen,
	    setIsComponentOpen
	} = useComponentSetOpen(false);

	const [offset, setOffset] = useState(0);
	const [headerStyle, setHeaderStyle] = useState(styles.openHeader);
	const [selectedStartDate, handleStartDateChange] = useState();
	const [selectedEndDate, handleEndDateChange] = useState();
	const [totalGuests, setTotalGuests] = useState(0);
	const [labelGuests, setLabelGuests] = useState('¿Cuántos?');
	const [filter, setFilter] = useState('basic');
	const [showSearchBox, setShowSearchBox] = useState(false);
	const today = new Date();
	const tomorrow = new Date(today);
		  tomorrow.setDate(tomorrow.getDate() + 1);

	useEffect(function onFirstMount() {
	    window.onscroll = () => {
	      setOffset(window.pageYOffset)
	    }
	}, []);

	
	useEffect(() => {
		if(typeof query != 'undefined' && Object.keys(query).length > 0)
		{
			handleStartDateChange(new Date(moment.unix(parseInt(query.startDate)).format('MM/DD/yyyy')));
			handleEndDateChange(new Date(moment.unix(parseInt(query.endDate)).format('MM/DD/yyyy')));
			formik.setFieldValue('startDate', new Date(moment.unix(parseInt(query.startDate)).format('MM/DD/yyyy')));
			formik.setFieldValue('endDate', new Date(moment.unix(parseInt(query.endDate)).format('MM/DD/yyyy')));
		}
	}, [query]);

	useEffect(() => {
		if(offset > 0 || pathname !== '/')
		{
			setShowSearchBox(false)
			setHeaderStyle(styles.closedHeader)
		}
		else
		{
			setShowSearchBox(true)
			setHeaderStyle(styles.openHeader)
		}
	}, [offset])

	useEffect(() => {
		if(totalGuests > 0)
		{
			let word = 'Huéspedes';
			if(totalGuests == 1)
				word = 'Huésped';
			setLabelGuests(totalGuests + ' ' + word);
		}
		else
		{
			setLabelGuests('¿Cuántos?');
		}

		formik.setFieldValue('guests', totalGuests);
	}, [totalGuests])

	const checkNewGuestsNumber = function(operation) {
		if(operation == '-')
		{
			if(totalGuests - 1 >= 0)
			{
				setTotalGuests(totalGuests - 1)
			}
		} 
		else
		{
			setTotalGuests(totalGuests + 1)
		}
	}

	const formik = useFormik({
        initialValues: {
            place: '',
            startDate: tomorrow,
            endDate: tomorrow,
            guests: totalGuests
        },
        validationSchema: Yup.object({
            place: Yup.string().required('Debe seleccionar un lugar'),
            startDate: Yup.date().min(today).max(Yup.ref('endDate')),
            endDate: Yup.date().min(Yup.ref('startDate')),
            guests: Yup.number().required('Por favor ingrese el número de huéspedes')
        }),
        onSubmit: async valores => {
            const { place, startDate, endDate, guests} = valores;

            let firstDate = '';
            let secondDate = '';
            if (typeof startDate.format === "function") { 
			    firstDate = startDate.format('X');
			}
			else
			{
				firstDate = moment(startDate).format('X');
			}
			if (typeof endDate.format === "function") { 
			    secondDate = endDate.format('X');
			}
			else 
			{
				secondDate = moment(endDate).format('X');
			}
            push({
	          pathname: '/propiedades',
	          query: { place, startDate: firstDate, endDate: secondDate, guests },
	        })
            // try {

            //     const { data } = await createBroker({
            //         variables: {
            //             brokerInput: {
            //                 name,
            //                 address
            //             }
            //         }
            //     }) 
            //     // console.log(data.createBroker);
            //     router.push('/') // Redireccionar hacia clientes
            // } catch(error) {
            //     guardarMensaje(error.message.replace('GraphQL error: ',''));
                
            //     setTimeout(() => {
            //         guardarMensaje(null);
            //     }, 2000);
            // }
        }
    });

    const mostrarMensaje = () => {
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

	return(
		<header className={`${headerStyle} ${pathname !== "/" ? styles.insideSection : ""}`}>
			<div className={styles.topHeaderContainer}>
				<div className={styles.logo}>
					<Link href="/">
						<a className={styles.logoContainer}>
			          		<Image src="/assets/logo.png" height={160} width={240} layout="intrinsic" />
						</a>
			        </Link>
				</div>
				<div className={styles.filterBar}>
					<div className={`${styles.searchToggleButton} ${!showSearchBox ? styles.show  : styles.hide}`} onClick={() => {setShowSearchBox(true)}}>
						<div className={styles.searchToggleButtonText}>Empezá tu búsqueda</div>
						<div className={styles.searchSubmit}>
                        	<Image src="/icons/search.png" layout="intrinsic" width={48} height={48} />
	                    </div>
	                </div>
					<nav className={`${styles.navList} ${showSearchBox ? styles.show  : styles.hide}`}>
						<li>
							<div>Lugares donde alojarse</div>
							<div className={`${styles.navLine} ${filter === "basic" ? styles.show  : styles.hide}`}></div>
						</li>
					</nav>
				</div>
				<div className={styles.userOptions}>
					<div className={styles.optionUserOptions}>Sé anfitrión</div>
					<div className={styles.optionUserOptions}>
						<div className={`${styles.settingsWhite} ${styles.settingsIconContainer}`}>
							<Image src="/icons/settings_w.png" height={40} width={40} layout="intrinsic" />
						</div>
						<div className={`${styles.settingsBlack} ${styles.settingsIconContainer}`}>
							<Image src="/icons/settings_b.png" height={40} width={40} layout="intrinsic" />
						</div>
					</div>
					<div  ref={refDropdown} className={styles.accountModalPositionPivot}>
						<div className={styles.accountMenuContainer}>
							<div className={styles.menuIconContainer} onClick={() => {setIsComponentVisible(true)}}>
								<Image src="/icons/menu.png" height={40} width={40} layout="intrinsic" />
							</div>
							<div className={styles.accountIconContainer} onClick={() => {setIsComponentVisible(true)}}>
								<Image src="/icons/account.png" height={40} width={40} layout="intrinsic" />
							</div>
						</div>
						<div className={`${styles.modalAccountMenu} ${isComponentVisible ? styles.show  : styles.hide}`}>
							<div className={styles.linkMenuAccount}>
								<div className={styles.textMenuAccount}>
									Registrate
								</div>
							</div>
							<div className={styles.linkMenuAccount}>
								<div className={styles.textMenuAccount}>
									Iniciar sesión
								</div>
							</div>
							<div className={styles.linkMenuAccount}>
								<Link href="/perfil">
								  <a className={styles.textMenuAccount}>Cuenta</a>
								</Link>
							</div>
							<div className={styles.linkMenuAccount}>
								<Link href="/anuncios">
								  <a className={styles.textMenuAccount}>Administrar anuncios</a>
								</Link>
							</div>
							<div className={styles.linkMenuAccount}>
								<div className={styles.textMenuAccount}>
									Convertite en anfitrión
								</div>
							</div>
							<div className={styles.linkMenuAccount}>
								<div className={styles.textMenuAccount}>
									Ayuda
								</div>
							</div>
						</div>
					</div>
				</div>	
			</div>
			<div className={`${styles.bottomHeaderContainer} ${showSearchBox ? styles.show  : styles.hide}`}>
				<div className={styles.formContainer}>
					<form className={styles.formStyles} onSubmit={formik.handleSubmit}>
                        <div className={styles.inputContainer}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="place">
                                Lugar
                            </label>
                            <input className={styles.inputsSearch} id="place" type="text" placeholder="¿A d&oacute;nde vas?" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.place} />
	                        { formik.touched.place && formik.errors.place ? (
	                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
	                                <p className="font-bold">Error</p>
	                                <p>{formik.errors.place}</p>
	                            </div>
	                        ) : null}
                        </div>


                        <div className={styles.inputContainer}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                                Check-in
                            </label>
                        	<DatePicker format="DD/MM/yyyy" value={formik.values.startDate}  onChange={(val) => {
			                    handleStartDateChange(val);
			                    formik.setFieldValue('startDate', val);
			                }} id="startDate" disablePast="true" onBlur={formik.handleBlur} />
			                { formik.touched.startDate && formik.errors.startDate ? (
	                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
	                                <p className="font-bold">Error</p>
	                                <p>{formik.errors.startDate}</p>
	                            </div>
	                        ) : null}
                        </div>

                        <div className={styles.inputContainer}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                                Check-out
                            </label>
                        	<DatePicker format="DD/MM/yyyy" value={formik.values.endDate} onChange={(val) => {
			                    handleEndDateChange(val);
			                    formik.setFieldValue('endDate', val);
			                }} id="endDate" disablePast="true" minDate={selectedStartDate} onBlur={formik.handleBlur} />
			                { formik.touched.endDate && formik.errors.endDate ? (
	                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
	                                <p className="font-bold">Error</p>
	                                <p>{formik.errors.endDate}</p>
	                            </div>
	                        ) : null}
                        </div>

                        <div className={styles.inputContainer}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guests" onClick={() => {setIsComponentOpen(true)}}>
                                Huéspedes
                            </label>
                            <div className={`${styles.inputsSearch} ${totalGuests > 0 ? styles.filled  : styles.empty}`} onClick={() => {setIsComponentOpen(true)}}>{labelGuests}</div>
                            <input className={styles.submitHidden} id="guests" value={totalGuests} onChange={formik.handleChange} />
                            { formik.touched.guests && formik.errors.guests ? (
	                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
	                                <p className="font-bold">Error</p>
	                                <p>{formik.errors.guests}</p>
	                            </div>
	                        ) : null}
                            <div ref={refOpen} className={`${styles.modalGuests} ${isComponentOpen ? styles.show  : styles.hide}`}>
	                            <div className={styles.option}>
	                            	<div>
	                            		<div className={styles.title}>Adultos</div>
	                            		<div className={styles.subtitle}>De 13 años o más</div>
	                            	</div><div>
		                            	<span className={styles.searchCounterOptionLess} onClick={() => {checkNewGuestsNumber('-')}}>-</span>
		                            	<span className={styles.totalGuestsNumber}>{totalGuests}</span>
		                            	<span className={styles.searchCounterOptionPlus} onClick={() => {checkNewGuestsNumber('+')}}>+</span>
	                            	</div>
	                            </div>
                            </div>
                        </div>

                        <div className={styles.inputContainer}>
	                        <label className={styles.searchSubmit} htmlFor="sendSearchHeader">
	                        	<Image src="/icons/search.png" layout="intrinsic" width={48} height={48} />
	                        </label>
	                        <input type="submit" id="sendSearchHeader" className={styles.submitHidden} value="Enviar" />
                        </div>

                    </form>
					
				</div>
			</div>
		</header>
	);
}

export default Header;