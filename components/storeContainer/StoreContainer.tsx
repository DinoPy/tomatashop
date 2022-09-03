import React, { useState } from 'react';

//types
import { NextPage } from 'next';
import {
	Product,
	ProductsProps,
} from '../../types/interface/productPropsInterface';
//components
import ProductItem from '../productItem/ProductItem';
//styles
import styles from './StoreContainer.module.css';

const MainContainer: NextPage<ProductsProps> = ({ products }) => {
	const [productData, setProductData] = useState<Product[]>(products);
	const [searchResults, setSearchResults] = useState<Product[]>(productData);

	const productsJsx = (itemsList: Product[]): JSX.Element[] =>
		itemsList?.map((product) => (
			<ProductItem key={product._id} product={product} />
		));

	return (
		<>
			<div className={`${styles.products}`}>
				{searchResults.length > 0 ? (
					productsJsx(searchResults)
				) : (
					<h1> No results for your search...</h1>
				)}
			</div>
		</>
	);
};

export default MainContainer;
