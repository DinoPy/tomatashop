import React from 'react';
import styles from './Header.module.css';
import UserAuthStatus from './UserAuthStatus';

const Header = () => {
	return (
		<header className={styles.header}>
			<div> Home </div>
			<UserAuthStatus />
		</header>
	);
};

export default Header;
