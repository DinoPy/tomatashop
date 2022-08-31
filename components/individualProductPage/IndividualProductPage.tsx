import React from 'react';
import { NextPage } from 'next';
import { Product } from '../../types/interface/productPropsInterface';

const IndividualProductPage: NextPage<{ product: Product }> = ({ product }) => {
	return (
		<div>
			<h1>{product.title}</h1>
		</div>
	);
};

export default IndividualProductPage;
