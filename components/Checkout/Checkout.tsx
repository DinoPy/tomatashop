import React from 'react';
import Paypal from '../../components/Paypal/Paypal';
import { useSession } from 'next-auth/react';
import { useCartCtx } from '../../utils/cartCtx';
import { useRouter } from 'next/router';

const Checkout = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const { cart, setCart } = useCartCtx();

	console.log(cart);
	// session is null if not logged in and it has to get the session on every route change, the cart is the same.

	// React.useEffect(() => {
	// 	if (!session) {
	// 		router.push('/api/auth/signin');
	// 		console.log('no session');
	// 	}

	// 	if (cart.length === 0) {
	// 		router.push('/store');
	// 		console.log('no items in cart');
	// 	}
	// }, []);

	return (
		<div>
			{session && cart.length > 0 ? (
				<>
					<h1>Checkout</h1>
					<Paypal />
				</>
			) : (
				<h1> You have no items in the cart</h1>
			)}
		</div>
	);
};

export default Checkout;
