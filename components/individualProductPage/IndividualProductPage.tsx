import React from 'react';
import styles from './IndividualProductPage.module.css';
import Image from 'next/image';
import { NextPage } from 'next';
import { Product } from '../../types/interface/productPropsInterface';
import { useSession } from 'next-auth/react';
import { Checkbox } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useFavCtx } from '../../utils/favCtx';

const IndividualProductPage: NextPage<{ product: Product }> = ({ product }) => {
	const { data: session }: { data: any } = useSession();
	// const [isFavorite, setIsFavorite] = React.useState(false);

	// React.useEffect(() => {
	// 	setIsFavorite(session?.user?.favorites?.includes(product._id));
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);
	const { favorites, setFavorites } = useFavCtx();

	const handleChange = async () => {
		if (favorites.some((item) => item._id === product._id)) {
			fetch(
				`/api/addtocartfav/favorites/remove/${session?.user?._id}/${product._id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			).then(() => {
				setFavorites((prev) => prev.filter((fav) => fav._id !== product._id));
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
					setFavorites(data.favorites);
				}
			});
		}
	};

	return (
		<div className={styles.productContainer}>
			{session && (
				<Checkbox
					aria-label='Favorited'
					icon={<StarBorderIcon />}
					checkedIcon={<StarIcon />}
					checked={favorites.some((item) => item._id === product._id)}
					onChange={() => handleChange()}
					sx={{
						position: 'absolute',
						top: '0',
						right: '0',
					}}
					color='primary'
				/>
			)}
			<div className={styles.imageWrapper}>
				<Image
					className={styles.image}
					src={product.image}
					alt={product.title}
					width={500}
					height={500}
				/>
			</div>
			<div className={styles.productInfo}>
				<h1 className={styles.title}> {product.title} </h1>
				<p className={styles.description}> {product.description} </p>
				<div>
					<p> Input </p>
					<button> Add to cart </button>
				</div>
				<div>
					<p className={styles.price}> ${product.price} </p>
					<p className={styles.category}> {product.category} </p>
				</div>
			</div>
		</div>
	);
};

export default IndividualProductPage;
