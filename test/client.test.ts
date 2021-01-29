import MobileAppClient from "../src/MobileAppClient";

import Order, {parseOrder} from "../src/Order";
import AppResponse, {parseAppResponse} from "../src/AppResponse";

import {appResponse, orderInput} from "./getdata";
import CPS from "../src/CPS";

function matchResponses(actual: AppResponse, expected: AppResponse) {
	expect(actual.orderID).toBe(expected.orderID);
	expect(actual.machineID).toBe(expected.machineID);
	expect(actual.status).toBe(expected.status);
	expect(actual.message).toBe(expected.message);
	expect(actual.error).toBe(expected.error);
}

const tests = [];
appResponse.forEach((response, index) => {
	const id = response.orderID;
	const request = orderInput.get(id);
	if (!request) throw new Error();
	tests.push([id, request, response]);
});

describe("Client", () => {
	let client: MobileAppClient;
	new CPS();

	it("creates the MobileAppClient", () => {
		client = new MobileAppClient();
	});

	it.each(tests)(`matches response for order %s`, (i, request, response) => {
		console.log(request);
		console.log(response);
		expect(1).toBe(1);
	});
});

