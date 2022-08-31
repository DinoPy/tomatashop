import Link from 'next/link';
import React from 'react';
import styles from './Header.module.css';
import UserAuthStatus from './UserAuthStatus';

const Header = () => {
	return (
		<header className={styles.header}>
			<Link href='/'> Home </Link>
			<UserAuthStatus />
		</header>
	);
};

export default Header;
