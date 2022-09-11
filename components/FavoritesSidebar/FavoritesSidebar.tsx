import styles from './FavoritesSidebar.module.css';
import React, { Dispatch, SetStateAction } from 'react';
import Drawer from '@mui/material/Drawer';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

const favContainerStyles = {
	width: '300px',
	height: '100%',
	display: 'flex',
	backgroundColor: 'rgba(1,0,0,0.5)',
	padding: '10px',
};
//

export interface FavoritesProps {
	favorites:
		| {
				_id: string;
				title: string;
				category: string;
				image: string;
				price: number;
				description: string;
				rating: {
					rate: number;
					count: number;
				};
				createdAt: string;
				updatedAt: string;
		  }[]
		| [];
}

const FavoritesSidebar: React.FC<{
	setFavoritesSidebarOpen: Dispatch<SetStateAction<boolean>>;
	favoritesSidebarOpen: boolean;
}> = ({ setFavoritesSidebarOpen, favoritesSidebarOpen }) => {
	//
	const { data: session } = useSession();
	const [favorites, setFavorites] = React.useState<FavoritesProps['favorites']>(
		[]
	);

	React.useEffect(() => {
		async function fetchFavorites() {
			const response = await axios.post('/api/favorites', {
				email: session?.user.email,
			});
			setFavorites(response.data[0]?.favorites);
		}

		fetchFavorites();
		console.log(favorites);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClick = async (id: string) => {
		const response = axios.put(
			`/api/addtocartfav/favorites/remove/${session?.user?._id}/${id}`
		);
		setFavorites((prev) => prev.filter((item) => item._id !== id));
	};

	const returnJsx = favorites?.map((fav) => {
		return (
			<div key={fav._id} className={styles.lineItemContainer}>
				<div className={styles.imageContainer}>
					<Image
						src={fav.image}
						width={70}
						height={70}
						alt='product image'
						objectFit='cover'
					/>
				</div>
				<Link href={`/product/${fav._id}`}>
					<p className={styles.title}>{fav.title}</p>
				</Link>
				<DeleteOutlineIcon
					sx={{ position: 'absolute', bottom: 0, right: 0, cursor: 'pointer' }}
					fontSize='small'
					color='primary'
					onClick={(e) => {
						handleClick(fav._id);
					}}
				/>
			</div>
		);
	});

	return (
		<div className={styles.sidebarContainer}>
			{
				<React.Fragment>
					<Drawer
						anchor='right'
						open={favoritesSidebarOpen}
						onClose={() => setFavoritesSidebarOpen(false)}
						hideBackdrop={false}
					>
						{session ? (
							<div style={{ ...favContainerStyles, flexDirection: 'column' }}>
								<h1 className={styles.favTitle}>Favorites</h1>
								{returnJsx}
							</div>
						) : (
							<div style={{ ...favContainerStyles, flexDirection: 'column' }}>
								{' '}
								Please login to see your favorites{' '}
							</div>
						)}
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
