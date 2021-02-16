import IDatabaseConnector from "../IDatabaseConnector";

export default class JSONDBConnector implements IDatabaseConnector {
	connect(): void {

	}

	getValue(key: string): any {
		if (!["Expresso", "Americano"].includes(key)) return;
		return { instructions: [`Brew ${key}`] };;
	}
}

