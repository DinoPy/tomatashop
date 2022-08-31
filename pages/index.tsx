import type { NextPage } from 'next';
import Header from '../components/header/Header';
import SearchBox from '../components/SearchBox/SearchBox';
import MainContainer from '../components/mainContainer/MainContainer';
import dbConnect from '../lib/dbConnect';
import Products from '../models/Products';

const Home: NextPage<{ products: string }> = (props) => {
	const products = JSON.parse(props.products);
	return (
		<div>
			<Header />
			{/* <SearchBox /> */}
			<MainContainer products={products} />
		</div>
	);
};

export async function getServerSideProps() {
	try {
		await dbConnect();
		const data = await Products.find();

		return {
			props: {
				products: JSON.stringify(data),
			},
		};
	} catch (error) {
		return {
			props: {
				products: [],
			},
		};
	}
}

export default Home;
