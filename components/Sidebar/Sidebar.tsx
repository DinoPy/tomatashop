import styles from './Sidebar.module.css';
import React, { Dispatch, SetStateAction } from 'react';
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/material';

const Sidebar: React.FC<{
	setSidebarOpen: Dispatch<SetStateAction<boolean>>;
	sidebarOpen: boolean;
}> = ({ setSidebarOpen, sidebarOpen }) => {
	return (
		<div className={styles.sidebarContainer}>
			{
				<React.Fragment>
					<Drawer
						anchor='right'
						open={sidebarOpen}
						onClose={() => setSidebarOpen(false)}
					>
						<Box
							sx={{
								width: '300px',
								height: '100%',
								backgroundColor: 'darkgray',
							}}
						>
							Content
						</Box>
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

export default Sidebar;
