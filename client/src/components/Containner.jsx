import React, { useState, useEffect } from "react";
import { getData, columns, formatRowData } from "./data";
import Table from "./Table";
import Pagination from "./Pagination";

const HomePage = () => {
	const [pageData, setPageData] = useState({
		rowData: [],
		isLoading: false,
		totalPages: 0,
		totalPassengers: 0,
	});
	const [currentPage, setCurrentPage] = useState(1);
	useEffect(() => {
		setPageData((prevState) => ({
			...prevState,
			rowData: [],
			isLoading: true,
		}));
		getData(currentPage).then((info) => {
			const { totalPages, totalPassengers, data } = info;
			setPageData({
				isLoading: false,
				rowData: formatRowData(data),
				totalPages,
				totalPassengers,
			});
		});
	}, [currentPage]);
	return (
		<div className="p-5 w-full rounded-lg">
			<Table
				columns={columns}
				data={pageData.rowData}
				isLoading={pageData.isLoading}
			/>
			{!pageData.isLoading && (
				<Pagination
					totalRows={pageData.totalPassengers}
					pageChangeHandler={setCurrentPage}
					rowsPerPage={15}
				/>
			)}
		</div>
	);
};

export default HomePage;
