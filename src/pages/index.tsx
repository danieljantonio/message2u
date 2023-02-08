import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import RequireAuthLayout from "../layouts/require-auth.layout";
import { Button } from "flowbite-react";

const Home: NextPage = () => {
	return (
		<RequireAuthLayout redirectOnAuth="/app">
			<div className="ml-56 flex h-screen w-screen flex-col items-start justify-center gap-6">
				<p className="text-5xl">Welcome to Message2U</p>
				<Button onClick={() => signIn("google")}>Sign in with Google</Button>
			</div>
		</RequireAuthLayout>
	);
};

export default Home;
