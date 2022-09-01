import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import CategoryDropdown from './CategoryDropdown/CategoryDropdown';
import styles from './SearchBox.module.css';
import { throttle } from '../../utils/throttle';
import axios from 'axios';
import Link from 'next/link';

type PropsType = {
	inputValue: string;
	handleSearch: React.ChangeEventHandler<HTMLInputElement>;
};

const SearchBox: NextPage = () => {
	// I can throttle the to search and do an use effect to update
	// the search results which can then be used to conditonally render

	const [toSearch, setToSearch] = React.useState('');
	const [inputValue, setInputValue] = React.useState('');
	const [searchResults, setSearchResults] = React.useState([
		{
			_id: '',
			title: '',
		},
	]);

	// call to api to get search results
	const search = async (value: string) => {
		const results = await axios.get(`/api/products?query=${value}`);
		const { data } = await results;
		console.log(data.data)
		setSearchResults(data.data);
	};

	// useCallback will memoize the function and prevent it being generated every time the component is rendered
	// hence it will be unique and will work correctly
	const throttleSearch = React.useCallback(
		throttle((val: any) => setToSearch(val), 1000),
		[]
	);

	React.useEffect(() => {
		search(toSearch);
		console.log(searchResults);
	}, [toSearch]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		throttleSearch(e.target.value);
	};

	return (
		<div className={`${styles.searchContainer}`}>
			<CategoryDropdown />
			<div className={styles.searchWrapper}>
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

				<div className={styles.dropdown}>
					{searchResults &&
						searchResults?.map((result) => (
							<Link href={`/product/${result._id}`} key={result._id}>{result.title}</Link>
						))}
				</div>
			</div>
			<div>
				<p> Favorites </p>
				<p> Cart </p>
			</div>
		</div>
	);
};

export default SearchBox;
