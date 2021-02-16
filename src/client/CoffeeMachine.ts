import Command from "../model/Command";

export default class CoffeeMachine {
	private static machines: CoffeeMachine[] = [];

	public id: number;

	constructor() {
		this.id = CoffeeMachine.machines.push(this);
	}

	serve(): void {

	}

	brew(command: Command, timeout = false): boolean {
		if (timeout) return false;
		if (!["Expresso", "Americano"].includes(command.drink)) {
			throw new Error("Unable to brew drink");
		}
		return true;
	}

	public static getMachine(id: number): CoffeeMachine {
		return CoffeeMachine.machines[id];
	}
}

