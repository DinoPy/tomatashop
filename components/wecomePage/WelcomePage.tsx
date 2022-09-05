import HeroSection from './heroSection/HeroSection';
import SubHeroSection from './subHeroSection/SubHeroSection';
import CategoriesSection from './categoriesSection/CategoriesSection';
import { NextPage } from 'next';
import EshopCarousel from './eshopsSection/EshopSection';
import ReviewCarouselSection from './reviewCarouselSection/ReviewSection';

const WelcomePage: NextPage = () => {
	return (
		<>
			{' '}
			<HeroSection />
			<SubHeroSection />
			<CategoriesSection />
			<EshopCarousel />
			<ReviewCarouselSection />
		</>
	);
};

export default WelcomePage;
