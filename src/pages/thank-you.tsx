import { Card } from "flowbite-react";
import RequireAuthLayout from "../layouts/require-auth.layout";
import { useRouter } from "next/router";

type RouterQuery = {
	url: string;
};

const ThankYouPage = () => {
	const router = useRouter();
	const { url } = router.query as RouterQuery;

	return (
		<RequireAuthLayout>
			<div className="h-screen w-screen pt-20 px-5">
				<p className="text-5xl w-full font-mono mx-auto font-semibold">Thank you,</p>
				<p className="text-5xl w-full font-mono mx-auto pl-5">
					your message has been delivered.
				</p>
				<Card
					onClick={() => router.push(url || "/")}
					className="hover:bg-gray-200 hover:cursor-pointer my-20 mx-5">
					<p className="text-center">Send another message</p>
				</Card>
			</div>
		</RequireAuthLayout>
	);
};

export default ThankYouPage;
