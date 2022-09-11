import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import CategoryDropdown from './CategoryDropdown/CategoryDropdown';
import styles from './NavigationSubheader.module.css';
import { throttle } from '../../utils/throttle';
import axios from 'axios';
import Link from 'next/link';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CartSidebar from '../CartSidebar/CartSidebar';
import FavoritesSidebar from '../FavoritesSidebar/FavoritesSidebar';
import { useSession } from 'next-auth/react';

type PropsType = {
	inputValue: string;
	handleSearch: React.ChangeEventHandler<HTMLInputElement>;
};

const SearchBox: React.FC = () => {
	const [cartSidebarOpen, setCartSidebarOpen] = React.useState(false);
	const [favoritesSidebarOpen, setFavoritesSidebarOpen] = React.useState(false);
	const [toSearch, setToSearch] = React.useState('');
	const [inputValue, setInputValue] = React.useState('');
	const { data: session } = useSession();
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
		setSearchResults(data.data);
	};

	// useCallback will memoize the function and prevent it being generated every time the component is rendered
	// hence it will be unique and will work correctly

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const throttleSearch = React.useCallback(
		throttle((val: any) => setToSearch(val), 1000),
		[]
	);

	React.useEffect(() => {
		if (toSearch.length > 2) {
			search(toSearch);
		}

		return () => {};
	}, [toSearch]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		throttleSearch(e.target.value);
	};

	return (
		<>
			<div className={`${styles.subheaderContainer}`}>
				<div>
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
					<Badge
						badgeContent={1}
						color='info'
						sx={{ margin: '0 10px', cursor: 'pointer' }}
						onClick={() => {
							setCartSidebarOpen(true);
						}}
					>
						<ShoppingCartOutlinedIcon />
					</Badge>
					<Badge
						badgeContent={session?.user?.favorites?.length}
						color='info'
						sx={{ margin: '0 10px', cursor: 'pointer' }}
						onClick={() => {
							setFavoritesSidebarOpen(true);
						}}
					>
						<FavoriteBorderOutlinedIcon />
					</Badge>
				</div>
			</div>
			<CartSidebar
				setCartSidebarOpen={setCartSidebarOpen}
				cartSidebarOpen={cartSidebarOpen}
			/>
			<FavoritesSidebar
				setFavoritesSidebarOpen={setFavoritesSidebarOpen}
				favoritesSidebarOpen={favoritesSidebarOpen}
			/>
		</>
	);
};

export default SearchBox;
