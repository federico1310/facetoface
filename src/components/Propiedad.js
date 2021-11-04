import { useState, useEffect } from "react";
import Router from 'next/router';
import styles from '../styles/Properties.module.css';
// Slide
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Link from 'next/link';
import Image from 'next/image';

const PropiedadCard = ({propiedad, setMarkedProp, markedProp}) => {
    
    const [timeout, setTime] = useState();
    const [hoverProp, setHoverProp] = useState();
    const { id, real_property_name, fake_property_name, price, per, guests, rooms, beds, toilets, thumbnails} = propiedad;

    useEffect(() => {
        setMarkedProp(hoverProp)
    }, [hoverProp])

    let guestsText = '';
    let word = 'Huéspedes';
    if(guests == 1)
        word = 'Huésped';

    guestsText = guests + ' ' + word;

    let roomsText = '';
    if(rooms.bedrooms > 0)
    {
        let wordRoom = 'Habitaciones';
        if(rooms.bedrooms == 1)
            wordRoom = 'Habitación';

        roomsText = rooms.bedrooms + ' ' + wordRoom;
    }
    else
    {
        let wordRoom = 'Estudios';
        if(rooms.offices == 1)
            wordRoom = 'Estudio';

        roomsText = rooms.offices + ' ' + wordRoom;
    }

    let bedsText = '';
    let wordBed = 'Camas';
    if(beds == 1)
        wordBed = 'Cama';

    bedsText = beds + ' ' + wordBed;

    let toiletsText = '';
    let wordToilet = 'Baños';
    if(toilets == 1)
        wordToilet = 'Baño';

    toiletsText = toilets + ' ' + wordToilet;
    return (         
        
            <div className={styles.propertyCard} key={id} onMouseOver={() => setHoverProp(id)} onMouseLeave={() => setHoverProp(0)}>
                <div className={styles.propertyCardHalf}>
                    <Slide easing="ease" cssClass={styles.sliderWrapper} autoplay={false} indicators={true}>
                        {thumbnails.map( thumbnail => (
                          <div className={styles.slide} key={thumbnail.id}>
                            <Image src={thumbnail.path} height={thumbnail.original_height} width={thumbnail.original_width} layout="intrinsic" className={styles.propertyCardImage}/>
                          </div>
                        ))}
                    </Slide>
                </div>
                <Link href={`/propiedad-display?id=${id}`}>
                    <a className={styles.propertyCardHalf}>
                        <div className={styles.realCardPropertyName}>{real_property_name}</div>
                        <div className={styles.fakeCardPropertyName}>{fake_property_name}</div>
                        <div className={styles.splitLineCardProperty}></div>
                        <div className={styles.amenitiesContainerCardProperty}>
                            <div className={styles.amenitiesOptionCardProperty}>{guestsText}</div>
                            <div className={styles.amenitiesSeparatorCardProperty}>|</div>
                            <div className={styles.amenitiesOptionCardProperty}>{roomsText}</div>
                            <div className={styles.amenitiesSeparatorCardProperty}>|</div>
                            <div className={styles.amenitiesOptionCardProperty}>{bedsText}</div>
                            <div className={styles.amenitiesSeparatorCardProperty}>|</div>
                            <div className={styles.amenitiesOptionCardProperty}>{toiletsText}</div>
                        </div>
                        <div className={styles.priceContainerCardProperty}>
                            <div className={styles.priceCardProperty}>${price}</div><div className={styles.pricePerCardProperty}>/ {per}</div>
                        </div>
                    </a>
                </Link>
            </div>
         
    );
}
 
export default PropiedadCard;