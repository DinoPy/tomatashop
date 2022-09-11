import React from 'react';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from './UserAuthStatus.module.css';

const UserAuthStatus = () => {
	// we have signOutIcon that might be of use.
	const { data: session, status } = useSession();
	const userUrl = session?.user.images[0] || '/images/user-repl.png';

	return (
		<div className={styles.authStatusContainer}>
			{status === 'authenticated' && session ? (
				// <Link href='/api/auth/signout'> Sign Out </Link>
				<>
					<div className={styles.userInfo}>
						<div className={styles.userImage}>
							<Image
								src={userUrl}
								alt='UserPicture'
								width='50px'
								height='50px'
							/>
						</div>
						<h2> Hi, {session.user?.name?.split(' ')[0]}</h2>
					</div>
					<a href='#' onClick={() => signOut()}>
						Sign out{' '}
						<Image
							src='/images/logout.svg'
							alt=' '
							width='16px'
							height='16px'
						/>
					</a>
				</>
			) : (
				<a href='#' onClick={() => signIn()}>
					{' '}
					Sign in{' '}
					<Image src='/images/login.svg' alt=' ' width='16px' height='16px' />
				</a>
				// <Link href='/api/auth/signin'> Sign In </Link>
			)}
		</div>
	);
};

export default UserAuthStatus;
