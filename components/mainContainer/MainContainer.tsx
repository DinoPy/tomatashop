import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
//types
import { NextPage } from 'next';
import {
	Product,
	ProductsProps,
} from '../../types/interface/productPropsInterface';
//components
import ProductItem from '../productItem/ProductItem';
//styles
import styles from './MainContainer.module.css';
import SearchBox from '../SearchBox/SearchBox';

const MainContainer: NextPage<ProductsProps> = ({ products }) => {
	// const [inputValue, setInputValue] = useState('');
	const [productData, setProductData] = useState<Product[]>(products);
	const [searchResults, setSearchResults] = useState<Product[]>(productData);
	const { data: session, status } = useSession();

	const productsJsx = (itemsList: Product[]): JSX.Element[] =>
		itemsList?.map((product) => (
			<ProductItem key={product._id} product={product} />
		));

	//removed for now
	// const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setInputValue(e.target.value);
	// 	setSearchResults(
	// 		productData.filter((product) =>
	// 			product.title.toLowerCase().includes(e.target.value.toLowerCase())
	// 		)
	// 	);
	// };

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
