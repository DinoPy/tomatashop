import React, { useContext, Dispatch, SetStateAction } from 'react';

const cartCtx = React.createContext<{
	setCart: Dispatch<SetStateAction<[]>>;
	cart: [];
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
