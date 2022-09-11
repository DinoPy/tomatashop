import Link from 'next/link';
import React from 'react';
import styles from './Header.module.css';
import UserAuthStatus from './useAuthStatus/UserAuthStatus';
import Image from 'next/image';

const Header = () => {
	return (
		<header className={styles.header}>
			<Link href='/'>
				<a className={styles.logo} id='home'>
					<Image
						src='/images/1-transparent.svg'
						alt='yok tomato logo'
						width='100%'
						height='100%'
						layout='responsive'
					/>
				</a>
			</Link>
			<UserAuthStatus />
		</header>
	);
};

export default Header;
