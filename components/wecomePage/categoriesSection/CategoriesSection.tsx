import { NextPage } from 'next';
import Link from 'next/link';
import styles from './CategoriesSection.module.css';

const placeholderDescriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fermentum risus vel lobortis congue. In a orci viverra, pretium purus sit amet, varius nibh. Fusce blandit, mi sed suscipit hendrerit, massa arcu tristique enim, id dignissim eros tellus quis urna.`;

interface categoryProps {
	title: string;
	description: string;
	href: string;
}

export const CategoryComponent: React.FC<categoryProps> = ({
	title,
	description,
	href,
}) => {
	return (
		<div className={styles.categoryContainer}>
			<h2 className={styles.categoryTitle}> {title} </h2>
			<p className={styles.categoryText}> {description}</p>
			<Link href={`/category/${href}`}>
				<a className={styles.categoryLeadButton}>View more</a>
			</Link>
		</div>
	);
};

const CategoriesSection: React.FC = () => {
	return (
		<section className={styles.categoriesSection}>
			<h1 className={styles.sectionTitle}> Categories of arts </h1>
			<CategoryComponent
				title='Paintings'
				description={placeholderDescriptionText}
				href='/painting'
			/>
			<CategoryComponent
				title='Sketches'
				description={placeholderDescriptionText}
				href='/sketch'
			/>
			<CategoryComponent
				title='Illustrations'
				description={placeholderDescriptionText}
				href='/illustration'
			/>
			<CategoryComponent
				title='Calendars'
				description={placeholderDescriptionText}
				href='/calendar'
			/>
			<CategoryComponent
				title='Covers'
				description={placeholderDescriptionText}
				href='/cover'
			/>
			<CategoryComponent
				title='Clothing'
				description={placeholderDescriptionText}
				href='/clothing'
			/>
		</section>
	);
};

export default CategoriesSection;
