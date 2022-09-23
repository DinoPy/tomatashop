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
import { Box, Checkbox, Fab } from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import Reviews from './Reviews/Reviews';
import { ReviewInterface } from '../../models/Reviews';

const IndividualProductPage: NextPage<{ product: Product }> = ({ product }) => {
	const [productData, setProductData] = React.useState<Product>(product);

	const { data: session }: { data: any } = useSession();
	const { favorites, setFavorites } = useFavCtx();
	const { cart, setCart } = useCartCtx();
	const [quantityInput, setQuantityInput] = React.useState<number>(1);
	const router = useRouter();

	///

	const handleFavoritesChange = async () => {
		if (favorites?.some((item) => item._id === productData?._id)) {
			fetch(
				`/api/addtocartfav/favorites/remove/${session?.user?._id}/${productData?._id}`,
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
				`/api/addtocartfav/favorites/add/${session?.user?._id}/${productData?._id}`,
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
		const activeItemQty = cart?.find(
			(item) => item._id._id === productData?._id
		);

		if (session) {
			const response = await axios.post(
				`/api/addtocartfav/cart/add/${session?.user?._id}/${productData?._id}/`,
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

	return (
		<div className={styles.productContainer}>
			<Fab
				variant='extended'
				sx={{
					position: 'absolute',
					zIndex: 5,
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
					checked={favorites?.some((item) => item._id === productData?._id)}
					onChange={() => handleFavoritesChange()}
					sx={{
						position: 'absolute',
						top: '-8%',
						right: '-5%',
					}}
					color='primary'
				/>
			)}
			<h1 className={styles.title}> {productData?.title} </h1>
			<div className={styles.imageWrapper}>
				<Image
					className={styles.image}
					src={productData?.image}
					alt={productData?.title}
					layout='fill'
					objectFit='contain'
				/>
			</div>
			<div className={styles.productInfo}>
				<h2> Description</h2>
				<p className={styles.description}> {productData?.description} </p>
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
				<Box sx={{ display: 'flex' }}>
					<Rating
						name='half-rating-read'
						value={
							productData?.rating?.reduce((a, b) => a + b, 0) /
								productData?.rating?.length || 0
						}
						precision={0.1}
						readOnly
					/>
					<p>
						{' '}
						{(
							productData?.rating?.reduce((a, b) => a + b, 0) /
								productData?.rating?.length || 0
						).toFixed(1)}
						({productData?.rating.length})
					</p>
				</Box>
				<div className={styles.productDetails}>
					<div>
						<h3> Price </h3>
						<p className={styles.price}> ${productData?.price} </p>
					</div>
					<div>
						<h3> Category </h3>
						<p className={styles.category}> {productData?.category} </p>
					</div>
				</div>

				<Reviews
					productId={productData?._id}
					reviewsList={productData?.reviews as ReviewInterface[]}
					setProductData={setProductData}
				/>
			</div>
		</div>
	);
};

export default IndividualProductPage;

////////////////////////////
/// the page reloads due to router.redirect(router.asPath) but the state of the rating
// does not update also the rating shows wrong value also user can stil add new reviews
