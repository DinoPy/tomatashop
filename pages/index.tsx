import type { NextPage } from 'next';
import Head from 'next/head';
import WelcomePage from '../components/wecomePage/WelcomePage';
import React from 'react';
import Layout from '../components/layout';
import dbConnect from '../lib/dbConnect';
import Reviews, { ReviewInterface } from '../models/Reviews';
import Users from '../models/Users';

const Home: NextPage<{ reviews: ReviewInterface[] }> = ({ reviews }) => {
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
				<WelcomePage reviews={reviews} />
			</Layout>
		</>
	);
};

export default Home;

export async function getServerSideProps() {
	const placeholder = [
		{
			title: 'I love your designs',
			comment: 'The art is do unique and the quality is amazing',
			userId: {
				images: [
					'https://tomatastore.s3.eu-central-1.amazonaws.com/idtest/8aba091f-a210-4669-bc6c-c013185c10a6.png',
				],
			},
		},
	];
	try {
		await dbConnect();
		await Users.estimatedDocumentCount();
		const reviews = await Reviews.find({ rating: 5 })
			.limit(5)
			.populate('userId', 'images');

		if (reviews.length > 0) {
			return {
				props: {
					reviews: JSON.parse(JSON.stringify(reviews)),
				},
			};
		} else {
			return {
				props: {
					reviews: placeholder,
				},
			};
		}
	} catch (e) {
		return {
			props: {
				reviews: placeholder,
			},
		};
	}
}
