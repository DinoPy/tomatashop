import { NextPage } from 'next';
import React from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import NavigationSubheader from '../../components/navigationSubheader/NavigationSubheader';
import StoreContainer from '../../components/storeContainer/StoreContainer';
import dbConnect from '../../lib/dbConnect';
import Products from '../../models/Products';

const Store: NextPage<{ products: string }> = ({ products }) => {
	const productsData = JSON.parse(products);
	return (
		<>
			<Header />
			<NavigationSubheader />
			<StoreContainer products={productsData} />
			<Footer />
		</>
	);
};

export default Store;

export async function getServerSideProps() {
	try {
		await dbConnect();
		const data = await Products.find();

		return {
			props: {
				products: JSON.stringify(data),
			},
		};
	} catch (error) {
		return {
			props: {
				products: [],
			},
		};
	}
}
