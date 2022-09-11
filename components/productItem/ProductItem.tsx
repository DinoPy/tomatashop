import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { Product } from '../../types/interface/productPropsInterface';
import Image from 'next/image';
import styles from './ProductItem.module.css';

const ProductItem: NextPage<{ product: Product }> = ({ product }) => {
	const item = (product: Product): JSX.Element => {
		return (
			<>
				<Link href={`/product/${product._id}`}>
					<div className={`${styles.productItem}`}>
						<div className={`${styles.productImage}`}>
							<Image
								width='200px'
								height='200px'
								layout='intrinsic'
								src={product.image}
								alt={product.title}
								blurDataURL={product.image}
							/>
						</div>
						<p className={`${styles.productTitle}`}> {product.title}</p>
					</div>
				</Link>
			</>
		);
	};

	return (
		<>
			<div> {item(product)} </div>
		</>
	);
};

export default ProductItem;
