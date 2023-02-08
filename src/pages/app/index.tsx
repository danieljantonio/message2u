import { signOut, useSession } from "next-auth/react";
import RequireAuthLayout from "../../layouts/require-auth.layout";
import { Button, Table } from "flowbite-react";
import { useRouter } from "next/router";

const App = () => {
	const { data: session } = useSession();

	return (
		<RequireAuthLayout requireAuth>
			<div className="max-w-screen-2xl mx-auto mt-5">
				<div className="text-5xl w-full border-b-2 p-5 mb-5">
					<p className="font-mono">
						Welcome, <i>{session?.user.name}</i>
					</p>
				</div>
				<Table>
					<Table.Head>
						<Table.HeadCell>Name</Table.HeadCell>
						<Table.HeadCell>Description</Table.HeadCell>
						<Table.HeadCell>No. of Messages</Table.HeadCell>
						<Table.HeadCell>
							<span className="sr-only">Link | QR Code</span>
						</Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y">
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"></Table.Row>
						<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
							Worship Night
						</Table.Cell>
						<Table.Cell>No Description</Table.Cell>
						<Table.Cell>500</Table.Cell>
						<Table.Cell>
							<a
								href="#"
								className="font-medium text-blue-600 hover:underline dark:text-blue-500">
								Link
							</a>
							{"  |  "}
							<a
								href="#"
								className="font-medium text-blue-600 hover:underline dark:text-blue-500">
								QR Code
							</a>
						</Table.Cell>
					</Table.Body>
				</Table>

				{/* <Button onClick={() => signOut()}>Sign Out</Button> */}
			</div>
		</RequireAuthLayout>
	);
};

export default App;
