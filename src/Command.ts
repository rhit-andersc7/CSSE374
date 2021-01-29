import Condiment from "./Condiment";
import Order, {parseOrder} from "./Order";

let id = 0;

type Command = {
	id: number,
	machineID: number,
	orderID: number,
	drink: string,
	requestType: string,
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

export function parseCommand(raw: Any): Command {
	const command = raw["command"];
	return {
		id: command["controller_id"],
		machineID: command["coffee_machine_id"],
		orderID: command["orderID"],
		drink: command["DrinkName"],
		requestType: command["Requesttype"],
		options: parseOrder(command["Options"])
	};
}

export default Command;

