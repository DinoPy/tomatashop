import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '../../../lib/dbConnect';
import User, { UserInterface } from '../../../models/Users';

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
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
					});
					await newUser.save();
				}
			} catch (error) {
				return false;
			}

			return true;
		},
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return token;
		},

		async session({ session, token }) {
			session.user = token.user;
			return session;
		},
	},
});
