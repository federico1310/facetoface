import { useState, useEffect } from "react";
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({children}) => {

	return(
		<>
			<Head>
				<title>Face to face</title>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
				<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
			</Head>

			<div className="bg-gray-200 min-h-screen">
				<div className="flex min-h-screen flexFlowColumn">
					<Header />

					<main className="w100 h100">
						{children}
					</main>

					<Footer />
				</div>
			</div>
		</>
	);
}
export default Layout;