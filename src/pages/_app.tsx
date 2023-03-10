import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<Head>
				<title>Message2U</title>
				<meta name="description" content="Dedicating messages for you to you." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
			<Analytics />
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
