import isValidDomainExtension from '../index.js';

const validLegitimateDomainExtensions = [
    'www.exampleurl.香港',
    'http://exampleurl.みんな',
    'http://exampleurl.العليان',
    'www.exampleurl.wolterskluwer'
];

const invalidDomainExtensions = [
    'https://exampleurl.comdasdsadasdsadasdsa',
    'http://exampleurl.comxxxxxx',
    'http://exampleurl'
];

test('Check for valid domain extensions', async () => {
    for (const urlElement of validLegitimateDomainExtensions) {
        expect(await isValidDomainExtension(urlElement)).toBe(true);
    }
});

test('Check for invalid domain extensions', async () => {
    for (const urlElement of invalidDomainExtensions) {
        expect(await isValidDomainExtension(urlElement)).toBe(false);
    }
});

test('Should return false if url param is not specified or empty', async () => {
    expect(await isValidDomainExtension()).toBe(false);
    expect(await isValidDomainExtension('')).toBe(false);
});
