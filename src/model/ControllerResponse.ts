type ControllerResponse = {
	orderID: number,
	errorCode: number
	message: string,
};

export function parseControllerResponse(raw: any): ControllerResponse {
	const response = raw["drinkresponse"];
	return {
		orderID: response["orderID"],
		errorCode: response["errorcode"] || 0,
		message: response["errordesc"]
	};
}

export default ControllerResponse;

