import {
	PayPalButtons,
	PayPalScriptProvider,
	usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import React from 'react';

const Paypal = () => {
	return (
		<PayPalScriptProvider
			options={{
				'client-id':
					'AR_So18PHo_-j6RPLleQNtGJx98srbotMFHxtM37CezLKkIzaWNUg5070lAydg_v1Ib5iKcFDto7Yy1h',
				currency: 'EUR',
				intent: 'capture',
			}}
		>
			<PayPalButtons
				createOrder={() => {
					return fetch('/api/create-order', {
						// we are using a post to the server to create the order using the db info
						method: 'post',
						headers: {
							'Content-Type': 'application/json',
						},
						// as data we are sending a list with the items that we want to buy and the quantities of interest

						body: JSON.stringify({
							items: [{ id: '630fafc92b0a811896a75da4', quantity: 1 }],
						}),
					})
						.then((res) => {
							if (res.ok) return res.json();
							return res.json().then((json) => Promise.reject(json));
						})
						.then(({ id }) => {
							return id;
						})
						.catch((e) => {
							console.error(e.error);
						});
				}}
				onApprove={(data, actions) => {
					return actions.order.capture().then((details) => {
						console.log('paid');
						alert(`Transaction completed by ${details.payer.name.given_name}`);
					});
				}}
			/>
		</PayPalScriptProvider>
	);
};

export default Paypal;
