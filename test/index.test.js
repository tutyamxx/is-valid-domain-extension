import isValidDomainExtension from '../index.js';

const validLegitimateDomainExtensions = [
    'www.example.com',                 // --| ASCII
    'http://example.org',              // --| ASCII
    'http://example.中国',             // --| Unicode
    'https://example.みんな'           // --| Unicode
];

const invalidDomainExtensions = [
    'https://example.comdasdsadasdsadasdsa',  // --| Invalid TLD
    'http://example.comxxxxxx',               // --| Invalid TLD
    'http://example',                         // --| No TLD
    'http://example.wolterskluwer'            // --| Not an actual IANA TLD
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
