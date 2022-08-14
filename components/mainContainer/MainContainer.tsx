import React, { useState } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import styles from './MainContainer.module.css';
import { ProductsProps } from '../../types/interface/productPropsInterface';

const MainContainer: NextPage<ProductsProps> = ({ products }) => {
	const [inputValue, setInputValue] = useState('test');
	console.log(products);

	return (
		<>
			<div className={`${styles.searchContainer}`}>
				<input
					className={styles.inputBox}
					type='text'
					name='searchEl'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<button className={styles.imageButton}>
					<Image
						width='25px'
						height='25px'
						src='/images/search.png'
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
		</>
	);
};

export default MainContainer;
