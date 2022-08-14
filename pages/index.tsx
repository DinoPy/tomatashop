import type { NextPage } from 'next';
import MainPageHeader from '../components/header/MainPageHeader';
import Head from 'next/head';
import Image from 'next/image';
import MainContainer from '../components/mainContainer/MainContainer';

const Home: NextPage = ({ products }) => {
	return (
		<div>
			<MainPageHeader />
			<MainContainer products={products} />
		</div>
	);
};

export async function getServerSideProps() {
	const response = await fetch('https://fakestoreapi.com/products');
	const products = await response.json();
	console.log(products);
	console.log('ran');

	return {
		props: {
			products,
		},
	};
}

export default Home;
