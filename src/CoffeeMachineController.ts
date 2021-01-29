import Command from "./Command";
import IObservable from "./IObservable";
import IObserver from "./IObserver";
import Order from "./Order";

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

