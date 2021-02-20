import CPS from "../src/server/CPS";
import Order from "../src/model/Order";
import Command, { commandFromOrder } from "../src/model/Command";
import CoffeeMachine from "../src/client/CoffeeMachine";

const cps = new CPS();
cps.registerMachine(new CoffeeMachine());
cps.registerMachine(new CoffeeMachine());
cps.registerMachine(new CoffeeMachine());

describe("Finding which machine", () => {

	it("errors when no machines apply", () => {
		let request: Order = {
			id: 1,
			address: {street: "404 Invalid Ave", zip: "1337"},
			drink: "Expresso",
			condiments: []
		};
		expect(cps.findCoffeeMachine(request)).toBe(-1);
	});

	it("receives the controller id", () => {
		let request: Order = {
			id: 1,
			address: {street: "5500 Wabash Ave", zip: "47803"},
			drink: "Expresso",
			condiments: []
		};
		expect(cps.findCoffeeMachine(request)).toBe(1);
		request.id = 2;
		request.address.street = "7745 East Edgewood";
		request.address.zip = "46239";
		expect(cps.findCoffeeMachine(request)).toBe(2);
	});
});

describe("Getting the recipe", () => {
	let request: Order = {
		id: 1,
		address: {street: "", zip: ""},
		drink: "",
		condiments: []
	};

	it("errors when there is no valid recipe", () => {
		expect(cps.getRecipe(request)).toBeUndefined();
	});

	it("receives the correct recipe", () => {
		request.drink = "Expresso";
		expect(cps.getRecipe(request)).toStrictEqual({
			instructions: ["Brew Expresso"]
		});
	});
});

describe("Generating the command", () => {
	it("generates the command", () => {
		let request: Order = {
			id: 1,
			address: {street: "", zip: ""},
			drink: "Expresso",
			condiments: []
		};
		let expected: Command = {
			controllerId: 0,
			machineID: 0,
			orderID: 1,
			drink: "Expresso",
			requestType: "",
			options: []
		}
		let actual = commandFromOrder(request, 0);
		expect(actual).toStrictEqual(expected);
	});
});

describe("Sending the order to the coffee machine", () => {
	let request: Order = {
		id: 1,
		address: {street: "", zip: ""},
		drink: "",
		condiments: []
	};
	it("errors when the machine does not respond", () => {
		let command = commandFromOrder(request, 0);
		expect(() => {cps.sendCommand(command, true)}).
			toThrowError("Machine did not respond");
	});

	it("errors when the machine returns an error", () => {
		let command = commandFromOrder(request, 0);
		expect(() => {cps.sendCommand(command)}).
			toThrowError("Machine could not process request");
	});

	it("receives the order confirmation", () => {
		request.drink = "Expresso";
		let command = commandFromOrder(request, 0);
		expect(() => {cps.sendCommand(command)}).
			not.toThrow();
	});
});

