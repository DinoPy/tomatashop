import type { NextPage } from 'next';
import MainPageHeader from '../components/mainPageHeader/MainPageHeader';
import MainContainer from '../components/mainContainer/MainContainer';
import dbConnect from '../lib/dbConnect';
import Products from '../models/Products';

const Home: NextPage<{ products: string }> = (props) => {
	const products = JSON.parse(props.products);
	return (
		<div>
			<MainPageHeader />
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
