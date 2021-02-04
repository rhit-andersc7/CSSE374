import Command from "../model/Command";

export default class CoffeeMachine {
	private static machines: CoffeeMachine[] = [];

	public id: number;

	constructor() {
		this.id = CoffeeMachine.machines.push(this);
	}

	serve(): void {

	}

	brew(command: Command): void {

	}

	public static getMachine(id: number): CoffeeMachine {
		return CoffeeMachine.machines[id];
	}
}

