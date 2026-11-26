/**
 *  is-valid-domain-extension - 🌐 Check if the URL has a legit and a valid domain extension! Supports all extensions even with punny codes!
 *  @version: v1.3.5
 *  @link: https://github.com/tutyamxx/is-valid-domain-extension
 *  @license: MIT
 **/


const axios = require('axios').default;
const punyCode = require('punycode/');

const IANA_TLD_LIST_URL = 'https://data.iana.org/TLD/tlds-alpha-by-domain.txt';
const TLD_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

let cachedTlds;
let cacheExpiresAt = 0;
let pendingTldRequest;

/**
 * Fetches and caches the IANA top-level-domain list.
 *
 * @returns {Promise<Set<string>>} A set of lowercase TLDs.
 */
const getTlds = async () => {
    if (cachedTlds && Date.now() < cacheExpiresAt) {
        return cachedTlds;
    }

    if (pendingTldRequest) {
        return pendingTldRequest;
    }

    try {
        pendingTldRequest = axios.get(IANA_TLD_LIST_URL).then(({ data }) => new Set(data
            .split(/\r?\n/).filter(line => line && !line.startsWith('#'))
            .map(line => line.toLowerCase()))
        );

        const tlds = await pendingTldRequest;

        cachedTlds = tlds;
        cacheExpiresAt = Date.now() + TLD_CACHE_TTL_MS;
        return tlds;
    } catch {
        return new Set();
    } finally {
        pendingTldRequest = undefined;
    }
};

/**
 * Checks whether a URL has a valid and legitimate domain extension (TLD).
 *
 * - Supports all IANA-registered TLDs
 * - Handles internationalized domains (IDN / punycode)
 * - Accepts URLs with or without protocol
 *
 * @param {string | null | undefined} url - The URL string to validate
 * @returns {Promise<boolean>} Resolves to `true` if the domain extension is valid, otherwise `false`
 *
 * @example
 * ```js
 *  //--| Using CommonJS
 * const isValidDomainExtension = require('is-valid-domain-extension');
 * const isValid = await isValidDomainExtension('https://пример.рф');
 * ```
 *
 * @example
 * ```js
 *  // --| Using ESM
 * import isValidDomainExtension from 'is-valid-domain-extension';
 * const isValid = await isValidDomainExtension('https://example.com');
 * ```
 */
module.exports = async url => {
    if (!url || typeof url !== 'string') {
        return false;
    }

    // --| Lazy load the esm
    const { default: extractDomain } = await import('extract-domain');

    const domain = extractDomain(url.trim());

    if (!domain) {
        return false;
    }

    const extension = domain.split('.').pop().toLowerCase();

    let asciiExtension;

    try {
        // --| Convert Unicode TLDs to ASCII punycode
        asciiExtension = punyCode.toASCII(extension);
    } catch {
        return false;
    }

    try {
        const tlds = await getTlds();
        return tlds.has(asciiExtension);
    } catch {
        return false;
    }
};
