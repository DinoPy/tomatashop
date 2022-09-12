import type { NextPage } from 'next';
import Head from 'next/head';
import WelcomePage from '../components/wecomePage/WelcomePage';
import React from 'react';
import Layout from '../components/layout';

const Home: NextPage = () => {
	// const [scrollYOffset, setScrollYOffset] = React.useState(0);
	// const [scrollDirection, setScrollDirection] = React.useState('down');

	// // initiate throttle callback for scroll event
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// const trottleScroll = React.useCallback(
	// 	throttle((val: any) => setScrollYOffset(val), 200),
	// 	[]
	// );

	// // on scroll use the throttle scroll to ste the y offset
	// React.useEffect(() => {
	// 	window.addEventListener('scroll', () => {
	// 		if (window.scrollY > scrollYOffset) {
	// 			setScrollDirection('down');
	// 		} else {
	// 			setScrollDirection('up');
	// 		}
	// 		trottleScroll(window.pageYOffset);
	// 	});
	// 	console.log(scrollDirection);

	// 	return () => {
	// 		window.removeEventListener('scroll', () => {
	// 			trottleScroll(window.pageYOffset);
	// 		});
	// 	};
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [scrollYOffset]);
	return (
		<>
			<Head>
				<title>Yok Tomatia</title>
				<meta name='description' content='Yok Tomata Shop' />
				<link rel='shortcut icon' href='/android-chrome-512x512.png' />
			</Head>
			{/* <div
				style={
					scrollDirection === 'down' && scrollYOffset > 0
						? {
								position: 'static',
								transition: 'all 0.5s ease-in-out',
						  }
						: {
								position: 'sticky',
								top: 0,
								zIndex: 100,

								transition: 'all 0.5s ease-in-out',
						  }
				}
			> */}
			<Layout>
				{/* </div> */}
				<WelcomePage />
			</Layout>
		</>
	);
};

export default Home;
