const { filterCountries, countAnimalsAndPeople } = require('./app.js');

describe('app suite tests', () => {

    describe('filter command option', () => {
        it('should remove animals that doesnt match the animal pattern', () => {
            const countries = [{
                name: 'Country One',
                people:
                  [{
                    name: 'John',
                    animals:
                      [
                        { name: 'Dodo' },
                        { name: 'Dog' }
                      ]
                  }]
              }]

              const fileredCountries = filterCountries(countries, 'Dodo');

              expect(fileredCountries).toMatchObject([{
                name: 'Country One',
                people:
                  [{
                    name: 'John',
                    animals:
                      [{ name: 'Dodo' }]
                  }]
              }]);
        });

        it('should remove peoples that doesnt own an animal with the animal pattern', () => {
            const countries = [{
                name: 'Country One',
                people:
                  [{
                    name: 'John',
                    animals:
                      [
                        { name: 'Dodo' },
                      ]
                  },
                  {
                    name: 'Toto',
                    animals:
                      [{ name: 'Cat' }]
                  }]
              }];

              const fileredCountries = filterCountries(countries, 'Dodo');

              expect(fileredCountries).toMatchObject([{
                name: 'Country One',
                people:
                  [{
                    name: 'John',
                    animals:
                      [{ name: 'Dodo' }]
                  }]
              }]);
        });

        it('should remove countries that doesnt contain an animal with the animal pattern', () => {
            const countries = [{
                name: 'Country One',
                people:
                  [{
                    name: 'John',
                    animals:
                      [
                        { name: 'Dodo' },
                      ]
                  }]
              },
              {
                name: 'Country Two',
                people:
                  [{
                    name: 'Serge',
                    animals:
                      [{ name: 'Llama' }]
                  }]
              }];

              const fileredCountries = filterCountries(countries, 'Dodo');

              expect(fileredCountries).toMatchObject([{
                name: 'Country One',
                people:
                  [{
                    name: 'John',
                    animals:
                      [{ name: 'Dodo' }]
                  }]
              }]);
        });
    });

    describe('count command option', () => {
        it('should append animal count to the people name', () => {
            const countries = [{
                name: 'Country One',
                people:
                  [{
                    name: 'John',
                    animals:
                      [
                        { name: 'Dodo' },
                        { name: 'Dog' }
                      ]
                  }]
              }];

              const result = countAnimalsAndPeople(countries);

              expect(result).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    people: expect.arrayContaining([
                        expect.objectContaining({
                            name: 'John [2]'
                        })
                    ])
                   })
              ]))
        });

        it('should append people count to the country name', () => {
            const countries = [{
                name: 'Country One',
                people:
                  [
                    { name: 'John', animals: [] },
                    { name: 'Gaston', animals: []  }
                ]
              }];

              const result = countAnimalsAndPeople(countries);

              expect(result).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    name: 'Country One [2]'
                })
              ]))
        })
    });

})