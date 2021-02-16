import CoffeeMachine from "../src/client/CoffeeMachine";
import { commandFromOrder } from "../src/model/Command";
import Order from "../src/model/Order";

describe("Coffee machine display", () => {
	it("displays unadded condiments", () => {
		let machine = new CoffeeMachine();
		let request: Order = {
			id: 1,
			address: {street: "", zip: ""},
			drink: "Expresso",
			condiments: [
				{name: "cream", quantity: 150},
				{name: "ice", quantity: 3}
			]
		};

		machine.brew(commandFromOrder(request, 0));
		expect(machine.getUnadded()).toBe("cream: 150, ice: 3");
	});
});
