import styles from './CartSidebar.module.css';
import React, { Dispatch, SetStateAction } from 'react';
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

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
	return (
		<div className={styles.sidebarContainer}>
			{
				<React.Fragment>
					<Drawer
						anchor='right'
						open={cartSidebarOpen}
						onClose={() => setCartSidebarOpen(false)}
					>
						<StyledContainer>Cart sidebar content</StyledContainer>
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
