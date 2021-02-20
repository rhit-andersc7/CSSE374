import Command, { commandFromOrder } from "../model/Command";
import CoffeeMachine from "../client/CoffeeMachine";
import AppResponse from "../model/AppResponse";
import IObservable from "../IObservable";
import IObserver from "../IObserver";
import MobileAppClient from "../client/MobileAppClient";
import Order from "../model/Order";
import Recipe from "../model/Recipe";
import JSONDBConnector from "../data/JSONDBConnector";

export default class CPS implements IObservable {
	static instance: CPS;

	machines: Map<number, CoffeeMachine> = new Map();
	responses: Map<IObserver, AppResponse | undefined> = new Map();
	dbconnector: JSONDBConnector = new JSONDBConnector();

	constructor() {
		this.dbconnector.connect();
		if (CPS.instance) return CPS.instance
		else CPS.instance = this;
	}

	findCoffeeMachine(order: Order): number {
		const street = order.address.street;
		const zip = order.address.zip;
		if (street == "5500 Wabash Ave" && zip == "47803") return 1;
		if (street == "7745 East Edgewood" && zip == "46239") return 2;
		return -1;
	}

	processOrder(client: MobileAppClient, order: Order, timeout = false): void {
		const machineID = this.findCoffeeMachine(order);
		const response: AppResponse = {
				orderID: order.id,
				machineID: machineID,
				status: 2,
				message: "An error has occured.",
				error: ""
		}
		if (machineID === -1) {
			response.error = "No suitable machine can be found.";
			this.sendResponse(client, response);
			return;
		}
		let recipe = this.getRecipe(order);
		if (!recipe) {
			response.error = "No known recipe can be found.";
			this.sendResponse(client, response);
			return;
		}
		try {
			this.sendCommand(commandFromOrder(order, machineID), timeout);
		} catch (e) {
			if (e.message == "Machine could not process request") {
				response.error = "Coffee machine could not complete order.";
				this.sendResponse(client, response);
			} else if (e.message == "Machine did not respond") {
				response.error = "No response from coffee machine.";
				this.sendResponse(client, response);
				return;
			}
			return;
		}
		response.status = 0;
		response.message = "Order placed successfully.";
		this.sendResponse(client, response);
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

	getRecipe(order: Order): Recipe | undefined {
		return this.dbconnector.getValue(order.drink);
	}

	registerMachine(machine: CoffeeMachine): boolean {
		if (this.machines.has(machine.id)) return false;
		this.machines.set(machine.id, machine);
		return true;
	}

	sendResponse(appClient: MobileAppClient, response: AppResponse): void {
		this.responses.set(appClient, response);
		appClient.update();
	}

	add(observer: IObserver): void {
		this.responses.set(observer, undefined);
	}

	remove(observer: IObserver): void {
		this.responses.delete(observer);
	}

	notify(): void {

	}
}

