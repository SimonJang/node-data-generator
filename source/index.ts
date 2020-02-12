import * as path from 'path';
import * as meow from 'meow';
import {Flag, Command, DataGenerator} from './entities';
import {generators} from './generators';
import { assertsFormatFlag } from './utils';

const cli = meow(
	`
	Usage:
		$ generate <command> <options>

	Commands:
		user		Generate generic users


	Options:
		--count		Number of records that need to be generated. Default: 1
		--key 		Path to write the data. Default: cwd/data.json
		--gzip 		Indicate if the file needs to be gzipped. Default: false
	`,
	{
		flags: {
			key: {
				type: 'string',
				default: path.join(__dirname, 'data.json')
			},
			gzip: {
				type: 'boolean',
				default: false
			},
			count: {
				type: 'string',
				default: '1'
			},
			format: {
				type: 'string',
				default: 'ndjson'
			}
		}
	}
);

const [command] = cli.input;
const options = cli.flags as Flag;

const dataGenerators = new Map<Command, DataGenerator>([
	['user', generators.user]
]);

const run = async (cmd: Command, opts: Flag) => {
	const generator = dataGenerators.get(cmd);

	assertsFormatFlag(opts.format);

	if (!generator) {
		throw new Error('Unknown command');
	}

	return generator(opts);
};

const execute = async (cmd: string, opts: Flag): Promise<void> => {
	await run(cmd as Command, opts);
};

(async () => { // tslint:disable-line:no-floating-promises
	await execute(command, options);
})();
