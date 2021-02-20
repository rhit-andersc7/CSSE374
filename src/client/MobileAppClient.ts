import AppResponse from "../model/AppResponse";
import IObserver from "../IObserver";
import Order from "../model/Order";

import CPS from "../server/CPS";

export default class MobileAppClient implements IObserver {
	public clientID: number = 0;
	private waiting: Map<number, Order> = new Map();
	private responses: Map<number, AppResponse> = new Map();

	constructor() {
		CPS.instance.add(this);
	}

	sendOrder(order: Order, timeout = false): boolean {
		this.waiting.set(order.id, order);
		CPS.instance.processOrder(this, order, timeout);
		return false;
	}

	getResult(orderID: number): AppResponse | undefined {
		return this.responses.get(orderID);
	}

	displayResult(orderID: number): string {
		let response = this.responses.get(orderID);
		if (!response) return "No response found.";
		if (response.status !== 0) return response.message + '\n' + response.error;
		return response.message;
	}

	update(): void {
		let response = CPS.instance.responses.get(this);
		if (!response) return;
		this.responses.set(response.orderID, response)
	}
}

