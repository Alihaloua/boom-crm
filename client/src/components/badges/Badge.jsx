import React from "react";

export default function Badge({ label, labelColor }) {
	return (
		<span
			className={`p-1.5 text-xs font-bold uppercase tracking-wider text-${labelColor}-800 bg-${labelColor}-200 rounded-lg bg-opacity-50`}
			// className={`p-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200 rounded-lg bg-opacity-50`}
		>
			{label}
		</span>
	);
}
