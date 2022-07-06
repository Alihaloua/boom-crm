import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ReactComponent as OverviewIcon } from "../icons/overview.svg";
import { ReactComponent as ShoppingBagIcon } from "../icons/shopping-bag.svg";
import { ReactComponent as GraphIcon } from "../icons/graph.svg";
import { ReactComponent as CalendarIcon } from "../icons/calendar.svg";
import { ReactComponent as WalletIcon } from "../icons/wallet.svg";
import { ReactComponent as FileIcon } from "../icons/file.svg";
import { ReactComponent as ChatIcon } from "../icons/chat.svg";
// import { ReactComponent as GroupChatIcon } from "../icons/group-chat.svg";
import { ReactComponent as SettingsIcon } from "../icons/settings.svg";
import { ReactComponent as LogoutIcon } from "../icons/logout.svg";
import { ReactComponent as PlusIcon } from "../icons/plus.svg";
// import * as LayersIcon from "../icons/layers.svg";
// import * as DraftIcon from "../icons/draft.svg";
// import * as InvisibleIcon from "../icons/invisible.svg";
// import * as RejectedIcon from "../icons/rejected.svg";
// import * as MailIcon from "../icons/mail.svg";
// import * as FilterIcon from "../icons/filter.svg";
// import * as FigmaIcon from "../icons/figma.svg";
// import * as SketchIcon from "../icons/sketch.svg";
// import * as AIIcon from "../icons/ai.svg";
// import * as PencilIcon from "../icons/pencil.svg";
// import * as TrashIcon from "../icons/trash.svg";
// import * as ChevronLeftIcon from "../icons/chevron-left.svg";
// import * as ChevronRightIcon from "../icons/chevron-right.svg";

import Modal from "../components/Modal";
import useForm from "../lib/useForm";
import validate from "../validators/leadFormValidator";
import toast, { Toaster } from "react-hot-toast";
import Badge from "../components/badges/Badge";
import { useEffect } from "react";

const INITIAL_FORM = {
	fullname: "",
	comment: "",
	email: "",
	phone: "",
	statusId: 1,
};

export default function Dashboard() {
	const [formSchema, setFormSchema] = useState(INITIAL_FORM);
	const [showDialog, setShowDialog] = useState(false);
	const [leadsList, setLeadsList] = useState([]);

	const close = () => setShowDialog(false);

	const submit = async () => {
		try {
			return await axios.post(
				"http://localhost:1337/api/v1/leads",
				formSchema
			);
		} catch (e) {}
	};

	const handleModalSubmit = async () => {
		const res = submit();

		toast.promise(res, {
			loading: "Loading...",
			success: "Everything went smoothly.",
			error: "Uh oh, there was an error!",
		});

		const data = await res;

		setFormSchema(INITIAL_FORM);

		try {
			const {
				data: { results },
			} = await axios.get("http://localhost:1337/api/v1/leads");
			setLeadsList([...results]);
		} catch (e) {}

		close();
	};

	const {
		handleSubmit,
		handleChange: handleFormChange,
		values,
		errors,
	} = useForm(handleModalSubmit, validate, formSchema, setFormSchema);

	const sideList = [
		[
			{ label: "Overview", icon: OverviewIcon, path: "/" },
			{ label: "Products", icon: ShoppingBagIcon, path: "/" },
			{ label: "Analytics", icon: GraphIcon, path: "/" },
			{ label: "Schedule", icon: CalendarIcon, path: "/" },
			{ label: "Payout", icon: WalletIcon, path: "/" },
			{ label: "Statements", icon: FileIcon, path: "/" },
		],
		[
			{ label: "Help", icon: ChatIcon, path: "/" },
			{ label: "Settings", icon: SettingsIcon, path: "/" },
			{ label: "Logout", icon: LogoutIcon, path: "/logout" },
		],
	];

	useEffect(() => {
		const fetchLeads = async () => {
			try {
				const {
					data: { results },
				} = await axios.get("http://localhost:1337/api/v1/leads");
				setLeadsList([...results]);
			} catch (e) {}
		};
		fetchLeads();
	}, []);

	return (
		<div className="w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex">
			<aside className="py-6 px-10 w-64 border-r border-gray-200">
				<h3 className="text-2xl text-center font-semibold text-gray-600">
					Boom CRM
				</h3>
				{sideList.map((el, i) => (
					<ul key={i} className="flex flex-col gap-y-6 pt-20">
						{el.map((_el, _i) => (
							<NavLink
								to={_el.path}
								className="flex gap-x-4 items-start py-2 text-gray-500 hover:text-teal-600 group"
								key={_i}
							>
								<span className="absolute w-1.5 h-8 bg-teal-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"></span>
								{React.createElement(_el.icon, {
									className: "w-6 h-6 fill-current",
								})}
								<li>{_el.label}</li>
							</NavLink>
						))}
					</ul>
				))}
			</aside>

			<main className="flex-1">
				<div className="flex items-center justify-between py-7 px-10">
					<div>
						<h1 className="text-2xl font-semibold leading-relaxed text-gray-800">
							Leads
						</h1>
						<p className="text-sm font-medium text-gray-500">
							Let's grow to your business! Create your new leads
						</p>
					</div>
					<button
						onClick={() => setShowDialog(true)}
						className="inline-flex gap-x-2 items-center py-2.5 px-6 text-white bg-teal-600 rounded-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
					>
						<PlusIcon className="w-6 h-6 fill-current" />
						<span className="text-sm font-semibold tracking-wide">
							Create Lead
						</span>
					</button>
				</div>
				<Toaster />
				<Modal showDialog={showDialog} setShowDialog={setShowDialog}>
					<div className="flex justify-between">
						<div className="space-y-1">
							<h2 className="font-bold text-gray-900">
								Add a New Flow
							</h2>
							<p className="text-sm font-medium leading-5 text-gray-500">
								<em>Please fill out all inputs.</em>
							</p>
						</div>

						<button
							onClick={close}
							type="button"
							className="flex flex-col items-center text-gray-400 hover:text-gray-500 transition duration-150 ease-in-out"
						>
							<svg
								className="w-7 h-7"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path d="M6 18L18 6M6 6l12 12"></path>
							</svg>
							<span className="text-xs font-semibold text-center leading-3 uppercase">
								Esc
							</span>
						</button>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="mb-5">
							<label className="block space-y-2">
								<span className="block text-xs font-bold leading-4 tracking-wide uppercase text-gray-600">
									Fullname
								</span>

								<input
									onChange={handleFormChange}
									value={values.fullname}
									placeholder="Full name"
									type="text"
									name="fullname"
									className="w-full border border-gray-100 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-teal-200 focus:ring-1 focus:ring-teal-200"
								/>
								{errors?.fullname && (
									<span className="text-xs text-red-500">
										{errors?.fullname}
									</span>
								)}
							</label>
						</div>
						<div className="mb-5">
							<label className="block space-y-2">
								<span className="block text-xs font-bold leading-4 tracking-wide uppercase text-gray-600">
									Phone
								</span>

								<input
									onChange={handleFormChange}
									value={values.phone}
									placeholder="123-456-789"
									type="tel"
									name="phone"
									className="w-full border border-gray-100 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-teal-200 focus:ring-1 focus:ring-teal-200"
								/>
								{errors?.phone && (
									<span className="text-xs text-red-500">
										{errors?.phone}
									</span>
								)}
							</label>
						</div>
						<div className="mb-5">
							<label className="block space-y-2">
								<span className="block text-xs font-bold leading-4 tracking-wide uppercase text-gray-600">
									Email
								</span>

								<input
									onChange={handleFormChange}
									value={values.email}
									placeholder="john@email.com"
									type="text"
									name="email"
									className="w-full border border-gray-100 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-teal-200 focus:ring-1 focus:ring-teal-200"
								/>
								{errors?.email && (
									<span className="text-xs text-red-500">
										{errors?.email}
									</span>
								)}
							</label>
						</div>
						<div className="mb-5">
							<label className="block space-y-2">
								<span className="block text-xs font-bold leading-4 tracking-wide uppercase text-gray-600">
									Comment
								</span>

								<input
									onChange={handleFormChange}
									value={values.comment}
									placeholder="comment"
									type="text"
									name="comment"
									className="w-full border border-gray-100 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-teal-200 focus:ring-1 focus:ring-teal-200"
								/>
								{errors?.comment && (
									<span className="text-xs text-red-500">
										{errors?.comment}
									</span>
								)}
							</label>
						</div>
						<div className="sm:flex sm:flex-row-reverse">
							<span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
								<button
									onClick={close}
									className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
								>
									Cancel
								</button>
								<span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
									<button
										type="submit"
										className="inline-flex justify-center w-max rounded-md border border-transparent px-4 py-2 bg-teal-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
									>
										Add Lead
									</button>
								</span>
							</span>
						</div>
					</form>
				</Modal>
				{/* <HomePage /> */}

				<div className="p-5 w-full rounded-lg">
					<table className="w-full rounded-lg shadow overflow-hidden">
						<thead className="bg-gray-50 border-b-2 border-gray-200 rounded-lg">
							<tr>
								<th className="w-20 p-3 text-sm font-semibold tracking-wide text-center whitespace-nowrap">
									id
								</th>
								<th className=" w-36 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">
									Full name
								</th>
								<th className="w-36 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">
									email
								</th>
								<th className="w-36 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">
									phone
								</th>

								<th className=" max-w-xs break-all p-3 text-sm font-semibold tracking-wide text-left">
									comment
								</th>
								<th className="w-20 p-3 text-sm font-semibold tracking-wide text-center whitespace-nowrap">
									status
								</th>
							</tr>
						</thead>
						<tbody className=" divide-y divide-gray-100 ">
							{leadsList?.map((el) => (
								<tr
									className="odd:bg-white even:bg-gray-50"
									key={el.id}
								>
									<td className=" font-bold text-blue-500 text-center whitespace-nowrap">
										{el.id}
									</td>
									<td className="p-3 text-sm text-gray-700 whitespace-nowrap">
										{el.fullname}
									</td>
									<td className="p-3 text-sm text-gray-700 whitespace-nowrap">
										{el.email}
									</td>
									<td className="p-3 text-sm text-gray-700 whitespace-nowrap">
										{el.phone}
									</td>
									<td className="p-3 text-sm text-gray-700 tranc">
										{el.comment}
									</td>
									<td className="p-3 text-sm text-gray-700 text-center whitespace-nowrap">
										<Badge
											label={el.status?.name}
											labelColor={
												el.status?.name === "active"
													? "emerald"
													: "red"
											}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</main>
		</div>
	);
}
