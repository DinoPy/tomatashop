import { Session } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			googleOauthId: string;
			name: string;
			email: string;
			images: string[];
			orders: string[];
			favorites: string[];
			cart: string[];
			_id: string;
			access: 'ADMIN' | 'REGULAR';
		};
	}
}
