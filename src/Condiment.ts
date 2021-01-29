type Condiment = {
	name: string,
	quantity: number
};

export function parseCondiment(raw: Any) {
	if (raw === undefined) return undefined;
	return {
		name: raw["Name"],
		quantity: raw["qty"]
	}
}

export default Condiment

