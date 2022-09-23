import HeroSection from './heroSection/HeroSection';
import SubHeroSection from './subHeroSection/SubHeroSection';
import CategoriesSection from './categoriesSection/CategoriesSection';
import { NextPage } from 'next';
import EshopCarousel from './eshopsSection/EshopSection';
import ReviewCarouselSection from './reviewCarouselSection/ReviewSection';
import { ReviewInterface } from '../../models/Reviews';

const WelcomePage: NextPage<{ reviews: ReviewInterface[] }> = ({ reviews }) => {
	return (
		<>
			{' '}
			<HeroSection />
			<SubHeroSection />
			<CategoriesSection />
			<EshopCarousel />
			<ReviewCarouselSection reviews={reviews} />
		</>
	);
};

export default WelcomePage;
