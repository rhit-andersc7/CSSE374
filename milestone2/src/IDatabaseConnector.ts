export default interface IDatabaseConnector {
	connect(): void;
	getValue(key: string): any;
}

