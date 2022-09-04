import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import SearchBox from '../components/navigationSubheader/NavigationSubheader';
import WelcomePage from '../components/wecomePage/WelcomePage';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Yok Tomatia</title>
				<meta name='description' content='Yok Tomata Shop' />
				<link rel='shortcut icon' href='/android-chrome-512x512.png' />
			</Head>
			<Header />
			<SearchBox />
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
