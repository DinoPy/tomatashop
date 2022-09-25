import styles from './NavigationSubheader.module.css';
import React, { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { throttle } from '../../utils/throttle';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import CategoryDropdown from './CategoryDropdown/CategoryDropdown';
import CartSidebar from '../CartSidebar/CartSidebar';
import FavoritesSidebar from '../FavoritesSidebar/FavoritesSidebar';
import { useFavCtx } from '../../utils/favCtx';
import { useCartCtx } from '../../utils/cartCtx';
import { useRouter } from 'next/router';

const NavigationSubheader: React.FC = () => {
	const { data: session } = useSession();
	const router = useRouter();
	//
	const { favorites, setFavorites } = useFavCtx();
	const { cart, setCart } = useCartCtx();
	//
	const [cartSidebarOpen, setCartSidebarOpen] = React.useState(false);
	const [searchResultsOpen, setSearchResultsOpen] = React.useState(false);
	const [favoritesSidebarOpen, setFavoritesSidebarOpen] = React.useState(false);
	const [toSearch, setToSearch] = React.useState('');
	const [inputValue, setInputValue] = React.useState('');
	const [searchResults, setSearchResults] = React.useState<
		{
			_id: string;
			title: string;
		}[]
	>([]);

	const serachInputRef = React.useRef<HTMLInputElement>(null);
	const searchResultsRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const onEscape = function () {
			window &&
				window.addEventListener('keydown', (e) => {
					if (e.key === 'Escape') {
						serachInputRef.current?.blur();
						setSearchResultsOpen(false);
					}
				});
		};
		onEscape();

		return () => {
			window && window.removeEventListener('keydown', onEscape);
		};
	}, []);

	React.useEffect(() => {
		async function fetchFavorites() {
			const response = await axios.get(
				`/api/addtocartfav/favorites/none/${session?.user._id}/none`
			);
			setFavorites(response.data);
		}

		async function fetchCart() {
			const response = await axios.get(
				`/api/addtocartfav/cart/none/${session?.user._id}/none`
			);

			setCart(response.data);
		}

		if (session) {
			fetchFavorites();
			fetchCart();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session]);

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

	const onBlurHandler = () => {
		setTimeout(() => {
			setSearchResultsOpen(false);
		}, 100);
	};

	return (
		<>
			<div className={`${styles.subheaderContainer}`}>
				<div>
					<CategoryDropdown />
				</div>
				<div className={styles.searchWrapper}>
					<form
						className={styles.smallContainer}
						onSubmit={(e) => {
							e.preventDefault();
							router.push(`/search?query=${inputValue}`);
						}}
					>
						<input
							autoComplete='off'
							className={styles.inputBox}
							type='text'
							name='searchEl'
							value={inputValue}
							onChange={handleSearch}
							placeholder='Search'
							onFocus={() => setSearchResultsOpen(true)}
							onBlur={() => {
								onBlurHandler();
							}}
							ref={serachInputRef}
						/>

						<button className={styles.searchButton} type='submit'>
							<Image
								width='25px'
								height='25px'
								src='/images/icons8-search-60.svg'
								alt='searchIcon'
							/>
						</button>
					</form>

					{searchResultsOpen && (
						<div className={styles.dropdown} ref={searchResultsRef}>
							{searchResults.length > 0 &&
								toSearch.length > 2 &&
								searchResults?.map((result) => (
									<Link href={`/product/${result._id}`} key={result._id}>
										<a
											onClick={() => {
												setSearchResultsOpen(false);
												setInputValue('');
											}}
										>{`${result.title}`}</a>
									</Link>
								))}
						</div>
					)}
				</div>
				<div>
					{router.pathname !== '/checkout' && (
						<Badge
							badgeContent={cart?.length}
							color='info'
							sx={{ margin: '0 10px', cursor: 'pointer' }}
							onClick={() => {
								setCartSidebarOpen(true);
							}}
						>
							<ShoppingCartOutlinedIcon />
						</Badge>
					)}
					<Badge
						badgeContent={favorites?.length}
						color='info'
						sx={{ margin: '0 10px', cursor: 'pointer' }}
						onClick={() => {
							setFavoritesSidebarOpen(true);
						}}
					>
						<StarBorderIcon />
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

export default NavigationSubheader;
