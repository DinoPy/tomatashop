import React from 'react';
import Image from 'next/image';
import styles from './Header.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';
import signOutIcon from '../../public/images/logout.svg';
import { icons } from '../images';

const UserAuthStatus = () => {
	// we have signOutIcon that might be of use.
	const { data: session, status } = useSession();
	return (
		<div>
			{status === 'authenticated' && session ? (
				// <Link href='/api/auth/signout'> Sign Out </Link>
				<>
					<h2> Signed in as {session.user?.name?.split(" ")[0]}</h2>
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
