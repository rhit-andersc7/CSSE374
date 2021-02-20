import IBrewBehaviour from "../IBrewBehaviour";
import IDatabaseConnector from "../IDatabaseConnector";

export default class JSONDBConnector implements IDatabaseConnector {
	recipes: Map<string, IBrewBehaviour> = new Map();

	addRecipe(key: string, behavior: IBrewBehaviour): void {
		this.recipes.set(key, behavior);
	}

	connect(): void {

	}

	getValue(key: string): IBrewBehaviour | undefined {
		return this.recipes.get(key);
	}
}

