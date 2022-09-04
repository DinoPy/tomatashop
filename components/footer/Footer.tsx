import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<h3> Contact me </h3>
			<a> Deviant </a>
			<a> Discord </a>
			<a> Patreon </a>
		</footer>
	);
};

export default Footer;
