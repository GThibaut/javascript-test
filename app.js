const args = process.argv;

const { data } = require('./data.js');


if (args.some(arg => arg.startsWith('--filter='))) {
    const animalPatternValue = args.find(arg => arg.startsWith('--filter=')).substring(9);
    prettyPrintJSON(filterCountries(data, animalPatternValue))
} else if (args.some(arg => arg.startsWith('--count'))) {
    prettyPrintJSON(countAnimalsAndPeople(data))
}

function countAnimalsAndPeople(countries) {
    return countries.map(country => ({
        ...country,
        name: `${country.name} [${country.people.length}]`,
        people: country.people.map(people => ({
            ...people,
            name: `${people.name} [${people.animals.length}]`,
        }))
    }));
}

function filterCountries(countries, animalPatternValue) {
    return getCountryWithMatchingAnimal(countries, animalPatternValue).map(country => ({
        ...country,
        people: getPeopleContainingMatchingAnimal(country.people, animalPatternValue).map(people => ({
            ...people,
            animals: people.animals.filter(animal => animal.name.includes(animalPatternValue))
        }))
    }));
}

function getCountryWithMatchingAnimal (countries, animalPatternValue) {
    return countries.filter(country => country.people.some(people => people.animals.some(animal => animal.name.includes(animalPatternValue))));
}

function getPeopleContainingMatchingAnimal (peoples, animalPatternValue) {
    return peoples.filter(people => people.animals.some(animal => animal.name.includes(animalPatternValue)));
}

function prettyPrintJSON (data) {
    console.log(JSON.stringify(data, null, 2))
}

module.exports = {
    filterCountries,
    countAnimalsAndPeople
}