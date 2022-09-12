import { NextPage } from 'next';
import React from 'react';
import Layout from '../../components/layout';
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
			<Layout>
				<StoreContainer products={productsData} pages={pages} />
			</Layout>
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
		console.error(error);
		return {
			props: {
				products: [],
			},
		};
	}
}
