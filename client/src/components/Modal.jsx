import React from "react";
import {
	Dialog,
	// DialogOverlay,
	// DialogContent,
} from "@reach/dialog";

export default function Modal({ setShowDialog, showDialog, children }) {
	const close = () => setShowDialog(false);
	if (showDialog === false) return null;

	return (
		<Dialog
			isOpen={showDialog}
			onDismiss={close}
			className="w-5/12 px-8 py-6 space-y-6 overflow-hidden bg-white rounded-md shadow-lg transition duration-1000 ease-in-out transform"
			aria-label="test"
		>
			{children}
		</Dialog>
	);
}
