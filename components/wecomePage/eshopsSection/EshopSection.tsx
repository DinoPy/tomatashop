import Link from 'next/link';
import styles from './EshopSection.module.css';
import DesignByHuman from '../../logoIcons/DesignByHumans/DesignByHumans';
import Redbubble from '../../logoIcons/Redbubble/Redbubble';
import Inprnt from '../../logoIcons/Inprnt/Inprnt';

interface EshopSectionProps {
	LogoComponent: React.FC;
	href: string;
}

export const EShopLogo: React.FC<EshopSectionProps> = ({
	LogoComponent,
	href,
}) => {
	return (
		<a
			className={styles.eshopLogo}
			href={href}
			target='_blank'
			rel='noreferrer'
		>
			<LogoComponent />
		</a>
	);
};

const EshopSection: React.FC = () => {
	return (
		<div className={styles.eshopSection}>
			<EShopLogo
				LogoComponent={Inprnt}
				href='https://www.inprnt.com/gallery/yoktomato'
			/>
			<EShopLogo
				LogoComponent={Redbubble}
				href='https://www.redbubble.com/people/tomatia/shop'
			/>
			<EShopLogo
				LogoComponent={DesignByHuman}
				href='https://www.designbyhumans.com/shop/YokTomato/'
			/>
		</div>
	);
};

export default EshopSection;
