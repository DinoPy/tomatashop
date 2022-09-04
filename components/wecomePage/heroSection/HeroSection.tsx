import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HeroSection.module.css';

const HeroSection = () => {
	return (
		<section className={styles.heroSection}>
			<div className={styles.leftHeroSection}>
				<h1 className={styles.heroTitle}> Welcome to Tomata Art Store</h1>
				<p className={styles.heroDescription}>
					When the world is in chaos, art is the only thing that can save us. Do
					focus on the art you see and allow yourself to be emersed into another
					world.
				</p>

				<Link href='/store'>
					<a className={styles.heroButton}>Shop Now</a>
				</Link>
			</div>

			<Image
				className={styles.heroImage}
				src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b8d9a943-c96c-4d32-92cc-d8e476274009/df9chsn-0c302bfe-8963-4a09-ac11-d312a6d80a78.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I4ZDlhOTQzLWM5NmMtNGQzMi05MmNjLWQ4ZTQ3NjI3NDAwOVwvZGY5Y2hzbi0wYzMwMmJmZS04OTYzLTRhMDktYWMxMS1kMzEyYTZkODBhNzgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.f4prBIUejlg0BbrJEsQtkZc6Wi4ZQDl24zv367Tys9E'
				width='800px'
				height='600px'
				alt='blood sucker abstract'
			/>
		</section>
	);
};

export default HeroSection;
