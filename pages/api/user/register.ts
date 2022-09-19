import { NextApiRequest, NextApiResponse } from 'next';
import Users from '../../../models/Users';
import bcrypt from 'bcrypt';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case 'POST': {
			const { name, email, password, confirmPassword } = req.body;
			// console.log(req.body);

			const errors = [];

			if (name.length < 8) {
				errors.push({
					field: 'name',
					message: 'Name must be at least 8 characters long',
				});
			}
			if (email.includes('@') === false || email.includes('.') === false) {
				errors.push({
					field: 'email',
					message: 'Email must contain @ and .',
				});
			}

			const pwTestRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})/;
			if (pwTestRegex.test(password) === false) {
				errors.push({
					field: 'password',
					message:
						'Password must be at least 12 characters long and contain 1 uppercase, 1 digit, and 1 special character',
				});
			}
			if (password !== confirmPassword) {
				errors.push({
					field: 'confirmPassword',
					message: 'Passwords do not match',
				});
			}

			let user;

			try {
				await dbConnect();
				user = await Users.findOne({ email: email });
			} catch (e) {
				return res.status(500).json({ message: 'Internal error' });
			}
			if (user) {
				errors.push({
					field: 'email',
					message:
						'Email already exists (user may be created via 3rd pary authentication)',
				});
			}

			if (errors.length > 0) {
				return res.status(400).json({ errors });
			}

			const hashedPassword = await bcrypt.hashSync(password, 12);

			try {
				const newUser = await Users.create({
					name,
					email,
					password: hashedPassword,
				});

				return res.status(201).json(newUser);
			} catch (e) {
				return res.status(500).json({ message: 'Internal error' });
			}

			break;
		}

		case 'PUT': {
			const { imageUrl, userId } = req.body;

			try {
				await dbConnect();
				const user = await Users.findOne({ _id: userId });
				user.images.push(imageUrl);
				const newUser = await user.save();

				return res.status(200).json(newUser);
			} catch (e) {
				return res.status(500).json({ message: 'Internal error' });
			}
		}

		default: {
			return res.status(405).json({ message: 'Method not allowed' });
		}
	}
}
