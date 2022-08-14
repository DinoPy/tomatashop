import type { NextPage } from 'next';
import MainPageHeader from '../components/header/MainPageHeader';
import Head from 'next/head';
import Image from 'next/image';
import MainContainer from '../components/mainContainer/MainContainer';

const Home: NextPage = () => {
	return (
		<div>
			<MainPageHeader />
			<MainContainer />
		</div>
	);
};

export default Home;
