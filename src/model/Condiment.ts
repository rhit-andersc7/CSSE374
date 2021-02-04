type Condiment = {
	name: string,
	quantity: number
};

export function parseCondiment(raw: any) {
	if (raw === undefined) return undefined;
	return {
		name: raw["Name"] || raw["name"],
		quantity: raw["qty"]
	}
}

export function parseCondiments(raw: any) {
	if (raw === undefined) return undefined;
	return raw.map(parseCondiment);
}

export default Condiment

