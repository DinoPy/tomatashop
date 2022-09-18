import React, { useState } from 'react';
//types
import { NextPage } from 'next';
import {
	Product,
	ProductsProps,
} from '../../types/interface/productPropsInterface';
//components
import ProductItem from '../productItem/ProductItem';
import Pagination from './pagination/Pagination';
//styles
import styles from './StoreContainer.module.css';
import { useRouter } from 'next/router';

type PropsType = {
	products: Product[];
	pages: number;
};

const MainContainer: NextPage<PropsType> = ({ products, pages }) => {
	const [productData, setProductData] = useState<Product[]>(products);
	const [searchResults, setSearchResults] = useState<Product[]>(productData);
	const router = useRouter();
	console.log(router);

	// generating products Jsx from the data received from server.
	const productsJsx = (itemsList: Product[]): JSX.Element[] =>
		itemsList?.map((product) => (
			<ProductItem key={product._id} product={product} />
		));

	return (
		<>
			{router.pathname !== '/category/[category]' && (
				<Pagination pages={pages} />
			)}
			<div className={`${styles.products}`}>
				{searchResults.length > 0 ? (
					productsJsx(searchResults)
				) : (
					<h1> No results for your search...</h1>
				)}
			</div>
			{router.pathname !== '/category/[category]' && (
				<Pagination pages={pages} />
			)}
		</>
	);
};

export default MainContainer;
