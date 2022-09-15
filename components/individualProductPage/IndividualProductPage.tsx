import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './IndividualProductPage.module.css';
import { NextPage } from 'next';
import { Product } from '../../types/interface/productPropsInterface';
import { useSession } from 'next-auth/react';
import { Checkbox } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useFavCtx } from '../../utils/favCtx';
import { useCartCtx } from '../../utils/cartCtx';

const IndividualProductPage: NextPage<{ product: Product }> = ({ product }) => {
	const { data: session }: { data: any } = useSession();
	const { favorites, setFavorites } = useFavCtx();
	const { cart, setCart } = useCartCtx();
	const [quantityInput, setQuantityInput] = React.useState<number>(1);
	const router = useRouter();

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

	return (
		<div className={styles.productContainer}>
			<p
				style={{
					position: 'absolute',
					top: '1em',
					left: '1em',
					color: 'red',
					cursor: 'pointer',
				}}
				onClick={() => router.back()}
			>
				{' '}
				Back{' '}
			</p>
			{session && (
				<Checkbox
					aria-label='Favorited'
					icon={<StarBorderIcon sx={{ fill: 'white' }} />}
					checkedIcon={<StarIcon />}
					checked={favorites?.some((item) => item._id === product._id)}
					onChange={() => handleFavoritesChange()}
					sx={{
						position: 'absolute',
						top: '0',
						right: '0',
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
