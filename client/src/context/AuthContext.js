import React, { useState, createContext, useEffect, useContext } from "react";
import { useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

function AuthProvider(props) {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state?.from?.pathname || "/";

	const initial = { token: "" };
	const [auth, setAuth] = useState(initial);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			(async () => {
				const {
					data: { success },
				} = await axios.post(
					"http://localhost:1337/api/v1/users/token",
					{},
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				if (success) {
					setAuth({
						token,
					});
					navigate(from, { replace: true });
				} else {
					setAuth((oldValue) => {
						return { ...oldValue, token: "" };
					});
					localStorage.clear();
				}
			})();
		} else {
			setAuth((oldValue) => {
				return { ...oldValue, token: "" };
			});
		}
	}, []);
	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{props.children}
		</AuthContext.Provider>
	);
}

/**
 * in general cases I dont need to check the local storage
 */
export const RequireAuth = () => {
	// const authContext = useAuth();
	const {
		auth: { token },
	} = useContext(AuthContext);
	const location = useLocation();

	return token ? (
		<Outlet />
	) : (
		<Navigate to="/auth" state={{ from: location }} replace />
	);
};

export default AuthProvider;
