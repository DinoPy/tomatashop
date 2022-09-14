import styles from './CartSidebar.module.css';
import React, { Dispatch, SetStateAction } from 'react';
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { useCartCtx } from '../../utils/cartCtx';
import { useSession } from 'next-auth/react';

const StyledContainer = styled(Box)({
	width: '300px',
	height: '100%',
	backgroundColor: 'darkgray',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

const CartSidebar: React.FC<{
	setCartSidebarOpen: Dispatch<SetStateAction<boolean>>;
	cartSidebarOpen: boolean;
}> = ({ setCartSidebarOpen, cartSidebarOpen }) => {
	//
	const { cart, setCart } = useCartCtx();
	const { data: session } = useSession();
	//

	const cartData =
		cart.length > 0 ? (
			cart.map((cartItem) => (
				<div key={cartItem._id}>
					<h3> {cartItem.title}</h3>
					<h5> {carItem.price} </h5>
				</div>
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
								<div>{cartData}</div>
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
