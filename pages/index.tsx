import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import NavigationSubheader from '../components/navigationSubheader/NavigationSubheader';
import Sidebar from '../components/Sidebar/Sidebar';
import WelcomePage from '../components/wecomePage/WelcomePage';
import React from 'react';
import { Drawer, Box } from '@mui/material';

const Home: NextPage = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<>
			<Head>
				<title>Yok Tomatia</title>
				<meta name='description' content='Yok Tomata Shop' />
				<link rel='shortcut icon' href='/android-chrome-512x512.png' />
			</Head>
			<Header />

			{
				<React.Fragment>
					<Drawer
						anchor='right'
						open={sidebarOpen}
						onClose={() => setSidebarOpen(false)}
					>
						<Box
							sx={{
								width: '300px',
								height: '100%',
								backgroundColor: 'darkgray',
							}}
						>
							Content
						</Box>
					</Drawer>
				</React.Fragment>
			}

			{/* 			
			{sidebarOpen && (
				<Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
			)} */}
			<NavigationSubheader setSidebarOpen={setSidebarOpen} />
			<WelcomePage />
			{
				// huge image
				// small description
				// some carusel
				// footer
			}
			<Footer />
		</>
	);
};

export default Home;
