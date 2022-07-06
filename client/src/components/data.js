export const columns = [
	{
		Header: "Passenger name",
		accessor: "name",
	},
	{
		Header: "Total trips",
		accessor: "trips",
	},
	{
		Header: "Current flight",
		accessor: "flightName",
	},
];

export const formatRowData = (rawData) =>
	rawData.map((info) => ({
		name: info.name,
		trips: info.trips,
		flightName: info.airline?.name,
	}));

export const getData = async (pageNo = 1) => {
	const response = await fetch(
		`https://api.instantwebtools.net/v1/passenger?page=${pageNo}&size=10`
	);
	return await response.json();
};
