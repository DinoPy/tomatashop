import Image from 'next/image';
import { useRef } from 'react';
import styles from './ReviewSection.module.css';

const Review: React.FC = () => {
	return (
		<li className={styles.slide}>
			<div className={styles.reviewContainer}>
				<div className={styles.reviewImageContainer}>
					<Image
						src='https://tomatastore.s3.eu-central-1.amazonaws.com/idtest/8aba091f-a210-4669-bc6c-c013185c10a6.png'
						layout='fill'
						alt='Image of an user'
						objectFit='cover'
						objectPosition='center'
					/>
				</div>
				<h1 className={styles.reviewTitle}> Very cool shizen :O !!!</h1>
				<p className={styles.reviewBody}>
					{' '}
					I like the way you use abstraction to your advantage and create portal
					looking arts.
				</p>
			</div>
		</li>
	);
};

const ReviewSection: React.FC = () => {
	const slidesContainer = useRef(null)!;

	const handleNextClick = (e: any, direction: string) => {
		if (direction === 'prev') {
			(
				e.currentTarget.parentElement!.querySelector('ul') as HTMLUListElement
			).scrollLeft -=
				e.currentTarget.parentElement!.querySelector('li')!.clientWidth;
		} else {
			(
				e.currentTarget.parentElement!.querySelector('ul') as HTMLUListElement
			).scrollLeft +=
				e.currentTarget.parentElement!.querySelector('li')!.clientWidth;
		}
	};

	return (
		<div className={`${styles.reviewSection}`}>
			<div className={styles.sliderWrapper}>
				<button
					className={`${styles.slideArrow} ${styles.slideArrowPrev}`}
					onClick={(e) => handleNextClick(e, 'prev')}
				>
					&#8249;
				</button>
				<button
					className={`${styles.slideArrow} ${styles.slideArrowNext}`}
					onClick={(e) => handleNextClick(e, 'next')}
				>
					&#8250;
				</button>
				<ul ref={slidesContainer} className={`${styles.slidesContainer}`}>
					<Review />
					<Review />
					<Review />
					<Review />
					<Review />
				</ul>
			</div>
		</div>
	);
};

export default ReviewSection;
