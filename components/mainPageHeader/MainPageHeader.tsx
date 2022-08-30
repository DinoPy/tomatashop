import type { NextPage } from 'next';
import styles from './MainPageHeader.module.css';
import Router from 'next/router';

const MainPageHeader: NextPage = () => {
	const router = Router;
	return (
		<header>
			<div className={styles.headerLower}>
				<h1 className={styles.shopTitle} onClick={() => router.push('/')}>
					Tomato <br /> Shop
				</h1>
				<p className={`${styles.subtitleArt} ${styles.subtitle} `}>Another</p>
				<p className={`${styles.subtitle} ${styles.subtitleCenter}`}>
					Shop <br /> Style <br /> Form
				</p>
				<p className={`${styles.subtitleArt} ${styles.subtitle} `}> Art</p>
			</div>
			<div className={`${styles.iconsBar}`}></div>
		</header>
	);
};

export default MainPageHeader;
