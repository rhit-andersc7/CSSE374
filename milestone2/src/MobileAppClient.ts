import ControllerToAppResponse from "./ControllerToAppResponse";
import IObserver from "./IObserver";
import Order from "./Order";

import CPS from "./CPS";

export default class MobileAppClient implements IObserver {
	public clientID: number = 0;
	private waiting: Map<number, Order> = new Map();
	private responses: Map<number, ControllerToAppResponse> = new Map();

	constructor() {
		CPS.instance.add(this);
	}

	sendOrder(order: Order): boolean {
		this.waiting.set(order.id, order);
		return false;
	}

	getResult(): string {
		return "";
	}

	displayResult(response: ControllerToAppResponse): void {

	}

	update(): void {

	}
}

