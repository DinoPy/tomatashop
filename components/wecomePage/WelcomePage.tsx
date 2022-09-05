import HeroSection from './heroSection/HeroSection';
import SubHeroSection from './subHeroSection/SubHeroSection';
import CategoriesSection from './categoriesSection/CategoriesSection';
import { NextPage } from 'next';

const WelcomePage: NextPage = () => {
	return (
		<>
			{' '}
			<HeroSection />
			<SubHeroSection />
			<CategoriesSection />
		</>
	);
};

export default WelcomePage;
