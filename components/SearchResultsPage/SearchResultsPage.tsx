import React from 'react';
import styles from './SearchResultsPage.module.css';
import { ProductsProps } from '../../types/interface/productPropsInterface';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

const SearchResultsPage: React.FC<{ products: ProductsProps['products'] }> = ({
	products,
}: {
	products: ProductsProps['products'];
}) => {
	const router = useRouter();

	return (
		<div className={styles.searchContainer}>
			<h1>Search results for {router.query.query}</h1>
			{products?.map((product) => (
				<div key={product._id} className={styles.lineItemContainer}>
					<Image
						src={product.image}
						width={200}
						height={100}
						alt={product.title}
						objectFit='contain'
					/>
					<div>
						<Link href={`/product/${product._id}`}>
							<h2 className={styles.title}>{product.title}</h2>
						</Link>
						<p className={styles.price}>€{product.price}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default SearchResultsPage;
