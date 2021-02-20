import CoffeeMachine from "../src/client/CoffeeMachine";
import MobileAppClient from "../src/client/MobileAppClient";
import AppResponse from "../src/model/AppResponse";
import Order from "../src/model/Order";
import CPS from "../src/server/CPS";

describe("Placing an order", () => {
	const cps = new CPS();
	cps.registerMachine(new CoffeeMachine());
	cps.registerMachine(new CoffeeMachine());
	cps.registerMachine(new CoffeeMachine());
	const app: MobileAppClient = new MobileAppClient();

	it("errors when no machine applies", () => {
		let order: Order = {
			id: 1,
			address: {street: "", zip: ""},
			drink: "Expresso",
			condiments: []
		};
		let expected: AppResponse = {
			orderID: 1,
			machineID: -1,
			status: 2,
			message: "An error has occured.",
			error: "No suitable machine can be found."
		};
		app.sendOrder(order);
		let result = app.getResult(order.id);
		expect(result).toStrictEqual(expected);
	});

	it("errors when no recipe exists", () => {
		let order: Order = {
			id: 2,
			address: {street: "7745 East Edgewood", zip: "46239"},
			drink: "Pumpkin Spice Latte",
			condiments: []
		};
		let expected: AppResponse = {
			orderID: 2,
			machineID: 2,
			status: 2,
			message: "An error has occured.",
			error: "No known recipe can be found."
		};
		app.sendOrder(order);
		let result = app.getResult(order.id);
		expect(result).toStrictEqual(expected);
	});

	it("errors when the machine does not respond", () => {
		let order: Order = {
			id: 3,
			address: {street: "7745 East Edgewood", zip: "46239"},
			drink: "Expresso",
			condiments: []
		};
		let expected: AppResponse = {
			orderID: 3,
			machineID: 2,
			status: 2,
			message: "An error has occured.",
			error: "No response from coffee machine."
		};
		app.sendOrder(order, true);
		let result = app.getResult(order.id);
		expect(result).toStrictEqual(expected);
	});

	it("errors when the machine cannot fulfill the order", () => {
		let order: Order = {
			id: 4,
			address: {street: "7745 East Edgewood", zip: "46239"},
			drink: "Americano",
			condiments: []
		};
		let expected: AppResponse = {
			orderID: 4,
			machineID: 2,
			status: 2,
			message: "An error has occured.",
			error: "Coffee machine could not complete order."
		};
		app.sendOrder(order);
		let result = app.getResult(order.id);
		expect(result).toStrictEqual(expected);
	});

	it("displays that the order was successfully fulfilled", () => {
		let order: Order = {
			id: 5,
			address: {street: "7745 East Edgewood", zip: "46239"},
			drink: "Expresso",
			condiments: []
		};
		let expected: AppResponse = {
			orderID: 5,
			machineID: 2,
			status: 0,
			message: "Order placed successfully.",
			error: ""
		};
		app.sendOrder(order);
		let result = app.getResult(order.id);
		expect(result).toStrictEqual(expected);
	});
});
