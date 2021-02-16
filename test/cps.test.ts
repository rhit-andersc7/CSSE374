import CPS from "../src/server/CPS";
import Order from "../src/model/Order";

const cps = new CPS();

describe("Finding which machine", () => {

	it("errors when no machines apply", () => {
		let request: Order = {
			id: 1,
			address: {street: "", zip: ""},
			drink: "",
			condiments: []
		};
		expect(cps.findCoffeeMachine(request)).toBe(-1);
	});

	it("receives the controller id", () => {
		let request: Order = {
			id: 1,
			address: {street: "", zip: ""},
			drink: "Expresso",
			condiments: []
		};
		expect(cps.findCoffeeMachine(request)).toBe(2);
		request.id = 2;
		request.drink = "Americano";
		expect(cps.findCoffeeMachine(request)).toBe(1);
	});
});

describe("Getting the recipe", () => {
	it("errors when there is no valid recipe", () => {

	});

	it("receives the correct recipe", () => {

	});
});

describe("Generating the order", () => {
	it("generates the order", () => {

	});
});

describe("Sending the order to the coffee machine", () => {
	it("errors when the machine does not respond", () => {
		
	});

	it("errors when the machine returns an error", () => {
		
	});

	it("receives the order confirmation", () => {

	});
});

