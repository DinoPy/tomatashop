import React from 'react';
import Link from 'next/link';
import styles from './CategoryDropdown.module.css';

const CategoryDropdown = () => {
	return (
		<div className={styles.dropdown}>
			<button className={styles.dropdownButton}> Categories </button>
			<div className={styles.dropdownContent}>
				<Link href='/category/painting'>
					<a> Paintings </a>
				</Link>
				<Link href='/category/sketch'>
					<a> Sketches </a>
				</Link>
				<Link href='/category/illustration'>
					<a> Illustrations </a>
				</Link>
				<Link href='/category/calendar'>
					<a> Calendars </a>
				</Link>
				<Link href='/category/cover'>
					<a> Covers </a>
				</Link>
				<Link href='/category/clothing'>
					<a> Clothing </a>
				</Link>
			</div>
		</div>
	);
};

export default CategoryDropdown;
