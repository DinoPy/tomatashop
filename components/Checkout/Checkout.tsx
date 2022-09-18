import React from 'react';
import Paypal from '../../components/Paypal/Paypal';
import { useSession } from 'next-auth/react';
import { useCartCtx } from '../../utils/cartCtx';
import { useRouter } from 'next/router';
import styles from './Checkout.module.css';
import Image from 'next/image';

const Checkout = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const { cart, setCart } = useCartCtx();

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

	const total =
		cart
			// @ts-ignore
			?.reduce(
				(acc: number, curr: { _id: { price: number }; quantity: number }) => {
					return acc + curr._id.price * curr.quantity;
				},
				0
			)
			.toFixed(2) || (0 as number);

	return (
		<div>
			{session && cart.length > 0 ? (
				<div className={styles.checkoutContainer}>
					<h1 className={styles.checkoutTitle}>Checkout</h1>
					{cart.map((item) => {
						return (
							<div key={item._id._id} className={styles.lineItemContainer}>
								<Image
									src={item._id.image}
									width={100}
									height={100}
									alt={item._id.title}
									objectFit='contain'
								/>
								<div key={item._id._id} className={styles.summaryContainer}>
									<h2>{item._id.title}</h2>
									<div className={styles.priceContainer}>
										<p>Quantity {item.quantity}</p>
										<p> €{item._id.price}/ea</p>
									</div>
									<div className={styles.itemTotal}>
										<h3>Sum €{(item.quantity * item._id.price).toFixed(2)}</h3>
									</div>
								</div>
							</div>
						);
					})}
					<h1 className={styles.orderTotal}> Total €{total} </h1>
					<Paypal />
				</div>
			) : (
				<h1> You have no items in the cart</h1>
			)}
		</div>
	);
};

export default Checkout;
