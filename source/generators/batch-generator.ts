const HIGH_WATER_MARK = 10000;

/**
 * Generator function
 *
 * @param count - Number of iterations
 * @param fn - Factory function
 */
export function* batchGenerator(count: number, fn: () => string) {
	console.log('Count :: ', count);
	let buffer = '';

	for (let counter = 1; counter <= count; counter++) {
		buffer = buffer + fn();

		if (counter % HIGH_WATER_MARK === 0) {
			yield buffer;
			buffer = '';
		}
	}

	yield buffer;
}
