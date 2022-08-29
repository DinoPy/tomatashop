import { NextPage } from 'next';
import React from 'react';
import { Product } from '../../types/interface/productPropsInterface';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import styles from './ProductItem.module.css';

const ProductItem: NextPage<{ product: Product }> = ({ product }) => {
	const { data: session, status } = useSession();
	console.log('SESSION: ', session, 'STATUS: ', status);
	const item = (product: Product): JSX.Element => (
		<>
			<div className={`${styles.productItem}`}>
				<div className={`${styles.productImage}`}>
					<Image
						width='200px'
						height='200px'
						src={product.image}
						alt={product.title}
					/>
				</div>
				<p className={`${styles.productTitle}`}> {product.title}</p>
			</div>
		</>
	);

	return (
		<>
			<div> {item(product)} </div>
		</>
	);
};

export default ProductItem;
