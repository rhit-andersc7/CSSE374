import CoffeeMachine from "./client/CoffeeMachine";

/*
 * Strategy pattern was used in the coffee machine. There is an IBrewBehaviour
 * interface that CoffeeMachines implement\nand this interface has concrete
 * BrewBehaviours.
 */

export default interface IBrewBehaviour {
	brew(machine: CoffeeMachine): void;
	getName(): string;
}

