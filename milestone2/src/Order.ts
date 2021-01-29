import Address from "./Address";
import Condiment from "./Condiment";

type Order = {
	id: number,
	address: Address,
	drink: string,
	condiments: Condiment[]
};

export function parseOrder(raw: any): Order {
	const order = raw["order"]
	return {
		id: order["orderID"],
		address: order["address"],
		drink: "",
		condiments: []
	};
}

export default Order;

