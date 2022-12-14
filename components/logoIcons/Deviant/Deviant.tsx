import React from 'react';
import styles from './Deviant.module.css';

const Deviant = () => {
	return (
		<div className={styles.deviantSvg}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				xmlnsXlink='http://www.w3.org/1999/xlink'
				version='1.1'
				width='35px'
				height='35px'
				viewBox='0 0 100 167'
				preserveAspectRatio='xMidYMid meet'
			>
				<path d=' M100 0 L99.96 0 L99.95 0 L71.32 0 L68.26 3.04 L53.67 30.89 L49.41 33.35 L0 33.35 L0 74.97 L26.40 74.97 L29.15 77.72 L0 133.36 L0 166.5 L0 166.61 L0 166.61 L28.70 166.6 L31.77 163.55 L46.39 135.69 L50.56 133.28 L100 133.28 L100 91.68 L73.52 91.68 L70.84 89 L100 33.33 '></path>
			</svg>
		</div>
	);
};

export default Deviant;
