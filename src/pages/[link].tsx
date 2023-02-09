import { Button, Card, Label, Spinner, Textarea } from "flowbite-react";
import { useRouter } from "next/router";
import RequireAuthLayout from "../layouts/require-auth.layout";
import { api } from "../utils/api";
import { useState } from "react";

type RouterQuery = {
	link: string;
};

const DedicateByLinkPage = () => {
	const router = useRouter();
	const { link: link } = router.query as RouterQuery;
	const [message, setMessage] = useState<string>("");

	const { data, isLoading } = api.events.getByLink.useQuery({ link });

	const dedicateMessage = api.events.dedicate.useMutation({
		onSuccess: () => router.push(`/thank-you?url=${router.asPath}`),
	});

	if (isLoading)
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<Spinner />
			</div>
		);

	if (!data) return <div>404 Not Found</div>;

	return (
		<RequireAuthLayout>
			<div className="font-mono px-5 gap-4 flex flex-col h-full tracking-tight max-w-5xl mx-auto">
				<p className="text-5xl text-center mb-10 mt-20">{data.name}</p>
				<Card>
					<form id="dedicate-message" className="overflow-visible space-y-6">
						<div>
							<div className="mb-2 block">
								<Label htmlFor="message" value={`to: ${data.dedicatedTo}`} />
							</div>
							<Textarea
								id="message"
								rows={4}
								placeholder="Write your thoughts here..."
								onChange={(e) => setMessage(e.target.value)}
							/>
						</div>
					</form>
					<div className="w-full flex justify-end">
						<Button
							onClick={() => dedicateMessage.mutate({ message, eventId: data.id })}
							className="w-fit px-2"
							disabled={message.length < 3}
							size="sm">
							Send
						</Button>
					</div>
				</Card>
			</div>
		</RequireAuthLayout>
	);
};

export default DedicateByLinkPage;
