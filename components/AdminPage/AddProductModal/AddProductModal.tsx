import React from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import {
	ThemeProvider,
	createTheme,
	Typography,
	Box,
	TextField,
	Autocomplete,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

//

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const categoryOptions = [
	'painting',
	'sketch',
	'illustration',
	'calendar',
	'cover',
	'clothing',
];

//

const AddProductModal = ({
	fetchProducts,
	setIsAddProductModalOpen,
}: {
	fetchProducts: () => {};
	setIsAddProductModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { data: session, status } = useSession();
	//
	const [addProductLoading, setAddProductLoading] = React.useState(false);
	const [categoryValue, setCategoryValue] = React.useState<string | null>(
		categoryOptions[0]
	);
	const [categoryInputValue, setCategoryInputValue] = React.useState('');

	const [titleErr, setTitleErr] = React.useState('');
	const [descriptionErr, setDescriptionErr] = React.useState('');
	const [imageErr, setImageErr] = React.useState('');
	const [categoryErr, setCategoryErr] = React.useState('');
	const [priceErr, setPriceErr] = React.useState('');

	//

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setTitleErr('');
		setDescriptionErr('');
		setImageErr('');
		setCategoryErr('');
		setPriceErr('');
		e.preventDefault();

		// set the errors to '' to cancel any existing when corrected

		// we will use the form data to handle the state of the inputs
		// it uses name and value to create the object
		const formData = new FormData(e.target as HTMLFormElement);
		formData.append('category', categoryValue as string);

		// we will get the individual values from data so we can use them on validation
		const title = formData.get('title');
		const description = formData.get('description');
		const category = formData.get('category');
		const price = formData.get('price');
		const image = formData.get('imageUpload') as File;

		// the error will be converted to true if one of the following conditionals fail
		let error = false;

		if (title === '') {
			setTitleErr('Title is required');
			error = true;
		}
		if (description === '') {
			setDescriptionErr('Description is required');
			error = true;
		}
		if (category === '') {
			setCategoryErr('Category is required');
			error = true;
		}
		if (price === '') {
			setPriceErr('Price is required');
			error = true;
		}

		if (image?.size === 0) {
			setImageErr('Please select an image');
			error = true;
		}

		if (error) return;

		setAddProductLoading(true);

		try {
			const getPresignedUrl = await axios.post('/api/upload', {
				userId: 'products',
				imageType: image.type,
			});

			// axios seems to not receive the url of the image
			const imageUpload = await fetch(getPresignedUrl.data.url, {
				method: 'PUT',
				headers: {
					'Content-Type': image.type,
				},
				body: image,
			});

			if (imageUpload.status !== 200) {
				throw new Error('Image upload failed');
			}

			const createProduct = await axios.post('/api/admin', {
				title: title as string,
				description: description as string,
				category: category as string,
				price: price as string,
				image: imageUpload.url.split('?')[0],
				userId: session?.user._id,
			});

			fetchProducts();
			setAddProductLoading(false);
			setIsAddProductModalOpen(false);
		} catch (e: any) {
			console.log(e);
			setAddProductLoading(false);
			e.response?.data?.errors.forEach(
				(error: { field: string; message: string }) => {
					if (error.field === 'title') {
						setTitleErr(error.message);
					} else if (error.field === 'description') {
						setDescriptionErr(error.message);
					} else if (error.field === 'category') {
						setCategoryErr(error.message);
					} else if (error.field === 'price') {
						setPriceErr(error.message);
					} else if (error.field === 'image') {
						setImageErr(error.message);
					}
				}
			);
		}
	};

	//
	return (
		<>
			<ThemeProvider theme={theme}>
				<Typography variant='h3' color='white' mb={5}>
					{' '}
					New product{' '}
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit}
					noValidate
					// sx={{ maxWidth: '600px', margin: '2em' }}
				>
					<TextField
						id='title'
						label='Title'
						variant='standard'
						name='title'
						error={titleErr !== ''}
						helperText={titleErr}
						disabled={addProductLoading}
						required
						color='success'
						fullWidth
					/>
					<TextField
						id='description'
						label='Description'
						variant='standard'
						name='description'
						error={descriptionErr !== ''}
						helperText={descriptionErr}
						disabled={addProductLoading}
						required
						color='success'
						fullWidth
						multiline
						rows={4}
					/>
					<TextField
						id='price'
						type='number'
						label='Price'
						variant='standard'
						name='price'
						error={priceErr !== ''}
						helperText={priceErr}
						disabled={addProductLoading}
						required
						color='success'
						fullWidth
					/>
					<Autocomplete
						value={categoryValue}
						onChange={(event: any, newValue: string | null) => {
							setCategoryValue(newValue);
						}}
						inputValue={categoryInputValue}
						onInputChange={(event, newInputValue) => {
							setCategoryInputValue(newInputValue);
						}}
						id='controllable-states-demo'
						options={categoryOptions}
						sx={{ width: 300, mt: 2 }}
						renderInput={(params) => (
							<TextField {...params} label='Category' variant='standard' />
						)}
						clearOnEscape
					/>
					<TextField
						id='imageUpload'
						type='file'
						variant='standard'
						name='imageUpload'
						error={imageErr !== ''}
						helperText={imageErr}
						disabled={addProductLoading}
						required
						inputProps={{ accept: 'image/*' }}
						color='success'
						fullWidth
						sx={{ mt: 2 }}
					/>
					<LoadingButton
						variant='outlined'
						color='success'
						type='submit'
						disabled={addProductLoading}
						loading={addProductLoading}
						fullWidth
						sx={{ mt: 5 }}
					>
						Add
					</LoadingButton>
				</Box>
			</ThemeProvider>
		</>
	);
};

export default AddProductModal;
