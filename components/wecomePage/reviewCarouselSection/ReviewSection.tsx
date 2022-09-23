import Image from 'next/image';
import { useRef } from 'react';
import { ReviewInterface } from '../../../models/Reviews';
import { UserInterface } from '../../../models/Users';
import styles from './ReviewSection.module.css';

const Review = ({ review }: { review: ReviewInterface }) => {
	return (
		<li className={styles.slide}>
			<div className={styles.reviewContainer}>
				<div className={styles.reviewImageContainer}>
					<Image
						src={(review.userId as UserInterface).images[0]}
						layout='fill'
						alt='Image of an user'
						objectFit='cover'
						objectPosition='center'
					/>
				</div>
				<h1 className={styles.reviewTitle}> {review.title}</h1>
				<p className={styles.reviewBody}>{review.comment}</p>
			</div>
		</li>
	);
};

const ReviewSection = ({ reviews }: { reviews: ReviewInterface[] }) => {
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
					{reviews.map((review) => {
						return <Review key={String(review._id)} review={review} />;
					})}
				</ul>
			</div>
		</div>
	);
};

export default ReviewSection;
