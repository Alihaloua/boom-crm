import React, { useState, useEffect } from "react";
import {
	ChevronDoubleLeftIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import { Button, PageButton } from "../shared/Button";

const Pagination = ({ pageChangeHandler, totalRows, rowsPerPage }) => {
	// Calculating max number of pages
	const noOfPages = Math.ceil(totalRows / rowsPerPage);

	// Creating an array with length equal to no.of pages
	const pagesArr = [...new Array(noOfPages)];

	// State variable to hold the current page. This value is
	// passed to the callback provided by the parent
	const [currentPage, setCurrentPage] = useState(1);

	// Navigation arrows enable/disable state
	const [canGoBack, setCanGoBack] = useState(false);
	const [canGoNext, setCanGoNext] = useState(true);

	// Onclick handlers for the butons
	const onNextPage = () => setCurrentPage(currentPage + 1);
	const onPrevPage = () => setCurrentPage(currentPage - 1);
	const onPageSelect = (pageNo) => setCurrentPage(pageNo);

	// Disable previous and next buttons in the first and last page
	// respectively
	useEffect(() => {
		if (noOfPages === currentPage) {
			setCanGoNext(false);
		} else {
			setCanGoNext(true);
		}
		if (currentPage === 1) {
			setCanGoBack(false);
		} else {
			setCanGoBack(true);
		}
	}, [noOfPages, currentPage]);

	// To set the starting index of the page
	useEffect(() => {
		// const skipFactor = (currentPage - 1) * rowsPerPage;
		// Some APIs require skip for paginaiton. If needed use that instead
		// pageChangeHandler(skipFactor);
		pageChangeHandler(currentPage);
	}, [currentPage]);
	return (
		<div className="py-3 flex items-center justify-between">
			<div className="flex-1 flex justify-between sm:hidden">
				<Button onClick={() => onPrevPage()} disabled={!canGoBack}>
					Previous
				</Button>
				<Button onClick={() => onNextPage()} disabled={!canGoNext}>
					Next
				</Button>
			</div>
			<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
				<div className="flex gap-x-2">
					<span className="text-sm text-gray-700">
						Page <span className="font-medium">{currentPage}</span>{" "}
						of{" "}
						<span className="font-medium">{pagesArr.length}</span>
					</span>
					{/* <select
						value={state.pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
					>
						{[5, 10, 20].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select> */}
				</div>
				<div>
					<nav
						className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
						aria-label="Pagination"
					>
						<PageButton
							className="rounded-l-md"
							onClick={() => onPageSelect(0)}
							disabled={!canGoBack}
						>
							<span className="sr-only">First</span>
							<ChevronDoubleLeftIcon
								className="h-5 w-5"
								aria-hidden="true"
							/>
						</PageButton>
						<PageButton
							onClick={() => onPrevPage()}
							disabled={!canGoBack}
						>
							<span className="sr-only">Previous</span>
							<ChevronLeftIcon
								className="h-5 w-5"
								aria-hidden="true"
							/>
						</PageButton>
						<PageButton
							onClick={() => onNextPage()}
							disabled={!canGoNext}
						>
							<span className="sr-only">Next</span>
							<ChevronRightIcon
								className="h-5 w-5"
								aria-hidden="true"
							/>
						</PageButton>
						<PageButton
							className="rounded-r-md"
							onClick={() => onPageSelect(noOfPages - 1)}
							disabled={!canGoNext}
						>
							<span className="sr-only">Last</span>
							<ChevronDoubleRightIcon
								className="h-5 w-5"
								aria-hidden="true"
							/>
						</PageButton>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Pagination;
