import Image from 'next/image';
import styles from './SubHeroSection.module.css';

const SubHeroSection = () => {
	return (
		<section className={styles.subHeroSection}>
			<div className={styles.subHeroImage}>
				<Image
					style={{ borderRadius: '10px' }}
					src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b8d9a943-c96c-4d32-92cc-d8e476274009/df9a9o9-2c057d85-44de-4436-aa6e-4d730534ebde.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I4ZDlhOTQzLWM5NmMtNGQzMi05MmNjLWQ4ZTQ3NjI3NDAwOVwvZGY5YTlvOS0yYzA1N2Q4NS00NGRlLTQ0MzYtYWE2ZS00ZDczMDUzNGViZGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0._P5rrl5QgWrlfMuP7T4ic1roIyRMNC60VAA0Wd6ulig'
					alt='image of the author'
					width='400px'
					height='400px'
				/>
			</div>
			<div>
				<h2 className={styles.subHeroTitle}>About the author</h2>
				<p className={styles.subHeroText}>
					{' '}
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
					quae. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quae. Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Quisquam,
				</p>
			</div>
		</section>
	);
};

export default SubHeroSection;
