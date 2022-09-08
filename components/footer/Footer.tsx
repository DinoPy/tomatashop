import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';
import ContactButton from './contactButton/ContactButton';
import Deviant from '../logoIcons/Deviant/Deviant';
import Instagram from '../logoIcons/Instagram/Instagram';
import Patreon from '../logoIcons/Patreon/Patreon';

const Footer: NextPage = () => {
	let year = new Date().getFullYear();
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__logo}>
				<Image
					src='/images/footer_logo.png'
					alt='yok tomatia logo'
					width='100%'
					height='100%'
					layout='fill'
				/>
			</div>

			<div className={styles.footer__contact}>
				<ContactButton
					href='https://www.instagram.com/yok.tomato/'
					IconComponent={Instagram}
				/>
				<ContactButton
					href='https://www.deviantart.com/yoktomato'
					IconComponent={Deviant}
				/>
				<ContactButton href='' IconComponent={Patreon} />
			</div>
			<div className={styles.footer__links}>
				<Link href='/'> Info </Link>
				<span className={styles.middot}>&middot;</span>
				<Link href='/'> Contact Me </Link>
				<span className={styles.middot}>&middot;</span>
				<Link href='/'> Newletter </Link>
				<br />
			</div>

			<p> &#169; {year} Copyright DinoDev </p>
		</footer>
	);
};

export default Footer;
