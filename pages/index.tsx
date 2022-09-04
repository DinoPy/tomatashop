import type { NextPage } from 'next';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import SearchBox from '../components/navigationSubheader/NavigationSubheader';
import WelcomePage from '../components/wecomePage/WelcomePage';

const Home: NextPage = () => {
	return (
		<>
			<Header />
			<SearchBox />
			<WelcomePage />
			{
				// huge image
				// small description
				// some carusel
				// footer
			}
			<Footer />
		</>
	);
};

export default Home;
