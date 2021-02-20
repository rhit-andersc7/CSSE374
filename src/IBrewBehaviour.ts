import CoffeeMachine from "./client/CoffeeMachine";

export default interface IBrewBehaviour {
	brew(machine: CoffeeMachine): void;
	getName(): string;
}

