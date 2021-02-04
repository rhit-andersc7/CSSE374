import Command from "../model/Command";
import IObserver from "../IObserver";
import Order from "../model/Order";

export default class CoffeeMachineController implements IObserver {
	update(): void {

	}

	acceptCommand(command: Command): boolean {
		return false;
	}

	sendOrderToCoffeeMachine(order: Order): boolean {
		return false;
	}

	sendResponseToCPS(): boolean {
		return false;
	}
}

