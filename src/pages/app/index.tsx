import { signOut, useSession } from "next-auth/react";
import RequireAuthLayout from "../../layouts/require-auth.layout";
import { Button, Spinner, Table } from "flowbite-react";
import { useState } from "react";
import NewEventModal from "../../components/new-event.modal";
import { FormValues } from "../../types/common";
import { api } from "../../utils/api";

const App = () => {
	const { data: session } = useSession();
	const [modalShow, setModalShow] = useState<boolean>(false);

	const { data, isLoading } = api.events.getAll.useQuery();

	return (
		<RequireAuthLayout requireAuth>
			<div className="max-w-screen-xl mx-auto mt-5 p-5">
				<div className="text-5xl w-full border-b-2 p-5 mb-8">
					<p className="font-mono">
						Welcome, <i>{session?.user.name}</i>
					</p>
				</div>
				<div className="px-5">
					<div className="relative mb-8">
						<p>Manage events</p>
						<Button
							size="sm"
							className="absolute right-0 top-2/4 -translate-y-1/2"
							onClick={() => setModalShow(true)}>
							New Event
						</Button>
					</div>
					{isLoading ? (
						<div className="p-10">
							<Spinner className="!block mx-auto" />
						</div>
					) : (
						<Table hoverable={true}>
							<Table.Head>
								<Table.HeadCell>Name</Table.HeadCell>
								<Table.HeadCell>Description</Table.HeadCell>
								<Table.HeadCell>No. of Messages</Table.HeadCell>
								<Table.HeadCell>Links</Table.HeadCell>
							</Table.Head>
							<Table.Body className="divide-y">
								{!data ? (
									<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
										<Table.Cell>No Data</Table.Cell>
										<Table.Cell>No Data</Table.Cell>
										<Table.Cell>No Data</Table.Cell>
										<Table.Cell>No Data</Table.Cell>
									</Table.Row>
								) : (
									data.map((evnt) => (
										<Table.Row
											key={evnt.id}
											className="bg-white dark:border-gray-700 dark:bg-gray-800">
											<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
												{evnt.name}
											</Table.Cell>
											<Table.Cell>{evnt.description}</Table.Cell>
											<Table.Cell>{evnt.messages.length}</Table.Cell>
											<Table.Cell>
												<a
													href="#"
													className="font-medium text-blue-600 hover:underline dark:text-blue-500">
													Share
												</a>
												{"  |  "}
												<a
													href="#"
													className="font-medium text-blue-600 hover:underline dark:text-blue-500">
													Display
												</a>
											</Table.Cell>
										</Table.Row>
									))
								)}
							</Table.Body>
						</Table>
					)}
				</div>
				<NewEventModal show={modalShow} setShow={setModalShow} />

				{/* <Button onClick={() => signOut()}>Sign Out</Button> */}
			</div>
		</RequireAuthLayout>
	);
};

export default App;
