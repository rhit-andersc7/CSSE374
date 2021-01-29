import Condiment from "./Condiment";
import Order from "./Order";

let id = 0;

type Command = {
	id: number,
	machineID: number,
	orderID: number,
	drink: string,
	options: Condiment[]
};

export function commandFromOrder(order: Order, machineID: number): Command {
	return {
		id: ++id,
		machineID: machineID,
		orderID: order.id,
		drink: order.drink,
		options: order.condiments
	};
}

export default Command;

