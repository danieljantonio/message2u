import { signOut, useSession } from "next-auth/react";
import RequireAuthLayout from "../../layouts/require-auth.layout";
import { Button } from "flowbite-react";
import { useRouter } from "next/router";

const App = () => {
	const { data: session } = useSession();

	return (
		<RequireAuthLayout requireAuth>
			<div>Welcome, {session?.user.name}</div>
			<Button onClick={() => signOut()}>Sign Out</Button>
		</RequireAuthLayout>
	);
};

export default App;
