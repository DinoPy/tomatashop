import styles from './FavoritesIcon.module.css';

const FavoritesIcon = () => {
	return (
		<div className={styles.iconContainer}>
			<svg xmlns='http://www.w3.org/2000/svg' height='40' width='40'>
				<path d='M20 33.875 18.5 32.5q-4.25-3.875-7.021-6.667-2.771-2.791-4.396-4.958-1.625-2.167-2.271-3.937-.645-1.771-.645-3.521 0-3.5 2.333-5.834Q8.833 5.25 12.292 5.25q2.291 0 4.27 1.125Q18.542 7.5 20 9.625q1.583-2.208 3.521-3.292 1.937-1.083 4.187-1.083 3.459 0 5.792 2.333 2.333 2.334 2.333 5.834 0 1.75-.645 3.521-.646 1.77-2.271 3.937t-4.396 4.958Q25.75 28.625 21.5 32.5Zm0-2.792q4.083-3.75 6.75-6.416Q29.417 22 30.958 20q1.542-2 2.167-3.542.625-1.541.625-3.041 0-2.625-1.708-4.354-1.709-1.73-4.334-1.73-2.083 0-3.833 1.23-1.75 1.229-2.958 3.562h-1.834q-1.25-2.333-2.979-3.562-1.729-1.23-3.812-1.23-2.584 0-4.313 1.73-1.729 1.729-1.729 4.354 0 1.5.625 3.062.625 1.563 2.167 3.563 1.541 2 4.208 4.646 2.667 2.645 6.75 6.395Zm0-11.875Z' />
			</svg>
		</div>
	);
};

export default FavoritesIcon;
