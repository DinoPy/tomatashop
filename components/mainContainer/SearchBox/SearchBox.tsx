import { NextPage } from 'next';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import styles from '../MainContainer.module.css';

type PropsType = {
	inputValue: string;
	handleSearch: React.ChangeEventHandler<HTMLInputElement>;
};

const SearchBox: NextPage<PropsType> = ({ inputValue, handleSearch }) => {
	return (
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
	);
};

export default SearchBox;
