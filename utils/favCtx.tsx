import React, { useContext, Dispatch, SetStateAction } from 'react';
import { FavoritesProps } from '../components/layout';

const favCtx = React.createContext<{
	setFavorites: Dispatch<SetStateAction<FavoritesProps['favorites']>>;
	favorites: FavoritesProps['favorites'];
}>({ setFavorites: () => {}, favorites: [] });

function FavCtxProvider({
	children,
	value,
}: {
	children: React.ReactNode;
	value: any;
}) {
	return <favCtx.Provider value={value}>{children}</favCtx.Provider>;
}

const useFavCtx = () => useContext(favCtx);

export { FavCtxProvider, useFavCtx };
