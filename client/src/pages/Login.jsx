import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Login() {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state?.from?.pathname || "/";

	const [formSchema, setFormSchema] = useState({
		email: "",
		password: "",
	});

	const { setAuth } = useContext(AuthContext);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormSchema((oldValues) => ({
			...oldValues,
			[name]: value,
		}));
	};

	const submit = async () => {
		try {
			return await axios.post(
				"http://localhost:1337/api/v1/users/login",
				formSchema
			);
		} catch (e) {}
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const res = submit();

			toast.promise(res, {
				loading: "Loading...",
				success: "Everything went smoothly.",
				error: "Uh oh, there was an error!",
			});

			const {
				data: { results },
			} = await res;

			localStorage.setItem("token", results?.accessToken);

			setAuth(() => ({
				token: results?.accessToken,
				user: results?.user,
			}));

			navigate(from, { replace: true });
		} catch (e) {}
	};

	return (
		<div className="container mx-auto p-8 flex">
			<div className="max-w-md w-full mx-auto">
				<h1 className="text-4xl text-center mb-12 font-thin">
					Lead CRM
				</h1>
				<Toaster position="bottom-center" reverseOrder={false} />
				<div className="bg-white rounded-lg overflow-hidden shadow-2xl">
					<div className="p-8">
						<form onSubmit={handleSubmit}>
							<div className="mb-5">
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-600"
								>
									Email
								</label>

								<input
									type="text"
									name="email"
									onChange={handleChange}
									className="block w-full p-3 rounded bg-gray-100 border border-transparent focus:outline-none"
								/>
							</div>

							<div className="mb-5">
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-600"
								>
									Password
								</label>

								<input
									type="password"
									name="password"
									onChange={handleChange}
									className="block w-full p-3 rounded bg-gray-100 border border-transparent focus:outline-none"
								/>
							</div>

							<button className="w-full p-3 mt-4 bg-teal-500 text-white rounded">
								Login
							</button>
						</form>
					</div>

					<div className="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100">
						<Link to={"#"} className="font-medium text-teal-800">
							Create account
						</Link>

						<Link to={"#"} className="text-gray-600">
							Forgot password?
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
