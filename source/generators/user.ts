import * as fs from 'fs';
import * as zlib from 'zlib';
import { DataGenerator, Format } from '../entities';
import { batchGenerator } from './batch-generator';
import { createUserNDJSON, createUserCSV, createUserCSVHeader } from './data-generators';

const generators = {
	ndjson: createUserNDJSON,
	csv: createUserCSV
}

/**
 * Generate user data
 *
 * @param options - Generator options
 */
export const generate: DataGenerator = async ({ key, count, gzip, format }) => {
	console.log('Running data generator for `user` command');

	let stream: any;

	if (gzip) {
		stream = zlib.createGzip();
		stream.pipe(fs.createWriteStream(`${key}.gz`));
	} else {
		stream = fs.createWriteStream(key, { flags: 'w'});
	}

	if (format === Format.csv) {
		stream.write(createUserCSVHeader())
	}

	for (const data of batchGenerator(parseInt(count, 10), generators[format])) {
		console.log('Writing data at ' + new Date().toISOString());

		stream.write(data);
	}

	stream.end();

	return Promise.resolve();
};
