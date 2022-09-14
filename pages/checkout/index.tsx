import React from 'react';
import Layout from '../../components/layout';
import Paypal from '../../components/Paypal/Paypal';

const Checkout = () => {
	return (
		<Layout>
			<h1>Checkout</h1>
			<Paypal />
		</Layout>
	);
};

export default Checkout;
