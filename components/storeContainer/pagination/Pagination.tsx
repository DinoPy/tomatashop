import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import styles from './Pagination.module.css';

type PropsType = { pages: number };

const Pagination: NextPage<PropsType> = ({ pages }) => {
	const pagesJsx = (pages: number): JSX.Element[] => {
		const pagesArray = [];
		for (let i = 1; i <= pages; i++) {
			pagesArray.push(
				<li key={i}>
					<a href={`/store?page=${i}`}>{i}</a>
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
