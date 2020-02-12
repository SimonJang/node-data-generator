import * as faker from 'faker';
import * as moment from 'moment-timezone';
import * as pokemon from 'pokemon';

interface User {
	firstName: string;
	id: string;
	name: string;
	age: number;
	lastLogin: string;
	favoritePokemon: string;
}

const createUser = (): User => ({
	firstName: faker.name.firstName(),
	id: faker.random
		.uuid()
		.split('-')
		.join(''),
	name: faker.name.lastName(),
	age: faker.random.number({ min: 18, max: 65 }),
	lastLogin: moment(faker.date.recent(faker.random.number({ min: 0, max: 365 }))).format('YYYY-MM-DD hh:mm:ss'),
	favoritePokemon: pokemon.all('en')[faker.random.number({ min: 0, max: pokemon.all('en').length - 1 })]
});

export const createUserNDJSON = () => {
	const user = createUser();

	return JSON.stringify(user) + '\n';
};

export const createUserCSVHeader = () =>  {
	const headers = ['id', 'firstName', 'name', 'age', 'lastLogin', 'favoritePokemon'];

	return `${headers.map(key => key.toString()).join(';')}\n`
}

export const createUserCSV = () => {
	const {id, firstName, name, age, lastLogin, favoritePokemon} = createUser();

	return `${id};${firstName};${name};${age};${lastLogin};${favoritePokemon}\n`
};
