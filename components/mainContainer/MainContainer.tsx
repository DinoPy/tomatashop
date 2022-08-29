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
import ProductItem from '../ProductItem/ProductItem';
//styles
import styles from './MainContainer.module.css';

const MainContainer: NextPage<ProductsProps> = ({ products }) => {
	const [inputValue, setInputValue] = useState('');
	const [productData, setProductData] = useState<Product[]>(products);
	const [searchResults, setSearchResults] = useState<Product[]>(productData);
	const { data: session, status } = useSession();
	console.log(productData);

	const productsJsx = (itemsList: Product[]): JSX.Element[] =>
		itemsList?.map((product) => (
			<ProductItem key={product._id} product={product} />
		));

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		setSearchResults(
			productData.filter((product) =>
				product.title.toLowerCase().includes(e.target.value.toLowerCase())
			)
		);
	};

	return (
		<>
			<div style={{ marginLeft: '3rem' }}>
				{status === 'authenticated' && session ? (
					// <Link href='/api/auth/signout'> Sign Out </Link>
					<>
						<h2> Signed in as {session.user?.name}</h2>
						<a href='#' onClick={() => signOut()}>
							{' '}
							Sign out{' '}
						</a>
					</>
				) : (
					<a href='#' onClick={() => signIn()}>
						{' '}
						Sign in{' '}
					</a>
					// <Link href='/api/auth/signin'> Sign In </Link>
				)}
				<br />
			</div>
			<div className={`${styles.searchContainer}`}>
				<input
					className={styles.inputBox}
					type='text'
					name='searchEl'
					value={inputValue}
					onChange={handleSearch}
				/>
				<button className={styles.imageButton}>
					<Image
						width='25px'
						height='25px'
						src='/images/icons8-search-60.svg'
						alt='searchIcon'
					/>
				</button>
			</div>
			<div className={`${styles.filtersContainer}`}>
				<a> Paintings </a>
				<a> Sketches </a>
				<a> Illustrations </a>
				<a> Callendars </a>
				<a> Covers </a>
				<a> Clothing </a>
			</div>
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
