import { NextPage } from 'next';
import React from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import NavigationSubheader from '../../components/navigationSubheader/NavigationSubheader';
import StoreContainer from '../../components/storeContainer/StoreContainer';
import dbConnect from '../../lib/dbConnect';
import Products from '../../models/Products';

const Store: NextPage<{ products: string; pages: number }> = ({
	products,
	pages,
}) => {
	const productsData = JSON.parse(products);
	return (
		<>
			<Header />
			<NavigationSubheader />
			<StoreContainer products={productsData} pages={pages} />
			<Footer />
		</>
	);
};

export default Store;

export async function getServerSideProps({ query }: any) {
	const page = query.page || 1;
	const pageSize = 12;
	const skipPage = (page - 1) * pageSize;

	try {
		await dbConnect();

		const countProducts = await Products.countDocuments();
		const data = await Products.find().skip(skipPage).limit(12);

		return {
			props: {
				products: JSON.stringify(data),
				pages: Math.ceil(countProducts / pageSize),
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
