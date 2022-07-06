import React, { useMemo } from "react";
import { useTable } from "react-table";
import Loader from "./Loader";

const AppTable = ({ columns, data, isLoading, manualPagination = true }) => {
	const columnData = useMemo(() => columns, [columns]);
	const rowData = useMemo(() => data, [data]);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns: columnData,
			data: rowData,
			manualPagination,
		});
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className="mt-2 flex flex-col">
					<div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
						<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
								<table
									{...getTableProps()}
									className="min-w-full divide-y divide-gray-200"
								>
									<thead className="bg-gray-50">
										{headerGroups.map((headerGroup) => (
											<tr
												{...headerGroup.getHeaderGroupProps()}
											>
												{headerGroup.headers.map(
													(column) => (
														<th
															scope="col"
															className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
															{...column.getHeaderProps()}
														>
															{column.render(
																"Header"
															)}
															<span>
																{column.isSorted
																	? column.isSortedDesc
																		? " ▼"
																		: " ▲"
																	: ""}
															</span>
														</th>
													)
												)}
											</tr>
										))}
									</thead>
									<tbody
										{...getTableBodyProps()}
										className="bg-white divide-y divide-gray-200"
									>
										{rows.map((row, i) => {
											prepareRow(row);
											return (
												<tr {...row.getRowProps()}>
													{row.cells.map((cell) => {
														return (
															<td
																{...cell.getCellProps()}
																className="px-6 py-4 whitespace-nowrap"
															>
																{cell.render(
																	"Cell"
																)}
															</td>
														);
													})}
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

const NewTable = ({ columns, data, isLoading, manualPagination = true }) => {
	const columnData = useMemo(() => columns, [columns]);
	const rowData = useMemo(() => data, [data]);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns: columnData,
			data: rowData,
			manualPagination,
		});
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<table
					{...getTableProps()}
					className="w-full rounded-lg shadow overflow-hidden"
				>
					<thead className="bg-gray-50 border-b-2 border-gray-200 rounded-lg">
						{headerGroups.map((headerGroup) => (
							<tr
								{...headerGroup.getHeaderGroupProps()}
								className="p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap"
							>
								{headerGroup.headers.map((column) => (
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										{...column.getHeaderProps()}
									>
										{column.render("Header")}
										<span>
											{column.isSorted
												? column.isSortedDesc
													? " ▼"
													: " ▲"
												: ""}
										</span>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody
						className=" divide-y divide-gray-100"
						{...getTableBodyProps()}
					>
						{rows.map((row, i) => {
							prepareRow(row);
							return (
								<tr
									{...row.getRowProps()}
									className="odd:bg-white even:bg-gray-50"
								>
									{row.cells.map((cell) => {
										return (
											<td
												{...cell.getCellProps()}
												className="p-3 text-sm text-gray-700 whitespace-nowrap"
											>
												{cell.render("Cell")}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</>
	);
};

// export default AppTable;
export default NewTable;
