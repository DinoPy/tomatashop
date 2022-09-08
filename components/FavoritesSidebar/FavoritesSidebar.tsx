import styles from './FavoritesSidebar.module.css';
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

const FavoritesSidebar: React.FC<{
	setFavoritesSidebarOpen: Dispatch<SetStateAction<boolean>>;
	favoritesSidebarOpen: boolean;
}> = ({ setFavoritesSidebarOpen, favoritesSidebarOpen }) => {
	return (
		<div className={styles.sidebarContainer}>
			{
				<React.Fragment>
					<Drawer
						anchor='right'
						open={favoritesSidebarOpen}
						onClose={() => setFavoritesSidebarOpen(false)}
					>
						<StyledContainer>Favorites Sidebar content</StyledContainer>
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

export default FavoritesSidebar;
