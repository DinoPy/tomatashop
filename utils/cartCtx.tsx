import React, { useContext, Dispatch, SetStateAction } from 'react';
import { CartProps } from '../components/layout';

const cartCtx = React.createContext<{
	setCart: Dispatch<SetStateAction<CartProps['cart']>>;
	cart: CartProps['cart'];
}>({
	setCart: () => {},
	cart: [],
});

function CartCtxProvider({
	children,
	value,
}: {
	children: React.ReactNode;
	value: any;
}) {
	return <cartCtx.Provider value={value}> {children} </cartCtx.Provider>;
}

const useCartCtx = () => useContext(cartCtx);

export { CartCtxProvider, useCartCtx };
