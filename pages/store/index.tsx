import React from 'react';
import Header from '../../components/header/Header';
import NavigationSubheader from '../../components/navigationSubheader/NavigationSubheader';
import StoreContainer from '../../components/storeContainer/StoreContainer';

const Store = () => {
	return (
		<>
			<Header />
			<NavigationSubheader />
			<StoreContainer products={[]} />
		</>
	);
};

export default Store;
