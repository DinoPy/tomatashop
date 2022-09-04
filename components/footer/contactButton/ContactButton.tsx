import { NextPage } from 'next';
import React from 'react';
import styles from './ContactButton.module.css';
import Link from 'next/link';

interface contactButtonProps {
	href: string;
	IconComponent: React.FC;
}

const ContactButton: NextPage<contactButtonProps> = ({
	href,
	IconComponent,
}) => {
	return (
		<div className={styles.contactButtonContainer}>
			<Link href={href}>
				<a target='_blank'>
					<IconComponent />
				</a>
			</Link>
		</div>
	);
};

export default ContactButton;
