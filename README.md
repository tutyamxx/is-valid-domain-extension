# is-valid-domain-extension

<p align="center">🍩</p>

<p align="center"><a href="https://nodei.co/npm/is-valid-domain-extension/"><img src="https://nodei.co/npm/is-valid-domain-extension.png"></a></p>

 * NPM package that allows you to check if the URL has a legit and a valid domain extension!
 * Supports all of the domain extensions available over the world!
 * Supports all domain extensions even with punny codes such as: `.சிங்கப்பூர்`, `.онлайн`, `.كاثوليك`, `.新加坡`, `.ভারত`, `.భారత్` and so on (yes, they are legit domain extensions)
 * Package automatically checks for the latest list of domain extensions from [Internet Assigned Numbers Authority](https://www.iana.org/)
 * See examples below

# Install [NPM](https://www.npmjs.com/package/is-valid-domain-extension)

 `$ npm i is-valid-domain-extension`

# Usage

- Returns a Boolean indicating whether `string` is a legit and a valid domain extension
- It will return `false` if the `string` is empty or if it desn't start with `http://`, `https://` or `www.`

# Examples

``` javascript
const isValidDomainExtension = require('is-valid-domain-extension');

(async () => {
    // --| Returns: true
    // --| Returns true as valid and legit the following examples
    if (await isValidDomainExtension('www.exampleurl.香港')) {
        console.log('This a legit and a valid domain extension! 🍩');
    }

    if (await isValidDomainExtension('http://exampleurl.みんな')); {
        console.log('This a legit and a valid domain extension! 🍩');
    }

    // --| Returns: false
    // --| The following examples return false as not they are not valid url's or domain extensions
    if (!await isValidDomainExtension('https://exampleurl.comdasdsadasdsadasdsa')) {
        console.log('This is not a valid domain extension! 😔');
    }

    if (!await isValidDomainExtension('http://exampleurl.comxxxxxx')) {
        console.log('This is not a valid domain extension! 😔');
    }
})();
```

<p align="center">🍩</p>
