import React from 'react';

const FileUploadTest: React.FC = () => {
	const [file, setFile] = React.useState<{ file: null | File }>({ file: null });
	const [imageUploadUrl, setImageUploadUrl] = React.useState('');

	const onFileChange = (event: any) => {
		// something with file??
		// possibly need to select the first file?
		setFile({ file: event.target.files[0] });
	};

	React.useEffect(() => {
		if (imageUploadUrl.length > 0) {
			fetch(imageUploadUrl, {
				method: 'PUT',
				headers: {
					'Content-Type': file.file!.type,
				},
				body: file.file,
			})
				.then((response) => {
					console.log(response);
					setImageUploadUrl('');
				})
				.catch((e) => {});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageUploadUrl]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		// make a call to the api including the file.

		const formData = new FormData();
		formData.append('file', file.file!);

		const response = await fetch('/api/upload', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});
		const data = await response.json();
		setImageUploadUrl(data.url);
	};

	return (
		<div>
			{/* Doubleqouotes might me needed?? */}
			<form
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<input
					type='file'
					accept='image/*'
					name='image'
					id='image'
					onChange={(e) => onFileChange(e)}
				/>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default FileUploadTest;
