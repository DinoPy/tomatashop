import type { NextPage } from 'next';
import MainPageHeader from '../components/header/MainPageHeader';
import MainContainer from '../components/mainContainer/MainContainer';
import { ProductsProps } from '../types/interface/productPropsInterface';
import dbConnect from '../lib/dbConnect';
import Products from '../models/Products'
import { Product } from '../types/interface/productPropsInterface';

const Home: NextPage<{products:string}> = (props) => {
	const products = JSON.parse(props.products	)
	return (
		<div>
			<MainPageHeader />
			<MainContainer products={products} />
		</div>
	);
};

export async function getServerSideProps() {
	await dbConnect()	
	const data = await Products.find()
	
	return {
		props: {
			products: JSON.stringify(data)
		}
	};
}

export default Home;