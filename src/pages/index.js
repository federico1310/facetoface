import { useState, useEffect } from 'react';
import styles from '../styles/Homepage.module.css';
import Layout from '../components/Layout';
import Broker from '../components/Broker';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';

const Homepage = () => {
	const [backgroundWidth, setBackgroundWidth] = useState(0);
	const [backgroundHeight, setBackgroundHeight] = useState(0);

	useEffect( function onFirstMount() {
		if(typeof window.screen.availWidth == 'number')
			setBackgroundWidth(window.screen.availWidth);
		if(typeof window.screen.availHeight == 'number')
			setBackgroundHeight(window.screen.availHeight * 0.8);
	}, [])

  return (
    <Layout>
      <div className="h70">
        <div className="h100 w100 positionRelative">
          <Image src="/assets/home_landscape.jpg" layout="intrinsic"  width={1440} height={810} />
        </div>
      </div>
      <div className="h40">
	      <div className={`h100 w80 blockHorizontalCenter ${styles.nearPlacesSectionContainer}`}>
	      	<div className={styles.title}>¿No sabés donde ir? Explorá estos lugares!</div>
	      	<div className={styles.nearPlacesCardsContainer}>
	      		<div className={styles.nearPlacesCard}>
	      			<div className={styles.nearPlacesCardImageContainer}>
	      				<Image src="/assets/places/bs_as.jpg" height={1080} width={1920} layout="intrinsic" className={styles.nearPlacesCardImage} />
	      			</div>
	      			<div className={styles.nearPlacesCardTextContainer}>
	      				<div className={styles.nearPlacesCardPlace}>Buenos Aires</div>
	      				<div className={styles.nearPlacesCardDistance}>5 kilometros</div>
	      			</div>
	      		</div>
	      		<div className={styles.nearPlacesCard}>
	      			<div className={styles.nearPlacesCardImageContainer}>
	      				<Image src="/assets/places/bs_as.jpg" height={1080} width={1920} layout="intrinsic" className={styles.nearPlacesCardImage} />
	      			</div>
	      			<div className={styles.nearPlacesCardTextContainer}>
	      				<div className={styles.nearPlacesCardPlace}>Buenos Aires</div>
	      				<div className={styles.nearPlacesCardDistance}>5 kilometros</div>
	      			</div>
	      		</div>
	      		<div className={styles.nearPlacesCard}>
	      			<div className={styles.nearPlacesCardImageContainer}>
	      				<Image src="/assets/places/bs_as.jpg" height={1080} width={1920} layout="intrinsic" className={styles.nearPlacesCardImage} />
	      			</div>
	      			<div className={styles.nearPlacesCardTextContainer}>
	      				<div className={styles.nearPlacesCardPlace}>Buenos Aires</div>
	      				<div className={styles.nearPlacesCardDistance}>5 kilometros</div>
	      			</div>
	      		</div>
	      		<div className={styles.nearPlacesCard}>
	      			<div className={styles.nearPlacesCardImageContainer}>
	      				<Image src="/assets/places/bs_as.jpg" height={1080} width={1920} layout="intrinsic" className={styles.nearPlacesCardImage} />
	      			</div>
	      			<div className={styles.nearPlacesCardTextContainer}>
	      				<div className={styles.nearPlacesCardPlace}>Buenos Aires</div>
	      				<div className={styles.nearPlacesCardDistance}>5 kilometros</div>
	      			</div>
	      		</div>
	      		<div className={styles.nearPlacesCard}>
	      			<div className={styles.nearPlacesCardImageContainer}>
	      				<Image src="/assets/places/bs_as.jpg" height={1080} width={1920} layout="intrinsic" className={styles.nearPlacesCardImage} />
	      			</div>
	      			<div className={styles.nearPlacesCardTextContainer}>
	      				<div className={styles.nearPlacesCardPlace}>Buenos Aires</div>
	      				<div className={styles.nearPlacesCardDistance}>5 kilometros</div>
	      			</div>
	      		</div>
	      		<div className={styles.nearPlacesCard}>
	      			<div className={styles.nearPlacesCardImageContainer}>
	      				<Image src="/assets/places/bs_as.jpg" height={1080} width={1920} layout="intrinsic" className={styles.nearPlacesCardImage} />
	      			</div>
	      			<div className={styles.nearPlacesCardTextContainer}>
	      				<div className={styles.nearPlacesCardPlace}>Buenos Aires</div>
	      				<div className={styles.nearPlacesCardDistance}>5 kilometros</div>
	      			</div>
	      		</div>
	      		<div className={styles.nearPlacesCard}>
	      			<div className={styles.nearPlacesCardImageContainer}>
	      				<Image src="/assets/places/bs_as.jpg" height={1080} width={1920} layout="intrinsic" className={styles.nearPlacesCardImage} />
	      			</div>
	      			<div className={styles.nearPlacesCardTextContainer}>
	      				<div className={styles.nearPlacesCardPlace}>Buenos Aires</div>
	      				<div className={styles.nearPlacesCardDistance}>5 kilometros</div>
	      			</div>
	      		</div>
	      		<div className={styles.nearPlacesCard}>
	      			<div className={styles.nearPlacesCardImageContainer}>
	      				<Image src="/assets/places/bs_as.jpg" height={1080} width={1920} layout="intrinsic" className={styles.nearPlacesCardImage} />
	      			</div>
	      			<div className={styles.nearPlacesCardTextContainer}>
	      				<div className={styles.nearPlacesCardPlace}>Buenos Aires</div>
	      				<div className={styles.nearPlacesCardDistance}>5 kilometros</div>
	      			</div>
	      		</div>
	      	</div>
	      </div>
	      <div className={`h100 w80 blockHorizontalCenter ${styles.nearPlacesSectionContainer}`}>
	      	<div className={styles.title}>¿Querés un alojamiento que cumpla con todos los requisitos? Aca lo podés encontrar</div>
	      	<div className={styles.quickSearchPlaceContainer}>
	      		<div className={styles.quickSearchCard}>
	      			<div className={styles.quickSearchImageContainer}>
	      				<Image src="/assets/home/unique.jpg" width={500} height={574} layout="intrinsic" className={styles.quickSearchCardImage} />
	      			</div>
	      			<div className={styles.quickSearchCardText}>Alojamientos únicos</div>
	      		</div>
	      		<div className={styles.quickSearchCard}>
	      			<div className={styles.quickSearchImageContainer}>
	      				<Image src="/assets/home/pets.jpg" width={500} height={574} layout="intrinsic" className={styles.quickSearchCardImage} />
	      			</div>
	      			<div className={styles.quickSearchCardText}>Con tus mascotas</div>
	      		</div>
	      		<div className={styles.quickSearchCard}>
	      			<div className={styles.quickSearchImageContainer}>
	      				<Image src="/assets/home/out.jpeg" width={500} height={574} layout="intrinsic" className={styles.quickSearchCardImage} />
	      			</div>
	      			<div className={styles.quickSearchCardText}>Escapadas al aire libre</div>
	      		</div>
	      		<div className={styles.quickSearchCard}>
	      			<div className={styles.quickSearchImageContainer}>
	      				<Image src="/assets/home/complete.jpg" width={500} height={574} layout="intrinsic" className={styles.quickSearchCardImage} />
	      			</div>
	      			<div className={styles.quickSearchCardText}>Alojamientos enteros</div>
	      		</div>
	      	</div>
	      </div>
	      <div className={`h100 w80 blockHorizontalCenter ${styles.nearPlacesSectionContainer}`}>
		      	<div className={styles.beHostBannerContainer}>
	      		<Link href="/nuevo-anuncio">
	      			<a>
				      	<div className={styles.beHostTextContainer}>
				      		<div className={styles.beHostTitle}>Animate a hospedar</div>
				      		<div className={styles.beHostSubTitle}>Podrás conseguir dinero extra y conocer nuevas personas</div>
				      		<div className={styles.fixBeHostButtonPosition}>
				      			<div className={styles.beHostButton}>Conocé más</div>
				      		</div>
				      	</div>
			      		<Image src="/assets/anfitrion.jpg" layout="fill" objectFit="cover" className={styles.beHostImage} />
	      			</a>
	      		</Link>
		      	</div>
	      </div>
      </div>
    </Layout>
  );
}

export default Homepage;