import Address from "../model/Address";
import Command from "../model/Command";
import CoffeeMachine from "../client/CoffeeMachine";
import ControllerToAppResponse from "../model/AppResponse";
import IObservable from "../IObservable";
import IObserver from "../IObserver";
import MobileAppClient from "../client/MobileAppClient";
import Order from "../model/Order";
import Recipe from "../model/Recipe";
import JSONDBConnector from "../data/JSONDBConnector";

export default class CPS implements IObservable {
	static instance: CPS;

	machines: Map<number, CoffeeMachine> = new Map();
	dbconnector: JSONDBConnector = new JSONDBConnector();

	constructor() {
		this.dbconnector.connect();
		if (CPS.instance) return CPS.instance
		else CPS.instance = this;
	}

	findCoffeeMachine(order: Order): number {
		if (order.drink === "Expresso") return 2;
		if (order.drink === "Americano") return 1;
		return -1;
	}

	processOrder(order: Order): void {
		const machineID = this.findCoffeeMachine(order);
		if (machineID === -1) {
			// Send error
			return
		}
	}

	sendCommand(command: Command, timeout = false): void {
		let res = true;
		try {
			res = CoffeeMachine.getMachine(command.machineID).
				brew(command, timeout);
		} catch (e) {
			throw new Error("Machine could not process request");
		}
		if (!res) throw new Error("Machine did not respond");
	}

	relayOrderAsCommand(order: Order): boolean {
		return false;
	}

	getRecipe(order: Order): Recipe | undefined {
		return this.dbconnector.getValue(order.drink);
	}

	registerMachine(machine: CoffeeMachine): boolean {
		if (this.machines.has(machine.id)) return false;
		this.machines.set(machine.id, machine);
		return true;
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

