import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { IsLoggedfn } from "../context/AuthContext";

export default function PrivateRoute() {
	const isLogged = IsLoggedfn();
	if (typeof isLogged === "string") return Outlet;
	return <Navigate to="/auth" />;
}
