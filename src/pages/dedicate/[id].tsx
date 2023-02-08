import { Button, Card } from "flowbite-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import RequireAuthLayout from "../../layouts/require-auth.layout";

type MessageForm = {
	message: string;
};

const DedicatePage = () => {
	const router = useRouter();
	const { id } = router.query;
	const data = {
		id,
		name: "Worship Night 2023",
		dedicatedTo: "Jesus",
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<MessageForm>();

	const onSubmit = (formData: MessageForm) => {
		console.log(formData);
	};

	return (
		<RequireAuthLayout>
			<div className="font-mono px-5 gap-4 flex flex-col h-full tracking-tight max-w-5xl mx-auto">
				<p className="text-5xl text-center mb-10 mt-20">{data.name}</p>
				<Card className="overflow-visible">
					<form id="dedicate-message" onSubmit={void handleSubmit(onSubmit)}></form>
					<label
						htmlFor="message"
						className="block text-md font-medium text-gray-900 dark:text-white">
						to: {data.dedicatedTo}
					</label>
					<textarea
						id="message"
						rows={4}
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						{...register("message", { required: true })}
						placeholder="Write your thoughts here..."
					/>
					{errors.message && (
						<span className="text-red-600 text-sm">This field is required</span>
					)}
					<div className="w-full flex justify-end">
						<Button
							type="submit"
							form="dedicate-message"
							className="w-fit px-2"
							size="sm">
							Send
						</Button>
					</div>
				</Card>
			</div>
		</RequireAuthLayout>
	);
};

export default DedicatePage;
