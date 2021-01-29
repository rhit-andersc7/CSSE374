import {default as rawAppResponse} from "../data/app-response.json";
import {default as rawCommandStream} from "../data/command-stream.json";
import {default as rawControllerResponse} from "../data/controller-response.json";
import {default as rawOrderInput} from "../data/order-input.json";

import AppResponse, {parseAppResponse} from "../src/AppResponse";
import Command, {parseCommand} from "../src/Command";
import ControllerResponse, {parseControllerResponse} from "../src/ControllerResponse";
import Order, {parseOrder} from "../src/Order";

const appResponse: Map<number, AppResponse> = new Map();
const commandStream: Map<number, Command> = new Map();
const controllerResponse: Map<number, ControllerResponse> = new Map();
const orderInput: Map<number, Order> = new Map();

for (const raw of rawAppResponse) {
	const response = parseAppResponse(raw);
	appResponse.set(response.orderID, response);
}

for (const raw of rawCommandStream) {
	const command = parseCommand(raw);
	commandStream.set(command.orderID, command);
}

for (const raw of rawControllerResponse) {
	const response = parseControllerResponse(raw);
	controllerResponse.set(response.orderID, response);
}

for (const raw of rawOrderInput) {
	const order = parseOrder(raw);
	orderInput.set(order.id, order);
}

export { appResponse, commandStream, controllerResponse, orderInput };

