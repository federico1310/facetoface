import { useState, useEffect } from "react";
import Router from 'next/router';
import styles from '../styles/ListingItem.module.css';
// Slide
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Link from 'next/link';
import Image from 'next/image';

const Anuncio = ({anuncio}) => {
    
    const {id, title, status, status_id, rooms, beds, toilet, location, image, modified_at} = anuncio;

    return (         
        <div className={styles.listingBodyItem} key={id}>
            <div className={`${styles.listingBodyItemRow} ${styles.anuncio}`}>
                <div className={styles.listingBodyItemRowImageContainer}>
                    <Image src={image} layout="intrinsic" width={50} height={50} className={styles.listingBodyItemRowImage}/>
                </div>
                <div className={styles.listingBodyItemRowImageDescription}>{title}</div>
            </div>
            <div className={`${styles.listingBodyItemRow} ${styles.estado}`}>{status}</div>
            <div className={`${styles.listingBodyItemRow} ${styles.dormitorios}`}>{rooms}</div>
            <div className={`${styles.listingBodyItemRow} ${styles.camas}`}>{beds}</div>
            <div className={`${styles.listingBodyItemRow} ${styles.banios}`}>{toilet}</div>
            <div className={`${styles.listingBodyItemRow} ${styles.ubicacion}`}>{location}</div>
            <div className={`${styles.listingBodyItemRow} ${styles.modificado}`}>{modified_at}</div>
        </div>    
    );
}
 
export default Anuncio;