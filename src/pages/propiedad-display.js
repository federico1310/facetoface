import { useState, useEffect, useRef } from "react";
import moment from 'moment';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import styles from '../styles/PropertyDisplay.module.css';
import Map from '../components/Map';
import { DatePicker } from '@material-ui/pickers';
import { render } from 'react-dom';
import Gallery from 'react-grid-gallery';
import Image from 'next/image';
import Modal from 'react-modal';
// import { OBTENER_PROPIEDADES } from '../queries/Propiedades/Propiedades.ts';

function useComponentCancelSelection(initialIsSelected) {
  const [isComponentSelected, setIsComponentSelected] = useState(
    initialIsSelected
  );
  const ref = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setIsComponentSelected(false);
    }
  };

  const handleClickOutside = event => {
  	console.log(isComponentSelected)
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentSelected(false);
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

  return { ref, isComponentSelected, setIsComponentSelected };
}

const PropiedadDisplay = () => {
	const {
	    ref,
	    isComponentSelected,
	    setIsComponentSelected
	} = useComponentCancelSelection(false);
	const [totalGuests, setTotalGuests] = useState(0);
	const [labelGuests, setLabelGuests] = useState('1 Huésped');

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
			let guests = 1;
			let word = 'Huésped';
			setLabelGuests(guests + ' ' + word);
		}

		//formik.setFieldValue('guests', totalGuests);
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

	const customStyles = {
	  overlay: {
	  	zIndex: 10
	  },
	  content: {
	    top: '50%',
	    left: '50%',
	    right: 'auto',
	    bottom: 'auto',
	    marginRight: '-50%',
	    transform: 'translate(-50%, -50%)',
	    width: '40%',
	    padding: '60px 20px 40px 20px',
	    borderRadius: '20px'
	  },
	};
	const properties_example = {
		'id':1,
		'real_property_name':'Casa entero en Tigre',
		'fake_property_name':'Muy buena casa en Tigre, es para visitarla, no se la pierdan',
		'price':'41',
		'per':'noche',
		'guests':4,
		'rooms': {
			'bedrooms':3,
			'offices':2
		},
		'beds':2,
		'toilets':4,
		'thumbnails': [
			{
				'id':1,
				'path':'/assets/properties/property_1.jpg',
				'original_height':800,
				'original_width':1200
			},
			{
				'id':2,
				'path':'/assets/properties/property_2.jpg',
				'original_height':600,
				'original_width':800
			},
			{
				'id':3,
				'path':'/assets/properties/property_3.jpg',
				'original_height':408,
				'original_width':612
			}
		],
		"images": [
			{
				'src': "/assets/properties/property_1.jpg",
		        'thumbnail': "/assets/properties/property_1.jpg",
		        'thumbnailWidth': 600,
		        'thumbnailHeight': 400,
		        'isSelected': false,
		        'caption': "Esto"
			},
			{
				'src': "/assets/properties/property_2.jpg",
		        'thumbnail': "/assets/properties/property_2.jpg",
		        'thumbnailWidth': 400,
		        'thumbnailHeight': 200,
		        'isSelected': false,
		        'caption': "Esto 2"
			},
			{
				'src': "/assets/properties/property_3.jpg",
		        'thumbnail': "/assets/properties/property_3.jpg",
		        'thumbnailWidth': 153,
		        'thumbnailHeight': 102,
		        'isSelected': false,
		        'caption': "Esto"
			},
			{
				'src': "/assets/properties/property_1.jpg",
		        'thumbnail': "/assets/properties/property_1.jpg",
		        'thumbnailWidth': 320,
		        'thumbnailHeight': 174,
		        'isSelected': false,
		        'caption': "Esto"
			},
			{
				'src': "/assets/properties/property_2.jpg",
		        'thumbnail': "/assets/properties/property_2.jpg",
		        'thumbnailWidth': 320,
		        'thumbnailHeight': 174,
		        'isSelected': false,
		        'caption': "Esto 2"
			},
			{
				'src': "/assets/properties/property_3.jpg",
		        'thumbnail': "/assets/properties/property_3.jpg",
		        'thumbnailWidth': 320,
		        'thumbnailHeight': 174,
		        'isSelected': false,
		        'caption': "Esto"
			},
			{
				'src': "/assets/properties/property_1.jpg",
		        'thumbnail': "/assets/properties/property_1.jpg",
		        'thumbnailWidth': 320,
		        'thumbnailHeight': 174,
		        'isSelected': false,
		        'caption': "Esto"
			},
			{
				'src': "/assets/properties/property_2.jpg",
		        'thumbnail': "/assets/properties/property_2.jpg",
		        'thumbnailWidth': 320,
		        'thumbnailHeight': 174,
		        'isSelected': false,
		        'caption': "Esto 2"
			},
			{
				'src': "/assets/properties/property_3.jpg",
		        'thumbnail': "/assets/properties/property_3.jpg",
		        'thumbnailWidth': 320,
		        'thumbnailHeight': 174,
		        'isSelected': false,
		        'caption': "Esto"
			},
			{
				'src': "/assets/properties/property_1.jpg",
		        'thumbnail': "/assets/properties/property_1.jpg",
		        'thumbnailWidth': 500,
		        'thumbnailHeight': 174,
		        'isSelected': false,
		        'caption': "Esto"
			},
			{
				'src': "/assets/properties/property_2.jpg",
		        'thumbnail': "/assets/properties/property_2.jpg",
		        'thumbnailWidth': 320,
		        'thumbnailHeight': 174,
		        'isSelected': false,
		        'caption': "Esto 2"
			},
			{
				'src': "/assets/properties/property_3.jpg",
		        'thumbnail': "/assets/properties/property_3.jpg",
		        'thumbnailWidth': 320,
		        'thumbnailHeight': 174,
		        'isSelected': false,
		        'caption': "Esto"
			}
		],
		"description": "Magna ut veniam ea consectetur cillum adipisicing duis consectetur duis.  \
						Sunt id consectetur qui pariatur in ut occaecat duis enim dolore laborum laborum id cillum ad ut pariatur labore. \
						Magna aute eiusmod eiusmod sit adipisicing proident sint fugiat nostrud et. Magna ut veniam ea consectetur cillum adipisicing duis consectetur duis.  \
						Sunt id consectetur qui pariatur in ut occaecat duis enim dolore laborum laborum id cillum ad ut pariatur labore. \
						Magna aute eiusmod eiusmod sit adipisicing proident sint fugiat nostrud et. Magna ut veniam ea consectetur cillum adipisicing duis consectetur duis.  \
						Sunt id consectetur qui pariatur in ut occaecat duis enim dolore laborum laborum id cillum ad ut pariatur labore. \
						Magna aute eiusmod eiusmod sit adipisicing proident sint fugiat nostrud et.",
		"host": {
			"id": 1,
			"first_name": "Alan",
			"last_name": "Silvero",
			"profile_image": "" 
		},
		"type": "Casa entero",
		"location": "La Falda, Provincia de Córdoba, Argentina",
		"coordinates": {
			"latitude":-34.661003, 
			"longitude":-58.489005
		}
	};
	const { query, isReady } = useRouter();
	const [modalIsOpen, setIsOpen] = useState(false);
	const [totalDays, setTotalDays] = useState(1);

	function openModal() {
	    setIsOpen(true);
	}

	function afterOpenModal() {
	   
	}

	function closeModal() {
	    setIsOpen(false);
	}

	if(!isReady)
		return null;
	
	// const { data, loading, error } = useQuery(OBTENER_PROPIEDADES);
	
	  // if(loading) return 'Cargando...';

	let guestsText = '';
    let word = 'Huéspedes';
    if(properties_example.guests == 1)
        word = 'Huésped';

    guestsText = properties_example.guests + ' ' + word;

    let roomsText = '';
    if(properties_example.rooms.bedrooms > 0)
    {
        let wordRoom = 'Habitaciones';
        if(properties_example.rooms.bedrooms == 1)
            wordRoom = 'Habitación';

        roomsText = properties_example.rooms.bedrooms + ' ' + wordRoom;
    }
    else
    {
        let wordRoom = 'Estudios';
        if(properties_example.rooms.offices == 1)
            wordRoom = 'Estudio';

        roomsText = properties_example.rooms.offices + ' ' + wordRoom;
    }

    let bedsText = '';
    let wordBed = 'Camas';
    if(properties_example.beds == 1)
        wordBed = 'Cama';

    bedsText = properties_example.beds + ' ' + wordBed;

    let toiletsText = '';
    let wordToilet = 'Baños';
    if(properties_example.toilets == 1)
        wordToilet = 'Baño';

    toiletsText = properties_example.toilets + ' ' + wordToilet;

	  return (
	    <Layout>
	    	<div className="min-h-screen flex positionRelative bg-white">
	    		<div className={`${styles.propertyDisplayMain} mainPropertyDisplay`}>
		    		<div className={styles.titleContainer}>
		    			<div className={styles.fakePropertyName}>{properties_example.fake_property_name}</div>
		    			<div className={styles.amenitiesInformation}>
		    				<div className={styles.amenitiesInformationOption}>{properties_example.location}</div>
		    				<div className={styles.amenitiesInformationSeparator}>|</div>
		    				<div className={styles.amenitiesInformationOption}>{guestsText}</div>
		    				<div className={styles.amenitiesInformationSeparator}>|</div>
		    				<div className={styles.amenitiesInformationOption}>{roomsText}</div>
		    				<div className={styles.amenitiesInformationSeparator}>|</div>
		    				<div className={styles.amenitiesInformationOption}>{bedsText}</div>
		    				<div className={styles.amenitiesInformationSeparator}>|</div>
		    				<div className={styles.amenitiesInformationOption}>{toiletsText}</div>
		    			</div>
		    		</div>
		    		<div className={styles.propertyGalleryContainer}>
		    			<Gallery enableImageSelection={false} images={properties_example.images} rowHeight={480} maxRows={1} margin={0} enableLightbox={true}/>
		    		</div>
		    		<div className={styles.moreInformationSection}>
		    			<div className={styles.moreInformationLeft}>
		    				<div className={styles.hostInformationContainer}>
		    					<div className={styles.hostInformationPart}>
	    							<div className={styles.hostInformation}>{properties_example.type} - Anfitrión: {properties_example.host.first_name}</div>
		    					</div>
		    					<div className={styles.hostInformationPart}>
		    						<div className={styles.profilePhotoContainer}>
		    							<Image src="/assets/places/bs_as.jpg" height={400} width={400} layout="intrinsic" className={styles.profilePhoto} />
		    						</div>
		    					</div>
		    				</div>
		    				<div className={styles.goodToKnowContainer}>
		    					<div className={styles.goodToKnowText}>{properties_example.description}</div>
		    					{properties_example.description.length > 200 ? (
		    						<>
						                <button onClick={openModal} className={styles.goodToKnowShowMore}>Mostrar más ></button>
						                <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={closeModal} contentLabel="Example Modal">
									        <button onClick={closeModal} className="closeModal">
						                        X
									        </button>
									        <div>{properties_example.description}</div>
									    </Modal>
									</>
           	 					) : <></>}
		    					
		    				</div>
		    				<div className={styles.datesSelectorContainer}>
		    					<div className={styles.datesSelectorTop}>
		    						<div className={styles.datesSelectorTitle}>Seleccioná la fecha del check-in</div>
		    						<div className={styles.datesSelectorCaption}>Agregá tus fechas de viaje para obtener precios exactos</div>
		    					</div>
		    					<div className={styles.datesSelectorBottom}>
						    		<div>
						    			<DatePicker format="DD/MM/yyyy" variant="static" />
						    		</div>
						    		<div>
								    	<DatePicker format="DD/MM/yyyy" variant="static" />	    		
						    		</div>
		    					</div>
		    				</div>

		    			</div>
		    			<div className={styles.moreInformationRight}>
		    				<div className={styles.disponibilityContainer}>
		    					<div className={styles.disponibilityBox}>
		    						<div className={styles.priceLine}><strong>${properties_example.price}</strong> / {properties_example.per}</div>
		    						<div className={styles.dateGuestsSelectorContainer}>
		    							<div className={`${styles.dateSelectorContainer} dateSelector`}>
			    							<div className={styles.dateSelector}>
			    								<div className={styles.dateSelectorTitle}>CHECK-IN</div>
			    								<DatePicker format="DD/MM/yyyy" />
			    							</div>
			    							<div className={styles.dateSelector}>
			    								<div className={styles.dateSelectorTitle}>CHECK-OUT</div>
			    								<DatePicker format="DD/MM/yyyy" />
			    							</div>
		    							</div>
		    							<div ref={ref} className={`${styles.guestsSelectorContainer} ${isComponentSelected ? styles.guestsSelectorContainerSelected : ""} `} onClick={() => setIsComponentSelected(true)}>
		    								<div className={styles.guestsSelectorContainerPart}>
		    									<div className={styles.guestsSelectorTitle}>VIAJEROS</div>
		    									<div className={styles.guestSelector}>{labelGuests}</div>
		    								</div>
		    								<div className={styles.guestsSelectorContainerPart}>
		    									{isComponentSelected && (
		    										<Image src="/icons/contraer.png" layout="intrinsic" width={48} height={48} />
		    									)}
		    									{!isComponentSelected && (
		    										<Image src="/icons/expandir.png" layout="intrinsic" width={48} height={48} />
		    									)}
		    								</div>
		    								<div className={`${styles.modalGuests} ${isComponentSelected ? styles.show  : styles.hide}`}>
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
		    						</div>
		    						<div className={styles.actionButtonContainer}>Consultar disponibilidad</div>
		    						<div className={styles.priceListContainer}>
		    							<div className={styles.disclaimerPaymentLine}>No vamos a cobrarte ningún cargo por el momento</div>
		    							<div className={styles.operationPricePerNight}></div>
		    							<div className={styles.discount}></div>
		    							<div className={styles.serviceFee}></div>
		    							<div className={styles.totalPrice}></div>
		    						</div>
		    					</div>
		    				</div>
		    			</div>
		    		</div>
	    		</div>
	    	</div>
	    </Layout>
	  );
}

export default PropiedadDisplay;