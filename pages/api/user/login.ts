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
			const { email, password } = req.body;

			const errors = [];

			if (email.includes('@') === false || email.includes('.') === false) {
				errors.push({
					field: 'email',
					message: 'Email must exist and contain @ and .',
				});
			}

			if (!password) {
				errors.push({
					field: 'password',
					message: 'Password is required',
				});
			}

			if (errors.length > 0) {
				return res.status(400).json({ errors });
			}

			try {
				await dbConnect();
				const user = await Users.findOne({ email: email });

				if (!user) {
					return res.status(400).json({
						errors: [{ field: 'email', message: 'Email does not exist' }],
					});
				}

				const valid = await bcrypt.compare(password, user.password);

				if (!valid) {
					return res.status(400).json({
						errors: [{ field: 'password', message: 'Invalid password' }],
					});
				}

				return res.status(200).json(user);
			} catch (e) {
				return res.status(500).json({ message: 'Internal error' });
			}
		}
		default: {
			res.status(405).json({ message: 'Method not allowed' });
		}
	}
}
