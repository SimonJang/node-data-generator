import * as fs from 'fs';
import * as zlib from 'zlib';
import * as faker from 'faker';
import * as pokemon from 'pokemon';
import * as moment from 'moment-timezone';
import {DataGenerator} from '../entities';
import {batchGenerator} from './batch-generator';

/**
 * Generate user data
 *
 * @param options - Generator options
 */
export const generate: DataGenerator = async ({key, count, gzip}) => {
	console.log('Running data generator for `user` command');

	let stream: any;

	if (gzip) {
		stream = zlib.createGzip();
		stream.pipe(fs.createWriteStream(`${key}.gz`));
	} else {
		stream = fs.createWriteStream(key, {flags: 'a'});
	}

	const createUser = () => {
		const user = {
			firstName: faker.name.firstName(),
			id: faker.random.uuid().split('-').join(''),
			name: faker.name.lastName(),
			age: faker.random.number({min: 18, max: 65}),
			lastLogin: moment(faker.date.recent(faker.random.number({min: 0, max: 365}))).format('YYYY-MM-DD hh:mm:ss'),
			favoritePokemon: pokemon.all('en')[faker.random.number({min: 0, max: pokemon.all('en').length - 1})]
		};

		return JSON.stringify(user) + '\n';
	};

	for (const data of batchGenerator(parseInt(count, 10), createUser)) {
		console.log('Writing data at ' + new Date().toISOString());

		stream.write(data);
	}

	stream.end();

	return Promise.resolve();
};
