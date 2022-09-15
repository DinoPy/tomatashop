import styles from './CartSidebar.module.css';
import React, { Dispatch, SetStateAction } from 'react';
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { useCartCtx } from '../../utils/cartCtx';
import { useSession } from 'next-auth/react';
import CartLineItem from './CartLineItem/CartLineItem';
import { useRouter } from 'next/router';

//

const StyledContainer = styled(Box)({
	width: '300px',
	height: '100%',
	backgroundColor: '#252525',
	color: 'white',
	padding: '20px 10px 20px 20px',
});

const CartSidebar: React.FC<{
	setCartSidebarOpen: Dispatch<SetStateAction<boolean>>;
	cartSidebarOpen: boolean;
}> = ({ setCartSidebarOpen, cartSidebarOpen }) => {
	//
	const router = useRouter();
	const { cart, setCart } = useCartCtx();
	const { data: session } = useSession();
	//

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

	const returnData =
		cart?.length > 0 ? (
			cart.map((cartItem) => (
				<CartLineItem key={cartItem._id._id} cartItem={cartItem} />
			))
		) : (
			<h1> You have no items in the cart</h1>
		);

	//
	return (
		<div className={styles.sidebarContainer}>
			{
				<React.Fragment>
					<Drawer
						anchor='right'
						open={cartSidebarOpen}
						onClose={() => setCartSidebarOpen(false)}
					>
						<StyledContainer>
							{session ? (
								<div className={styles.cartContainer}>
									<div>
										<h1 className={styles.cartTitle}>Cart</h1>
										{returnData}
									</div>
									<div className={styles.totalContainer}>
										<h2> Total €{total}</h2>
										<button
											className={styles.checkoutBtn}
											disabled={Boolean(cart.length === 0)}
											onClick={() => {
												router.push('/checkout');
											}}
										>
											{' '}
											Checkout
										</button>
									</div>
								</div>
							) : (
								<h1> Please sign in to access the cart</h1>
							)}
						</StyledContainer>
					</Drawer>
				</React.Fragment>
			}

			{/* <CloseIcon
				sx={{ position: 'absolute', top: 5, right: 5, cursor: 'pointer' }}
				onClick={() => setSidebarOpen(false)}
				// onClose={() => setSidebarOpen(false)}
			/> */}
		</div>
	);
};

export default CartSidebar;
