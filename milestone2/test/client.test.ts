import MobileAppClient from "../src/MobileAppClient";

import Order, {parseOrder} from "../src/Order";
import ControllerToAppResponse, {parseResponse} from "../src/ControllerToAppResponse";

import {default as responses} from "../data/app-response.json";
import {default as requests} from "../data/order-input.json";

import CPS from "../src/CPS";

describe("Client", () => {
	let client: MobileAppClient;

	new CPS();

	const tests = [];
	for (const i in requests) {
		tests.push([
			i,
			parseOrder(requests[i]["order"]),
			parseResponse(responses[i]["user-response"])
		]);
	}

	it("creates the MobileAppClient", () => {
		client = new MobileAppClient();
	});

	it.each(tests)(`does for %s`, (i, request, response) => {
		client.sendOrder(request as Order);
		expect(1).toBe(1);
	});
	// for (const single in tests) {
		//it("sends the request", () => {
		//	// client.sendOrder();
		//});

		//it("receives the response", () => {
		//	//
		//});
	// }
});

