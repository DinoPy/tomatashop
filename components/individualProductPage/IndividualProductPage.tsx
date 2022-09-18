import styles from './IndividualProductPage.module.css';
import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useFavCtx } from '../../utils/favCtx';
import { useCartCtx } from '../../utils/cartCtx';
import { NextPage } from 'next';
import { Product } from '../../types/interface/productPropsInterface';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
//
import { Checkbox, Fab } from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';

const IndividualProductPage: NextPage<{ product: Product }> = ({ product }) => {
	const { data: session }: { data: any } = useSession();
	const { favorites, setFavorites } = useFavCtx();
	const { cart, setCart } = useCartCtx();
	const [quantityInput, setQuantityInput] = React.useState<number>(1);
	const router = useRouter();
	const [rated, setRated] = React.useState(false);

	///

	const handleFavoritesChange = async () => {
		if (favorites?.some((item) => item._id === product._id)) {
			fetch(
				`/api/addtocartfav/favorites/remove/${session?.user?._id}/${product._id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			).then(async (response) => {
				const data = await response.json();
				setFavorites(data);
			});
		} else {
			fetch(
				`/api/addtocartfav/favorites/add/${session?.user?._id}/${product._id}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			).then(async (response) => {
				const data = await response.json();

				if (response.status === 200) {
					setFavorites(data);

					//
				}
			});
		}
	};

	const handleCartChange = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		//
		const activeItemQty = cart?.find((item) => item._id._id === product._id);

		if (session) {
			const response = await axios.post(
				`/api/addtocartfav/cart/add/${session?.user?._id}/${product._id}/`,
				{ quantity: quantityInput + (activeItemQty?.quantity || 0) }
			);

			if (response.status === 200) {
				setCart(response.data);
				setQuantityInput(1);
			}
			//
		}
	};
	//

	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			setRated(!!localStorage.getItem(product._id));
		}
	}, []);

	const handleRatingChange = async (newValue: number | null) => {
		// if (session) {
		// 	const response = await axios.post(
		// 		`/api/rating/${session?.user?._id}/${product._id}`,
		// 		{ rating: newValue }
		// 	);
		// 	if (response.status === 200) {
		// 		setRated(true);
		// 		localStorage.setItem(product._id, 'rated');
		// 	}
		// }
		localStorage.setItem(product._id, 'true');
		setRated(true);
	};

	return (
		<div className={styles.productContainer}>
			<Fab
				variant='extended'
				sx={{
					position: 'absolute',
					top: '-8%',
					left: '-8%',
					cursor: 'pointer',
					bgcolor: 'grey.800',
					color: 'white',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '.5rem .5rem',
					'&:hover': {
						bgcolor: 'grey.700',
					},
				}}
				onClick={() => router.back()}
			>
				<ArrowBackIcon />
			</Fab>
			{session && (
				<Checkbox
					aria-label='Favorited'
					icon={<StarBorderIcon sx={{ fill: 'white' }} />}
					checkedIcon={<StarIcon />}
					checked={favorites?.some((item) => item._id === product._id)}
					onChange={() => handleFavoritesChange()}
					sx={{
						position: 'absolute',
						top: '-8%',
						right: '-5%',
					}}
					color='primary'
				/>
			)}
			<h1 className={styles.title}> {product.title} </h1>
			<div className={styles.imageWrapper}>
				<Image
					className={styles.image}
					src={product.image}
					alt={product.title}
					layout='fill'
					objectFit='contain'
				/>
			</div>
			<div className={styles.productInfo}>
				<h2> Description</h2>
				<p className={styles.description}> {product.description} </p>
				<form
					onSubmit={(e) => handleCartChange(e)}
					className={styles.addToCart}
				>
					<input
						type='number'
						className={styles.quantity}
						value={quantityInput}
						onChange={(e) => setQuantityInput(Number(e.target.value))}
						min='1'
						placeholder='1'
					/>
					<button> Add to cart </button>
				</form>
				<Stack spacing={1}>
					<Rating
						name='half-rating-read'
						defaultValue={rated ? product.rating.rate : 2.5}
						precision={0.1}
						onChange={(_event, newValue) => {
							handleRatingChange(newValue);
						}}
						readOnly={rated}
					/>
					<p> Rating</p>
				</Stack>
				<div className={styles.productDetails}>
					<div>
						<h3> Price </h3>
						<p className={styles.price}> ${product.price} </p>
					</div>
					<div>
						<h3> Category </h3>
						<p className={styles.category}> {product.category} </p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default IndividualProductPage;
