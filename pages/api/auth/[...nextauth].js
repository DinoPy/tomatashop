import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../../../lib/dbConnect';
import User, { UserInterface } from '../../../models/Users';
import bcrypt from 'bcrypt';
import Users from '../../../models/Users';

export default NextAuth({
	providers: [
		// GithubProvider({
		// 	clientId: process.env.GITHUB_ID,
		// 	clientSecret: process.env.GITHUB_SECRET,
		// }),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'email@email.com' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				try {
					await dbConnect();
					const user = await Users.findOne({ email: credentials.email });

					if (!user) {
						return null;
					}

					const valid = await bcrypt.compare(
						credentials.password,
						user.password
					);

					if (!valid) {
						return null;
					}

					return user;
				} catch (e) {
					return null;
				}
			},
		}),
	],
	callbacks: {
		// pay attention to the destructuring as every property received is part of an object
		// if not destructured we need to access the property of the object.
		async signIn({ user }) {
			// get the user email, oauthid, and oauthprovider.
			try {
				await dbConnect();
				const foundUser = await User.findOne({ email: user.email });
				if (!foundUser) {
					// if the user is not found, create a new user.
					const newUser = new User({
						googleOauthId: user.id,
						email: user.email,
						name: user.name,
						images: [user.image],
						orders: [],
						cart: [],
						favorites: [],
					});
					await newUser.save();
				}
			} catch (error) {
				return false;
			}

			return true;
		},
		async jwt({ token, user }) {
			try {
				await dbConnect();
				const foundUser = await User.findOne({
					email: token.email,
				});
				if (foundUser) {
					token.user = foundUser;
				} else {
					token.user = user;
				}
			} catch (error) {}

			return token;
		},

		async session({ session, token }) {
			session.user = token.user;
			return session;
		},
	},
});
