import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import NavigationSubheader from '../components/navigationSubheader/NavigationSubheader';
import WelcomePage from '../components/wecomePage/WelcomePage';
import React from 'react';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Yok Tomatia</title>
				<meta name='description' content='Yok Tomata Shop' />
				<link rel='shortcut icon' href='/android-chrome-512x512.png' />
			</Head>

			<Header />
			<NavigationSubheader />
			<WelcomePage />
			<Footer />
		</>
	);
};

export default Home;
