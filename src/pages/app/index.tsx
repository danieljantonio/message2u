import { useSession } from "next-auth/react";
import RequireAuthLayout from "../../layouts/require-auth.layout";
import { Alert, Button, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import NewEventModal from "../../components/new-event.modal";
import { api } from "../../utils/api";
import { motion, useAnimationControls } from "framer-motion";

const App = () => {
	const { data: session } = useSession();
	const [modalShow, setModalShow] = useState<boolean>(false);
	const [show, setShow] = useState<boolean>(false);

	const controls = useAnimationControls();

	useEffect(() => {
		if (show) {
			controls.start({ opacity: 1, y: 50 });
			setTimeout(() => {
				controls.set({ opacity: 0, y: -50, transition: { duration: 2 } });
				setShow(false);
			}, 2500);
		}
	}, [show]);

	const { data, isLoading } = api.events.getAll.useQuery();

	return (
		<RequireAuthLayout requireAuth>
			<div className="max-w-screen-xl mx-auto p-5 h-full relative">
				<div className="text-5xl w-full border-b-2 p-5 mb-8">
					<p className="font-mono">
						Welcome, <i>{session?.user.name}</i>
					</p>
				</div>
				<div className="px-5 relative">
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
						<div>
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
												<Table.Cell className="flex gap-1">
													<p
														onClick={() => {
															navigator.clipboard.writeText(
																`${window.location.host}/${evnt.link}`,
															);

															setShow(true);
															console.log(show);
														}}
														className="font-medium hover:cursor-pointer text-blue-600 hover:underline dark:text-blue-500">
														Share
													</p>
													|
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
						</div>
					)}
				</div>
				<motion.div
					animate={controls}
					initial={{ opacity: 1 }}
					className="absolute top-0 right-1/2">
					<Alert color="info" className="mb-5 translate-x-1/2 ">
						<span>
							<span className="font-medium">Info alert!</span> Change a few things up
							and try submitting again.
						</span>
					</Alert>
				</motion.div>
				<NewEventModal show={modalShow} setShow={setModalShow} />

				{/* <Button onClick={() => signOut()}>Sign Out</Button> */}
			</div>
		</RequireAuthLayout>
	);
};

export default App;
