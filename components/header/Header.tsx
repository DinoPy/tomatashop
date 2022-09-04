import Link from 'next/link';
import React from 'react';
import styles from './Header.module.css';
import UserAuthStatus from './useAuthStatus/UserAuthStatus';
import Image from 'next/image';

const Header = () => {
	// add favorite items and cart items to header
	// and maybe categories as a dropdown menu
	return (
		<header className={styles.header}>
			<Link href='/'>
				<a className={styles.logo}>
					<Image
						src='/images/1-transparent.svg'
						alt='yok tomato logo'
						width={250}
						height={50}
					/>
				</a>
			</Link>
			<UserAuthStatus />
		</header>
	);
};

export default Header;
