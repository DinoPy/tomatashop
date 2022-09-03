import React from 'react';
import Products from '../../models/Products';
import { NextPage } from 'next';
import { Product } from '../../types/interface/productPropsInterface';
import ProductItem from '../../components/productItem/ProductItem';
import Header from '../../components/header/Header';
import SearchBox from '../../components/navigationSubheader/NavigationSubheader';

const Category: NextPage<{ products: Product[] }> = ({ products }) => {
	const getProductJsx = (products: Product[]): JSX.Element[] =>
		products?.map((product) => (
			<ProductItem key={product._id} product={product} />
		));

	const productJsx = getProductJsx(products);
	return (
		<>
			<Header />
			<SearchBox />

			{productJsx.length !== 0 ? productJsx : <p> No products found </p>}
		</>
	);
};

export default Category;

export async function getServerSideProps(context: any) {
	const category = context.params.category;

	try {
		const products = await Products.find({ category: category });
		return {
			props: {
				products: JSON.parse(JSON.stringify(products)),
			},
		};
	} catch (error) {
		return {
			props: {
				// error: error.message,
				error: 'Product not found',
			},
		};
	}
}
