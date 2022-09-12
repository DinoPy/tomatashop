import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import NavigationSubheader from '../navigationSubheader/NavigationSubheader';
import { Fab } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import { FavCtxProvider } from '../../utils/favCtx';

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

export default function Layout({ children }: any) {
	const [favorites, setFavorites] = React.useState<FavoritesProps['favorites']>(
		[]
	);

	return (
		<FavCtxProvider value={{ favorites, setFavorites }}>
			<>
				<Header />
				<NavigationSubheader />
				{children}
				<Footer />
				<Fab
					variant='extended'
					sx={{
						position: 'fixed',
						bottom: '3%',
						right: '3%',
						bgcolor: 'grey.800',
						color: 'white',
						padding: '.5rem .5rem',
						'&:hover': {
							bgcolor: 'grey.700',
						},
					}}
				>
					<a href='#home'>
						<NavigationIcon />
					</a>
				</Fab>
			</>
		</FavCtxProvider>
	);
}
