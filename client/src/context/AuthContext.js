import React, { useState, createContext, useEffect, useContext } from "react";
import { useNavigate, useLocation, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import useAuth from "../lib/useAuth";

export const AuthContext = createContext();

function AuthProvider(props) {
	// const history = useNavigate();
	const [auth, setAuth] = useState({ token: "", user: {} });

	// useEffect(() => {
	// 	const token = localStorage.getItem("token");
	// 	if (token) {
	// 		(async () => {
	// 			const {
	// 				data: { res },
	// 			} = await axios.post(
	// 				"http://localhost:1337/api/v1/users/token",
	// 				{},
	// 				{
	// 					headers: { Authorization: `Bearer ${token}` },
	// 				}
	// 			);
	// 			if (res) {
	// 				const { userName: loggedUser, userId: loggedID } = res;
	// 				setAuth({ token, loggedUser, loggedID });
	// 			} else {
	// 				setAuth((oldValue) => {
	// 					return { ...oldValue, token: null };
	// 				});
	// 				localStorage.clear();
	// 			}
	// 		})();
	// 	} else {
	// 		setAuth((oldValue) => {
	// 			return { ...oldValue, token: null };
	// 		});
	// 	}
	// }, [history]);
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
	const authContext = useAuth();
	const location = useLocation();

	return authContext?.auth?.token ? (
		<Outlet />
	) : (
		<Navigate to="/auth" state={{ from: location }} replace />
	);
};

export default AuthProvider;
