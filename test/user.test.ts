import MobileAppClient from "../src/client/MobileAppClient";
import CPS from "../src/server/CPS";

import {appResponse, orderInput} from "./getdata";

describe("Placing an order", () => {
	const cps = new CPS();
	const app: MobileAppClient = new MobileAppClient();

	it("errors when no machine applies", () => {
		app.sendOrder(orderInput.get(1)!);
		let result = app.getResult();
		// expect(result).toEqual(appResponse.get(1)!);
	});

	it("errors when no recipe exists", () => {

	});

	it("errors when the machine does not respond", () => {

	});

	it("errors when the machine cannot fulfill the order", () => {
		
	});

	it("displays that the order was successfully fulfilled", () => {
		
	});
});
