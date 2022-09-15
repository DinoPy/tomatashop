import React from 'react';
import Paypal from '../../components/Paypal/Paypal';
import { useSession } from 'next-auth/react';
import { useCartCtx } from '../../utils/cartCtx';
import { useRouter } from 'next/router';

const Checkout = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const { cart, setCart } = useCartCtx();
	//

	if (!session) {
		router.push('/login');
	}

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
