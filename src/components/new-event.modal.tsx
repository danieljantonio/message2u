import { Button, Label, Modal, TextInput } from "flowbite-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "../types/common";
import { api } from "../utils/api";

type Props = {
	show: boolean;
	setShow: (e: boolean) => void;
};

const NewEventModal: FC<Props> = ({ show, setShow }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();

	const createEvent = api.events.create.useMutation({
		onSuccess: (data) => {
			console.log(data);
		},
	});

	const onSubmit = (values: FormValues) => {
		createEvent.mutate(values);
	};

	return (
		<Modal dismissible={true} show={show} onClose={() => setShow(false)}>
			<Modal.Header>Create New Event</Modal.Header>
			<Modal.Body>
				<div className="space-y-6">
					{/* @ts-ignore */}
					<form id="create-event-form" onSubmit={handleSubmit(onSubmit)}>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="event-name" value="Event Name" />
							</div>
							<TextInput
								id="event-name"
								type="text"
								placeholder="Jane's Birthday"
								required={true}
								{...register("name", { required: true })}
							/>
							{errors.name && (
								<span className="text-red-600 text-sm">This field is required</span>
							)}
						</div>
						<div>
							<div className="mb-2 mt-4 block">
								<Label htmlFor="event-dedication" value="Dedicated To:" />
							</div>
							<TextInput
								id="event-dedication"
								type="text"
								placeholder="Jane Foster"
								required={true}
								{...register("dedicatedTo", { required: true })}
							/>
							{errors.dedicatedTo && (
								<span className="text-red-600 text-sm">This field is required</span>
							)}
						</div>
						<div>
							<div className="mb-2 mt-4 block">
								<Label htmlFor="event-description" value="Description" />
							</div>
							<TextInput
								id="event-description"
								type="text"
								placeholder="Messages for Jane's birthday party!"
								{...register("description")}
							/>
						</div>
						<div>
							<div className="mb-2 mt-4 block">
								<Label htmlFor="event-description" value="Unique Link" />
							</div>
							<TextInput
								id="event-description"
								type="text"
								placeholder="janefoster2023"
								addon="message2u.com/"
								{...register("link", { required: true })}
							/>
							{errors.link && (
								<span className="text-red-600 text-sm">This field is required</span>
							)}
						</div>
					</form>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button type="submit" form="create-event-form">
					Create
				</Button>
				<Button color="gray" onClick={() => setShow(false)}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default NewEventModal;
