import MobileAppClient from "../src/MobileAppClient";

import Order, {parseOrder} from "../src/Order";
import AppResponse, {parseAppResponse} from "../src/AppResponse";

// import {default as responses} from "../data/app-response.json";
// import {default as requests} from "../data/order-input.json";
import {appResponse as responses, request as requests} from "./getdata";

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

	// console.log(tests);

	it("creates the MobileAppClient", () => {
		client = new MobileAppClient();
	});

	// it.each(tests)(`does for %s`, (i, request, response) => {
	// 	client.sendOrder(request as Order);
	// 	expect(1).toBe(1);
	// });
	// for (const single in tests) {
		//it("sends the request", () => {
		//	// client.sendOrder();
		//});

		//it("receives the response", () => {
		//	//
		//});
	// }
});

