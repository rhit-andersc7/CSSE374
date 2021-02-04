import Condiment, {parseCondiments} from "./Condiment";
import Order from "./Order";

type Command = {
	controllerId: number,
	machineID: number,
	orderID: number,
	drink: string,
	requestType: string,
	options: Condiment[]
};

export function commandFromOrder(order: Order, machineID: number): Command {
	return {
		controllerId: 0, // TODO: Fix this
		machineID: machineID,
		orderID: order.id,
		drink: order.drink,
		requestType: "",
		options: order.condiments
	};
}

export function parseCommand(raw: any): Command {
	const command = raw["command"];
	return {
		controllerId: command["controller_id"],
		machineID: command["coffee_machine_id"],
		orderID: command["orderID"],
		drink: command["DrinkName"],
		requestType: command["Requesttype"],
		options: parseCondiments(command["Options:"])
	};
}

export default Command;

