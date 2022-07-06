import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Logout() {
	const { setAuth } = useContext(AuthContext);

	const navigate = useNavigate();
	useEffect(() => {
		setAuth({
			token: null,
		});
		localStorage.clear();
		navigate("/auth", { replace: true });
	}, []);
	return null;
}
