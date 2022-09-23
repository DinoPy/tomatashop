import React from 'react';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from './UserAuthStatus.module.css';
import { Button, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const UserAuthStatus = () => {
	// we have signOutIcon that might be of use.
	const { data: session, status } = useSession();
	const userUrl = session?.user.images[0] || '/images/user-repl.png';
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

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
					<Button
						id='basic-button'
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
					>
						<MenuIcon sx={{ color: 'white' }} />
					</Button>
					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
						PaperProps={{
							sx: {
								backgroundColor: '#252525',
								color: 'white',
							},
						}}
					>
						<Link href='/orders'>
							<MenuItem onClick={handleClose} sx={{ fontWeight: 'bold' }}>
								<a>Orders</a>
							</MenuItem>
						</Link>

						<a href='#' onClick={() => signOut()}>
							<MenuItem onClick={handleClose} sx={{ fontWeight: 'bold' }}>
								Sign out <LogoutIcon fontSize='small' />
							</MenuItem>
						</a>
					</Menu>
				</>
			) : (
				<>
					<Button
						id='basic-button'
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
					>
						<MenuIcon sx={{ color: 'white' }} />
					</Button>
					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
						PaperProps={{
							sx: {
								backgroundColor: '#252525',
								color: 'white',
							},
						}}
					>
						<a href='#' onClick={() => signIn()}>
							<MenuItem onClick={handleClose} sx={{ fontWeight: 'bold' }}>
								{' '}
								Sign in
							</MenuItem>
						</a>

						<Link href='/register'>
							<MenuItem onClick={handleClose} sx={{ fontWeight: 'bold' }}>
								<a>Sign up</a>
							</MenuItem>
						</Link>
					</Menu>
				</>
				// <Link href='/api/auth/signin'> Sign In </Link>
			)}
		</div>
	);
};

export default UserAuthStatus;
