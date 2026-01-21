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
 * ```ts
 * import isValidDomainExtension from 'is-valid-domain-extension';
 *
 * const isValid = await isValidDomainExtension('https://пример.рф');
 * ```
 */
declare function isValidDomainExtension(url?: string | null): Promise<boolean>;

export default isValidDomainExtension;
