"use strict";

function fn_pagination(total_count, req) {
	const per_page = req.query.per_page ? Number(req.query.per_page) : 10;
	const total_pages = Math.ceil(total_count / per_page);
	const page =
		req.query.page >= 1 && req.query.page <= total_pages
			? Number(req.query.page)
			: 1;

	let start = (page - 1) * per_page + 1;
	let end = total_count;
	// let page_param = req.query.page > 1 ? (req.query.page - 1) * per_page : 0;
	let page_param = page > 1 ? (page - 1) * per_page : 0;

	if (per_page < total_count) {
		end = per_page * page;
		if (end > total_count) end = total_count;
	}

	return {
		total_pages,
		per_page,
		page,
		page_param,
		start,
		end,
	};
}

module.exports = fn_pagination;
