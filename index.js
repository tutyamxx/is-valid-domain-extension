/**
 *  is-valid-domain-extension - Check if the URL has a legit and a valid domain extension! Supports all extensions even with punny codes!
 *  @version: v1.2.0
 *  @link: https://github.com/tutyamxx/is-valid-domain-extension
 *  @license: MIT
 **/

import axios from 'axios';
import extractDomain from 'extract-domain';
import punnyCode from 'punycode/';

export default async function isValidDomainExtension(url) {
    if (!url || typeof url !== 'string') return false;

    const worldWideWebPattern = /^(?:https?:\/\/)?(?:www\.)?/;
    if (!worldWideWebPattern.test(url)) return false;

    try {
        const fetchDomainExtensions = await axios.get('https://data.iana.org/TLD/tlds-alpha-by-domain.txt')
            .then((response) => response?.data?.trim()?.split('\n')?.slice(1) || []);

        const trimmedUrl = url?.trim();
        const getExtensionFromUrl = extractDomain(trimmedUrl)?.split('.')?.pop()?.toLowerCase();

        let formattedExtension = '';
        try {
            punnyCode.decode(getExtensionFromUrl);
            formattedExtension = getExtensionFromUrl;
        } catch (error) {
            formattedExtension = `xn--${punnyCode.encode(getExtensionFromUrl)?.toString()}`;
        }

        if (fetchDomainExtensions.map(ext => ext.toLowerCase()).includes(formattedExtension)) return true;
        return false;
    } catch (error) {
        throw error.message;
    }
}
