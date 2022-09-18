import React from 'react';
import Layout from '../../components/layout';
import { GetServerSideProps } from 'next';
import Products from '../../models/Products';
import dbConnect from '../../lib/dbConnect';
import { ProductsProps } from '../../types/interface/productPropsInterface';
import SearchResultsPage from '../../components/SearchResultsPage/SearchResultsPage';

const Search = ({ products }: { products: ProductsProps['products'] }) => {
	return (
		<Layout>
			<SearchResultsPage products={products} />
		</Layout>
	);
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context.query as { query: string };
	try {
		await dbConnect();
		const results = await Products.aggregate([
			{
				$search: {
					index: 'autocomplete',
					autocomplete: {
						query: query,
						path: 'title',
						tokenOrder: 'sequential',
						fuzzy: {
							maxEdits: 2,
						},
					},
				},
			},
			{ $project: { title: 1, image: 1, price: 1 } },
		]);
		return {
			props: {
				products: JSON.parse(JSON.stringify(results)),
			},
		};
	} catch (e) {
		console.log(e);
		return {
			props: {
				results: [],
			},
		};
	}
};
