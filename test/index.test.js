import isValidDomainExtension from '../index.js';

const validLegitimateDomainExtensions = [
    'www.example.com',                 // --| ASCII
    'http://example.org',              // --| ASCII
    'http://example.中国',             // --| Unicode
    'https://example.みんな',          // --| Unicode
    'https://example.xn--fiqs8s',      // --| Punycode
    'https://example.COM',             // --| Uppercase TLD
    '  https://example.com  '          // --| Surrounding whitespace
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
    expect(await isValidDomainExtension(null)).toBe(false);
});

test('Should return false if url param is not a string', async () => {
    expect(await isValidDomainExtension(123)).toBe(false);
    expect(await isValidDomainExtension({})).toBe(false);
    expect(await isValidDomainExtension(['example.com'])).toBe(false);
});

test('Should handle concurrent calls', async () => {
    const results = await Promise.all([
        isValidDomainExtension('https://example.com'),
        isValidDomainExtension('https://example.org'),
        isValidDomainExtension('https://example.invalidtld')
    ]);

    expect(results).toEqual([true, true, false]);
});
