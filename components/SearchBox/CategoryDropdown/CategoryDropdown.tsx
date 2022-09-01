import Link from 'next/link';
import styles from './CategoryDropdown.module.css';

const CategoryDropdown = () => {
	return (
		<div className={styles.dropdown}>
			<button className={styles.dropdownButton}> Categories </button>
			<div className={styles.dropdownContent}>
				<Link href='/products/painting'>
					<a> Paintings </a>
				</Link>
				<Link href='/products/sketch'>
					<a> Sketches </a>
				</Link>
				<Link href='/products/illustration'>
					<a> Illustrations </a>
				</Link>
				<Link href='/products/calendar'>
					<a> Calendars </a>
				</Link>
				<Link href='/products/cover'>
					<a> Covers </a>
				</Link>
				<Link href='/products/clothing'>
					<a> Clothing </a>
				</Link>
			</div>
		</div>
	);
};

export default CategoryDropdown;
