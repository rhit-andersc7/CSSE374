import Command from "../model/Command";
import Condiment from "../model/Condiment";

export default class CoffeeMachine {
	private static machines: CoffeeMachine[] = [];

	public id: number;
	public unadded: Set<Condiment>;

	constructor() {
		this.id = CoffeeMachine.machines.push(this);
		this.unadded = new Set();
	}

	serve(): void {

	}

	brew(command: Command, timeout = false): boolean {
		if (timeout) return false;
		if (!["Expresso", "Americano"].includes(command.drink)) {
			throw new Error("Unable to brew drink");
		}

		for (let condiment of command.options) {
			this.unadded.add(condiment);
		}

		return true;
	}

	getUnadded(): string {
		let condiments: string[] = [];
		for (let condiment of this.unadded) {
			condiments.push(condiment.name + ": " + condiment.quantity);
		}

		return condiments.join(", ");
	}

	public static getMachine(id: number): CoffeeMachine {
		return CoffeeMachine.machines[id];
	}
}

