# Data generator

Data generator to generate random data.


## How to use?

1. Execute the generator command

Run `npm run generate <command> <options>`

2. Explore your data

The data is in [NDJSON](http://ndjson.org/) format.


## List of commands

#### `user`

Will generate user objects with the following schema:

```javascript
interface User {
	firstName: string;
	id: string;
	name: string;
	age: number;
	favoritePokemon: string;
	lastLogin: string
}
```

### List of options

#### `key`

File path, location of where the data will be stored.

#### `gzip`

The data is compressed in a gzip file. `gzip` option is **mutually exclusive with `snappy`**

#### `snappy`

The data is compressed in a snappy file. `snappy` option is **mutually exclusive with `gzip`**

#### `count`

Number of records that will be generated.


## Example

`npm run generate user --count 100000`

The above command will generate a NDJSON file `data.json` with 100k users in the `dist` folder  of this project.

### Use the `--help` command when stuck

Run `npm run generate --help`


## TODO

- Add more examples
- Add more documentation
- Add template support
- Add AWS/Azure/GCP upload functionality
- Support multiple formats (CSV, Parquet)
- Add different types of compression (Snappy)
