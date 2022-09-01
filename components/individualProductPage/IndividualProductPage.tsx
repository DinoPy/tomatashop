import React from 'react';
import styles from './IndividualProductPage.module.css';
import Image from 'next/image';
import { NextPage } from 'next';
import { Product } from '../../types/interface/productPropsInterface';

const IndividualProductPage: NextPage<{ product: Product }> = ({ product }) => {
	return (
		<div className={styles.productContainer}>
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
