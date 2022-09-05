import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import styles from './Pagination.module.css';
import { useRouter } from 'next/router';

type PropsType = { pages: number };

const Pagination: NextPage<PropsType> = ({ pages }) => {
	const router = useRouter();
	const { page } = router.query;
	const activePageNumber = Number(page) || 1;

	const pagesJsx = (pages: number): JSX.Element[] => {
		const pagesArray = [];
		for (let i = 1; i <= pages; i++) {
			pagesArray.push(
				<li key={i}>
					<a
						style={{
							fontWeight: activePageNumber === i ? 'bold' : 'regular',
							textDecoration: activePageNumber === i ? 'underline' : 'none',
						}}
						href={`/store?page=${i}`}
					>
						{i}
					</a>
				</li>
			);
		}
		return pagesArray;
	};

	return (
		<ul className={styles.paginationContainer}> Page: {pagesJsx(pages)} </ul>
	);
};

export default Pagination;
