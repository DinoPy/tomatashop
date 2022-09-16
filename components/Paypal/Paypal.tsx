import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useCartCtx } from '../../utils/cartCtx';
import { useRouter } from 'next/router';

const Paypal = () => {
	const { cart, setCart } = useCartCtx();
	const { data: session } = useSession();
	const router = useRouter();

	return (
		<PayPalScriptProvider
			options={{
				'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
				currency: 'EUR',
				intent: 'capture',
			}}
		>
			<PayPalButtons
				// createOrder={() => {
				// 	return fetch('/api/create-order', {
				// 		// we are using a post to the server to create the order using the db info
				// 		method: 'post',
				// 		headers: {
				// 			'Content-Type': 'application/json',
				// 		},
				// 		// as data we are sending a list with the items that we want to buy and the quantities of interest

				// 		body: JSON.stringify({
				// 			items: [{ id: '630fafc92b0a811896a75da4', quantity: 1 }],
				// 		}),
				// 	})
				// 		.then((res) => {
				// 			if (res.ok) return res.json();
				// 			return res.json().then((json) => Promise.reject(json));
				// 		})
				// 		.then(({ id }) => {
				// 			return id;
				// 		})
				// 		.catch((e) => {
				// 			console.error(e.error);
				// 		});
				// }}

				createOrder={async () => {
					const response = await fetch('/api/create-order', {
						// we are using a post to the server to create the order using the db info
						method: 'post',
						headers: {
							'Content-Type': 'application/json',
						},
						// as data we are sending a list with the items that we want to buy and the quantities of interest

						// body: JSON.stringify({
						// 	items: cart.map((item) => ({
						// 		id: item._id._id,
						// 		quantity: item.quantity,
						// 	})),
						// }),

						body: JSON.stringify({ userId: session?.user._id }),
					});

					try {
						const { id } = await response.json();
						if (response.ok) {
							return id;
						} else {
							return Promise.reject(id);
						}
					} catch (e) {
						console.log(e);
					}
				}}
				onApprove={(data, actions) => {
					return actions!.order!.capture().then(async (details) => {
						// const name = details?.payer?.name?.given_name;
						// alert(`Transaction completed by ${name}`);

						const response = await axios.post('/api/verify-order', {
							userId: session?.user._id,
							orderId: details.id,
						});

						if (response.status === 200) {
							// setCart([]);
							router.push('/orders');
						} else {
							alert('Something went wrong - the transaction was not completed');
						}
					});
				}}
			/>
		</PayPalScriptProvider>
	);
};

export default Paypal;
