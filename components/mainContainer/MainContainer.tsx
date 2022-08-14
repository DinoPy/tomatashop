import React, { useState } from 'react';
import Image from 'next/image';
import { NextComponentType, NextPage } from 'next';
import styles from './MainContainer.module.css';

const MainContainer: NextPage = () => {
	const [inputValue, setInputValue] = useState('');
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
					{' '}
					<Image
						width='30px'
						height='30px'
						src='/images/search.png'
						alt='searchIcon'
					/>
				</button>
				<p> {inputValue}</p>
			</div>
		</>
	);
};

export default MainContainer;
