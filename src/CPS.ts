import Address from "./Address";
import Command from "./Command";
import CoffeeMachine from "./CoffeeMachine";
import ControllerToAppResponse from "./ControllerToAppResponse";
import IObservable from "./IObservable";
import IObserver from "./IObserver";
import MobileAppClient from "./MobileAppClient";
import Order from "./Order";

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

