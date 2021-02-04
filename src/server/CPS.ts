import Address from "../model/Address";
import Command from "../model/Command";
import CoffeeMachine from "../client/CoffeeMachine";
import ControllerToAppResponse from "../model/AppResponse";
import IObservable from "../IObservable";
import IObserver from "../IObserver";
import MobileAppClient from "../client/MobileAppClient";
import Order from "../model/Order";

const machine = new CoffeeMachine();

export default class CPS implements IObservable {
	static instance: CPS;

	constructor() {
		if (CPS.instance) return CPS.instance
		else CPS.instance = this;
	}

	findCoffeeMachine(address: Address): number {
		return machine.id;
	}

	processOrder(order: Order): void {
		const machineID = this.findCoffeeMachine(order.address);
		if (machineID === -1) {
			// Send error
			return
		}
	}

	sendCommand(command: Command): void {
		CoffeeMachine.getMachine(command.machineID).brew(command);
	}

	relayOrderAsCommand(order: Order): boolean {
		return false;
	}

	sendResponse(
		appClient: MobileAppClient,
		response: ControllerToAppResponse
	): boolean {
		return false;
	}

	add(observer: IObserver): void {
		// console.log(observer);
	}

	remove(observer: IObserver): void {

	}

	notify(): void {

	}
}

