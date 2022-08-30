import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Header from '../../components/header/Header';
import { Product } from '../../types/interface/productPropsInterface';

const ProductPage: NextPage<Product> = () => {
	const router = useRouter();
	const { productId } = router.query;

	return (
		<>
			<Header />
			<div> Product # {productId} </div>
		</>
	);
};

export default ProductPage;
