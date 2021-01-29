type AppResponse = {
	orderID: number,
	machineID: number,
	status: number,
	message: string,
	error: string
};

export function parseAppResponse(raw: any): AppResponse {
	const response = raw["user-response"];
	return {
		orderID: response["orderID"],
		machineID: response["coffee_machine_id"],
		status: response["status"],
		message: response["status-message"],
		error: response["error-message"]
	};
}

export default AppResponse;

