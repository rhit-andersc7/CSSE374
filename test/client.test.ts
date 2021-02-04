import MobileAppClient from "../src/client/MobileAppClient";

import Order from "../src/model/Order";
import AppResponse from "../src/model/AppResponse";

import {appResponse, orderInput} from "./getdata";
import CPS from "../src/server/CPS";

function matchResponses(actual: AppResponse, expected: AppResponse) {
	expect(actual.orderID).toBe(expected.orderID);
	expect(actual.machineID).toBe(expected.machineID);
	expect(actual.status).toBe(expected.status);
	expect(actual.message).toBe(expected.message);
	expect(actual.error).toBe(expected.error);
}

type Test = (number | Order | AppResponse)[]

const tests: Test[] = [];
appResponse.forEach((response) => {
	const id = response.orderID;
	const request = orderInput.get(id);
	if (!request) throw new Error();
	tests.push([id, request, response]);
	let x = [id, request, response];
	x
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

