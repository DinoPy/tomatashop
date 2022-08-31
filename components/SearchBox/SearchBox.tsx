import { NextPage } from 'next';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import styles from './SearchBox.module.css';

type PropsType = {
	inputValue: string;
	handleSearch: React.ChangeEventHandler<HTMLInputElement>;
};

const SearchBox: NextPage<PropsType> = ({ inputValue, handleSearch }) => {
	return (
		<div className={`${styles.searchContainer}`}>
			<p> Categories dropdown</p>
			<div>
				<input
					className={styles.inputBox}
					type='text'
					name='searchEl'
					value={inputValue}
					onChange={handleSearch}
				/>

				<button className={styles.searchButton}>
					<Image
						width='25px'
						height='25px'
						src='/images/icons8-search-60.svg'
						alt='searchIcon'
					/>
				</button>
			</div>
			<div>
				<p> Favorites </p>
				<p> Categories </p>
			</div>
		</div>
	);
};

export default SearchBox;
