import React from 'react';
import { useRouter } from 'next/router';
import styles from './RegisterPage.module.css';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';
import dbConnect from '../../lib/dbConnect';

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const StyledInput = styled(TextField)({
	// width: '100%',
	// marginBottom: '1rem',
	// size: 'small',
	// input: {
	// 	color: 'white',
	// 	borderBottom: '1px solid gray',
	// 	// ':hover': {
	// 	// 	borderBottom: '1px solid white',
	// 	// },
	// },
	// label: {
	// 	color: 'white',
	// },
});

const RegisterPage = () => {
	//
	const [loading, setLoading] = React.useState(false);
	const [nameError, setNameError] = React.useState('');
	const [emailErr, setEmailErr] = React.useState('');
	const [passwordErr, setPasswordErr] = React.useState('');
	const [confirmPasswordErr, setConfirmPasswordErr] = React.useState('');
	const [imageErr, setImageErr] = React.useState('');

	//

	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// set the errors to '' to cancel any existing when corrected
		setNameError('');
		setEmailErr('');
		setPasswordErr('');
		setConfirmPasswordErr('');
		setImageErr('');

		// we will use the form data to handle the state of the inputs
		// it uses name and value to create the object
		const formData = new FormData(e.target as HTMLFormElement);

		// we will get the individual values from data so we can use them on validation
		const name = formData.get('name');
		const email = formData.get('email');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirmPassword');
		const image = formData.get('imageUpload') as File;

		// the error will be converted to true if one of the following conditionals fail
		let error = false;

		if (name === '') {
			setNameError('Please fill this field');
			error = true;
		}

		if (email === '') {
			setEmailErr('Please fill this field');
			error = true;
		}

		if (password === '') {
			setPasswordErr('Please fill this field');
			error = true;
		}

		if (confirmPassword === '') {
			setConfirmPasswordErr('Please fill this field');
			error = true;
		}

		if (password !== confirmPassword) {
			setConfirmPasswordErr('Passwords do not match');
			error = true;
		}

		if (image?.size === 0) {
			setImageErr('Please select an image');
			error = true;
		}

		if (error) return;

		setLoading(true);

		try {
			const register = await axios.post('api/user/register', {
				name,
				email,
				password,
				confirmPassword,
			});

			const getPresignedUrl = await axios.post('/api/upload', {
				userId: register.data._id,
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

			const userCompletion = await axios.put('/api/user/register', {
				userId: register.data._id,
				imageUrl: getPresignedUrl.data.url.split('?')[0],
			});

			router.push('/api/auth/signin');
		} catch (e: any) {
			e.response?.data?.errors.forEach(
				(error: { field: string; message: string }) => {
					if (error.field === 'name') {
						setNameError(error.message);
					} else if (error.field === 'email') {
						setEmailErr(error.message);
					} else if (error.field === 'password') {
						setPasswordErr(error.message);
					} else if (error.field === 'confirmPassword') {
						setConfirmPasswordErr(error.message);
					}
				}
			);
		}
	};

	return (
		<div className={styles.registerPageContainer}>
			<ThemeProvider theme={theme}>
				<Typography variant='h3' color='white' mb={5}>
					{' '}
					Register{' '}
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit}
					noValidate
					sx={{ width: '100%' }}
				>
					<StyledInput
						id='name'
						label='Name'
						variant='standard'
						name='name'
						error={nameError !== ''}
						helperText={nameError}
						disabled={loading}
						required
						color='success'
						fullWidth
					/>
					<StyledInput
						id='email'
						type='email'
						label='Email'
						variant='standard'
						name='email'
						error={emailErr !== ''}
						helperText={emailErr}
						disabled={loading}
						required
						color='success'
						fullWidth
					/>
					<StyledInput
						id='password'
						type='password'
						label='Password'
						variant='standard'
						name='password'
						error={passwordErr !== ''}
						helperText={passwordErr}
						disabled={loading}
						required
						color='success'
						fullWidth
					/>
					<StyledInput
						id='confirmPassword'
						type='password'
						label='Confirm Password'
						variant='standard'
						name='confirmPassword'
						error={confirmPasswordErr !== ''}
						helperText={confirmPasswordErr}
						disabled={loading}
						required
						color='success'
						fullWidth
					/>
					<StyledInput
						id='imageUpload'
						type='file'
						variant='standard'
						name='imageUpload'
						error={imageErr !== ''}
						helperText={imageErr}
						disabled={loading}
						required
						inputProps={{ accept: 'image/*' }}
						color='success'
						fullWidth
					/>
					<LoadingButton
						variant='outlined'
						color='success'
						type='submit'
						disabled={loading}
						loading={loading}
						fullWidth
					>
						Register
					</LoadingButton>
				</Box>
			</ThemeProvider>
		</div>
	);
};

export default RegisterPage;
