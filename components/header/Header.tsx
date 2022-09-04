import Link from 'next/link';
import React from 'react';
import styles from './Header.module.css';
import UserAuthStatus from './useAuthStatus/UserAuthStatus';

const Header = () => {
	// add favorite items and cart items to header
	// and maybe categories as a dropdown menu
	return (
		<header className={styles.header}>
			<Link href='/'>
				<a className={styles.logo}>TomataStore</a>
			</Link>
			<UserAuthStatus />
		</header>
	);
};

export default Header;
