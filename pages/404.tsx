import React from 'react';
import Layout from '../components/layout';

const NotFoundPage = () => {
	return (
		<Layout>
			<div
				style={{
					height: '60vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<h1>404 - Page Not Found</h1>
			</div>
		</Layout>
	);
};

export default NotFoundPage;
