export function assertsFormatFlag(format: string): asserts format {
	const allowedFormats = ['ndjson', 'csv'];

	if (allowedFormats.indexOf(format) === -1) {
		throw Error(`Unsupported format \`${format}\``)
	}
}
