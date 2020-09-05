const isValidDomainExtension = require("../index.js");

const ValidLegitimateDomainExtensions =
[
    "www.exampleurl.香港",
    "http://exampleurl.みんな",
    "http://exampleurl.العليان",
    "www.exampleurl.wolterskluwer"
];

const InvalidDomainExtensions =
[
    "https://exampleurl.comdasdsadasdsadasdsa",
    "http://exampleurl.comxxxxxx",
    "http://exampleurl"
];

const InvalidURL = ["", "htt://www.google.co.uk", "htts//google.com", "google.com" ];

test("Check for valid domain extensions", () =>
{
    ValidLegitimateDomainExtensions.forEach(async (url) =>
    {
        expect(await isValidDomainExtension(url)).toBe(true);
    });
});

test("Check fo invalid domain extensions", () =>
{
    InvalidDomainExtensions.forEach(async (url) =>
    {
        expect(await isValidDomainExtension(url)).toBe(false);
    });
});

test("Check for invalid URL formats", () =>
{
    InvalidURL.forEach(async (url) =>
    {
        expect(await isValidDomainExtension(url)).toBe(false);
    });
});