import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

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
		async signIn({ user, res, redirect }) {
			console.log(user, res, redirect);
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
