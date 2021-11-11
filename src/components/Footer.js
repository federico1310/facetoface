import React from 'react';
import styles from '../styles/Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

const Footer = () => {

	const { pathname, query, isReady, push } = useRouter();

	if(pathname === "/nuevo-anuncio")
    	return null;
	
	return(
		<footer className={styles.footerContainer}>
			<div className={`h100 w80 blockHorizontalCenter flex flexFlowColumn`}>
				<div className={styles.horizontalContainerFooter}>
					<div>
						<div>Sobre FaceToFace</div>
						<div>Cómo funciona FaceToFace</div>	
					</div>
				</div>
				<div className={styles.horizontalContainerFooter}>
					<div>© 2021 FaceToFace, Inc.</div>
					<div>Privacidad</div>
					<div>Términos</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;