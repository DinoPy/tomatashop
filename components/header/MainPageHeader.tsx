import type { NextPage } from 'next';
import styles from './MainPageHeader.module.css';

const MainPageHeader: NextPage = () => {
	return (
		<header>
			<div className={styles.headerUpper}>
				<h1 className={styles.shopTitle}>
					Tomato <br /> Shop
				</h1>
			</div>
			<div className={styles.headerLower}>
				<p className={`${styles.subtitleArt} ${styles.subtitle} `}>Another</p>
				<p className={`${styles.subtitle} ${styles.subtitleCenter}`}>
					Shop <br /> Style <br /> Form
				</p>
				<p className={`${styles.subtitleArt} ${styles.subtitle} `}> Art</p>
			</div>
		</header>
	);
};

export default MainPageHeader;
