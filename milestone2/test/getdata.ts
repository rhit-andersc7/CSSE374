import {default as appResponse} from "../data/app-response.json";
import {default as commandStream} from "../data/command-stream.json";
import {default as controllerResponse} from "../data/controller-response.json";
import {default as orderInput} from "../data/order-input.json";

import AppResponse, {parseAppResponse} from "../src/AppResponse";
import Command, {parseCommand} from "../src/Order";
import ControllerResponse, {parseControllerResponse} from "../src/ControllerResponse";
import Order, {parseOrder} from "../src/Order";

type Parsed = {
	appResponse: Map<number, AppResponse>,
	commandStream: Map<number, Command>,
	controllerResponse: Map<number, ControllerResponse>,
	orderInput: Map<number, Order>
}

const parsed: Parsed = {
	appResponse: new Map(),
	commandStream: new Map(),
	controllerResponse: new Map(),
	orderInput: new Map()
}

for (const raw of appResponse) {
	const response = parseAppResponse(raw);
	parsed.appResponse.set(response.orderID, response);
}

for (const raw of commandStream) {
	const command = parseCommand(raw);
	parsed.commandStream.set(command.id, command);
}

for (const raw of controllerResponse) {
	const response = parseControllerResponse(raw);
	parsed.controllerResponse.set(response.orderID, response);
}

for (const raw of orderInput) {
	const order = parseOrder(raw);
	parsed.orderInput.set(order.id, order);
}


// export {appResponse, request, command, controllerResponse};

