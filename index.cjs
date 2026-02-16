/**
 *  is-valid-domain-extension - Check if the URL has a legit and a valid domain extension! Supports all extensions even with punny codes!
 *  @version: v1.2.7
 *  @link: https://github.com/tutyamxx/is-valid-domain-extension
 *  @license: MIT
 **/

const axios = require('axios').default;
const punyCode = require('punycode/');

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
module.exports = async function isValidDomainExtension(url) {
    if (!url || typeof url !== 'string') return false;

    // --| Lazy load the esm
    const { default: extractDomain } = await import('extract-domain');

    const domain = extractDomain(url?.trim() ?? '');

    if (!domain) return false;

    const extension = domain?.split('.')?.pop()?.toLowerCase() ?? '';

    // --| Fetch IANA TLDs
    const fetchDomainExtensions = await axios.get('https://data.iana.org/TLD/tlds-alpha-by-domain.txt')
        .then(res => res?.data?.trim()?.split('\n')?.slice(1) ?? []);

    const extensions = fetchDomainExtensions?.map(e => e?.toLowerCase() ?? '') ?? [];

    let formatted;

    try {
        // --| Convert Unicode TLDs to ASCII punycode
        formatted = punyCode?.toASCII(extension ?? '');
    } catch {
        formatted = extension ?? '';
    }

    return extensions?.includes(formatted ?? '') ?? false;
};
