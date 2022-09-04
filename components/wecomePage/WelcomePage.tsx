import Image from 'next/image';
import Link from 'next/link';
import styles from './WelcomePage.module.css';
import HeroSection from './heroSection/HeroSection';
import SubHeroSection from './subHeroSection/SubHeroSection';
import CategoriesSection from './categoriesSection/CategoriesSection';

const WelcomePage = () => {
	return (
		<>
			{' '}
			<HeroSection />
			<SubHeroSection /> <CategoriesSection />
		</>
	);
};

export default WelcomePage;
