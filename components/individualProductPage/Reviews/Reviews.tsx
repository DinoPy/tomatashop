import React, { Dispatch, SetStateAction } from 'react';
import {
	Modal,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Button,
	Box,
	TextField,
	createTheme,
	ThemeProvider,
	Rating,
	Typography,
	Tooltip,
} from '@mui/material';
import axios from 'axios';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReviewInterface } from '../../../models/Reviews';
import { Product } from '../../../types/interface/productPropsInterface';
import AddIcon from '@mui/icons-material/Add';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

//

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const modalStyle = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: '50%',
	minHeight: '50%',
	bgcolor: '#353535',
	borderRadius: '10px',
	boxShadow: 24,
	p: 4,

	[theme.breakpoints.down('sm')]: {
		minWidth: '90%',
	},
};

const Reviews = ({
	productId,
	reviewsList,
	setProductData,
}: {
	productId: string;
	reviewsList: ReviewInterface[];
	setProductData: React.Dispatch<React.SetStateAction<Product>>;
}) => {
	//
	const { data: session }: { data: any } = useSession();

	//
	const [addReviewOpen, setAddReviewOpen] = React.useState(false);
	const [rating, setRating] = React.useState(2.5);
	const [isRated, setIsRated] = React.useState<boolean>(false);

	const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		formData.append('rating', rating.toString());

		const title = formData.get('title');
		const comment = formData.get('review');
		const ratingValue = formData.get('rating');

		const response = await axios.post('/api/reviews/add', {
			title,
			comment,
			rating: ratingValue,
			userId: session?.user._id,
			productId,
		});

		setProductData((prev) => ({
			...prev,
			rating: [...prev.rating, Number(ratingValue)],
			reviews: [response.data, ...prev.reviews],
		}));

		console.log(ratingValue?.toString());
		setIsRated(true);

		setAddReviewOpen(false);
	};

	return (
		<>
			<Accordion
				sx={{
					marginTop: '3em',
					backgroundColor: 'rgba(255,255,255,0.1)',
					color: 'white',
					position: 'relative',
				}}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					Reviews
				</AccordionSummary>
				<AccordionDetails>
					<ThemeProvider theme={theme}>
						<Tooltip
							title={
								!session
									? 'You need to be signed in to leave a review'
									: isRated || session?.user.rated.includes(productId)
									? 'You have already rated this product'
									: 'Leave a review'
							}
						>
							<span style={{ position: 'absolute', right: '2em', top: '2em' }}>
								<Button
									sx={{
										pointerEvents: !session ? 'none' : '',
										// the review button is going outside the review section whem mounted
									}}
									variant='text'
									color='success'
									startIcon={<AddIcon />}
									onClick={() => setAddReviewOpen(true)}
									disabled={
										!session ||
										isRated ||
										session?.user.rated.includes(productId)
									}
								>
									Review
								</Button>
							</span>
						</Tooltip>
						<Modal
							open={addReviewOpen}
							onClose={(e) => setAddReviewOpen(false)}
						>
							<Box sx={modalStyle}>
								<form onSubmit={(e) => handleReviewSubmit(e)}>
									Add Review
									<TextField
										required
										id='outlined-required'
										label='Title'
										placeholder='Title'
										fullWidth
										name='title'
										sx={{ marginTop: '1em' }}
									/>
									<TextField
										required
										id='outlined-required'
										label='Review'
										placeholder='Review'
										fullWidth
										name='review'
										sx={{ marginTop: '1em', marginBottom: '1em' }}
										multiline={true}
										rows={4}
									/>
									<Typography
										variant='body1'
										color='initial'
										sx={{ color: 'white' }}
									>
										{' '}
										Rating{' '}
									</Typography>
									<Rating
										name='simple-controlled'
										lang='Rating'
										value={rating}
										precision={0.5}
										onChange={(event, newValue) => {
											setRating(Number(newValue));
										}}
									/>
									<br />
									<Button
										type='submit'
										variant='outlined'
										color='success'
										sx={{ marginTop: '1em' }}
									>
										{' '}
										Submit review
									</Button>
								</form>
							</Box>
						</Modal>
						{reviewsList?.length > 0 ? (
							reviewsList?.reverse().map((rev) => {
								return (
									<Box
										key={rev._id.toString()}
										sx={{ mb: 3, borderBottom: '1px solid gray' }}
									>
										<h3> {rev.title}</h3>
										<p> {rev.comment} </p>
									</Box>
								);
							})
						) : (
							<div>No reviews yet</div>
						)}
					</ThemeProvider>
				</AccordionDetails>
			</Accordion>
		</>
	);
};

export default Reviews;

// uite
