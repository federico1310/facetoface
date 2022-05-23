import { useState, useEffect } from "react";
import Router from 'next/router';
import styles from '../styles/ListingItem.module.css';
import moment from 'moment';
// Slide
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Link from 'next/link';
import Image from 'next/image';

const Anuncio = ({anuncio}) => {
    
    const defaultImage = '/assets/properties/property_1.jpg';
    const {id, title, estado, bedrooms, beds, toilets, country, state, image, modified_at} = anuncio;
    const status = {
        'AVAILABLE': 'Disponible',
        'RESERVED': 'Reservado',
        'CANCELLED': 'Cancelado'
    }

    const date = moment(parseInt(modified_at)).format("DD/MM/YYYY");

    return (         
        <div className={styles.listingBodyItem} key={id}>
            <div className={`${styles.listingBodyItemRow} ${styles.anuncio}`}>
                <div className={styles.listingBodyItemRowImageContainer}>
                    {image ? (
                        <Image src={image} layout="intrinsic" width={50} height={50} className={styles.listingBodyItemRowImage}/>
                    ) : (
                        <Image src={defaultImage} layout="intrinsic" width={50} height={50} className={styles.listingBodyItemRowImage}/>
                    )}
                    
                </div>
                <div className={styles.listingBodyItemRowImageDescription}>{title}</div>
            </div>
            <div className={`${styles.listingBodyItemRow} ${styles.estado}`}>{status[estado]}</div>
            <div className={`${styles.listingBodyItemRow} ${styles.dormitorios}`}>{bedrooms}</div>
            <div className={`${styles.listingBodyItemRow} ${styles.camas}`}>{beds}</div>
            <div className={`${styles.listingBodyItemRow} ${styles.banios}`}>{toilets}</div>
            <div className={`${styles.listingBodyItemRow} ${styles.ubicacion}`}>{`${state ? state + ", " : ""}`}{country}</div>
            <div className={`${styles.listingBodyItemRow} ${styles.modificado}`}>{date}</div>
        </div>    
    );
}
 
export default Anuncio;