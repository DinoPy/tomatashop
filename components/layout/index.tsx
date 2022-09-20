import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import NavigationSubheader from '../navigationSubheader/NavigationSubheader';
import { Fab } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import { FavCtxProvider } from '../../utils/favCtx';
import { CartCtxProvider } from '../../utils/cartCtx';

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

export interface CartProps {
	cart:
		| {
				_id: {
					_id: string;
					title: string;
					price: number;
					image: string;
				};
				quantity: number;
		  }[]
		| [];
}

export default function Layout({ children }: any) {
	const [favorites, setFavorites] = React.useState<FavoritesProps['favorites']>(
		[]
	);
	const [cart, setCart] = React.useState<CartProps['cart']>([]);

	return (
		<FavCtxProvider value={{ favorites, setFavorites }}>
			<CartCtxProvider value={{ cart, setCart }}>
				<>
					<Header />
					<NavigationSubheader />
					<div style={{ minHeight: '50vh' }}>{children}</div>
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
			</CartCtxProvider>
		</FavCtxProvider>
	);
}
