import {Flag} from './flag';

export type DataGenerator = (opts: Flag) => Promise<void>;
