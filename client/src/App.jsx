import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import AuthProvider, { RequireAuth } from "./context/AuthContext";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Logout from "./components/Logout";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Outlet />}>
				{/* public Routes */}
				<Route path="auth" element={<Login />} />
				<Route path="logout" element={<Logout />} />

				{/* protected Routes */}
				<Route element={<RequireAuth />}>
					<Route path="/" element={<Dashboard />} />
				</Route>

				{/* need to to catch all others */}
			</Route>
		</Routes>
	);
}

function AppWithStore() {
	return (
		<AuthProvider>
			<App />
		</AuthProvider>
	);
}

export default AppWithStore;
