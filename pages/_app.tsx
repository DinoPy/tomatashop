import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from "next-auth";

export default function App({ Component, pageProps<{session:Session}> }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
}
