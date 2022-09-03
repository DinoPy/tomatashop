import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import CategoryDropdown from './CategoryDropdown/CategoryDropdown';
import styles from './NavigationSubheader.module.css';
import { throttle } from '../../utils/throttle';
import axios from 'axios';
import Link from 'next/link';

type PropsType = {
	inputValue: string;
	handleSearch: React.ChangeEventHandler<HTMLInputElement>;
};

const SearchBox: NextPage = () => {
	const [toSearch, setToSearch] = React.useState('');
	const [inputValue, setInputValue] = React.useState('');
	const [searchResults, setSearchResults] = React.useState<
		{
			_id: string;
			title: string;
		}[]
	>([]);

	// call to api to get search results
	const search = async (value: string) => {
		const results = await axios.get(`/api/products?query=${value}`);
		const { data } = await results;
		console.log(data.data);
		setSearchResults(data.data);
	};

	// useCallback will memoize the function and prevent it being generated every time the component is rendered
	// hence it will be unique and will work correctly
	const throttleSearch = React.useCallback(
		throttle((val: any) => setToSearch(val), 1000),
		[]
	);

	React.useEffect(() => {
		if (toSearch.length > 2) {
			search(toSearch);
			console.log(searchResults);
		}

		return () => {};
	}, [toSearch]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		throttleSearch(e.target.value);
	};

	return (
		<div className={`${styles.subheaderContainer}`}>
			<div>
				<Link href='/store'> Store </Link>
				<CategoryDropdown />
			</div>
			<div className={styles.searchWrapper}>
				<div className={styles.smallContainer}>
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
					{searchResults.length > 0 &&
						toSearch.length > 2 &&
						searchResults?.map((result) => (
							<>
								<Link href={`/product/${result._id}`} key={result._id}>
									<a>{`${result.title}`}</a>
								</Link>
							</>
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
