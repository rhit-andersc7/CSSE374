type ControllerToAppResponse = {
	orderID: number,
	machineID: number,
	status: number,
	message: string,
	error: string
};

export function parseResponse(raw: any): ControllerToAppResponse {
	return {
		orderID: raw["orderID"],
		machineID: raw["coffee_machine_id"],
		status: raw["status"],
		message: raw["status-message"],
		error: raw["error-message"]
	};
}

export default ControllerToAppResponse;

