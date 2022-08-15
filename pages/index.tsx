import type { NextPage } from 'next';
import MainPageHeader from '../components/header/MainPageHeader';
import Head from 'next/head';
import Image from 'next/image';
import MainContainer from '../components/mainContainer/MainContainer';
import { ProductsProps } from '../types/interface/productPropsInterface';

const Home: NextPage<ProductsProps> = ({ products }) => {
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


	return {
		props: {
			products,
		},
	};
}

export default Home;
