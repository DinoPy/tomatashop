import type { NextPage } from 'next';
import Header from '../components/header/Header';
import SearchBox from '../components/navigationSubheader/NavigationSubheader';

const Home: NextPage<{ products: string }> = (props) => {
	const products = JSON.parse(props.products);
	return (
		<div>
			<Header />
			<SearchBox />
			{
				// huge image
				// small description
				// some carusel
				// footer
			}
		</div>
	);
};

export default Home;
