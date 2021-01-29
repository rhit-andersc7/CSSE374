import Address from "./Address";
import Condiment from "./Condiment";

type Order = {
	id: number,
	address: Address,
	drink: string,
	condiments: Condiment[]
};

export function parseOrder(raw: any): Order {
	return {
		id: raw["orderID"],
		address: raw["address"],
		drink: "",
		condiments: []
	};
}

export default Order;

