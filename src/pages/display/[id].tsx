import { Card, Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import RequireAuthLayout from "../../layouts/require-auth.layout";
import { api } from "../../utils/api";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type RouterQuery = {
	id: string;
};

const DedicateDisplay = () => {
	const router = useRouter();
	const { id } = router.query as RouterQuery;
	const [activeIndex, setActiveIndex] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			updateIndex(activeIndex + 1);
		}, 5000);

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	});

	const { data, isLoading } = api.events.getWithMessage.useQuery({ id });

	if (isLoading) {
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<Spinner />
			</div>
		);
	}

	if (!data) return <div>404 Not Found</div>;

	const updateIndex = (newIndex: number) => {
		if (newIndex >= data.messages.length) newIndex = 0;
		setActiveIndex(newIndex);
	};

	return (
		<RequireAuthLayout requireAuth>
			<div className="relative font-mono h-screen w-screen bg-[url('/img/hearts-blur.png')] bg-cover overflow-hidden">
				<div className="absolute w-full h-fit max-w-4xl -translate-y-1/2 -translate-x-1/2 top-1/4 left-1/2">
					<div className="relative h-fit w-full">
						<AnimatePresence>
							{data.messages.map(
								(msg, index) =>
									index === activeIndex && (
										<motion.div
											key={msg.id}
											className="absolute mx-auto w-full"
											initial={{ y: 300, opacity: 1 }}
											animate={{
												y: 0,
												opacity: 1,
												transition: { type: "spring", stiffness: 30 },
											}}
											exit={{
												opacity: 0,
												transition: {
													duration: 1.5,
												},
											}}>
											<Card className="h-full p-16 w-fit mx-auto max-w-4xl">
												<p className="text-2xl">
													<span className="font-semibold mr-1">to:</span>
													{data.dedicatedTo}
												</p>
												<p className="text-3xl">{msg.message}</p>
											</Card>
										</motion.div>
									),
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</RequireAuthLayout>
	);
};

export default DedicateDisplay;
