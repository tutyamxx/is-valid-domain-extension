/**
 *  is-valid-domain-extension - Check if the URL has a legit and a valid domain extension! Supports all extensions even with punny codes!
 *  @version: v1.0.3
 *  @link: https://github.com/tutyamxx/custom-url-check
 *  @license: MIT
 **/

const axios = require("axios");
const ExtractDomain = require("extract-domain");
const PunnyCode = require("punycode");

module.exports = async (url) =>
{
    if(url.length <= 0 || !url || typeof url !== "string")
    {
        return false;
    }

    const WorldWideWebPattern = /^(?:https?:\/\/)?(?:www\.)?/;

    if(!WorldWideWebPattern.test(url))
    {
        return false;
    }

    try
    {
        const FetchResponse = await axios.get("https://data.iana.org/TLD/tlds-alpha-by-domain.txt");
        const FetchDomainExtensions = await FetchResponse.data.trim().split("\n").slice(1);

        const TrimmedURL = url.trim();
        const GetExtensionFromURL = ExtractDomain(TrimmedURL).split(".").pop().toLowerCase();
        
        let ArrayOfExtensions = FetchDomainExtensions.map(extension => extension.toLowerCase());
        let FormattedExtension = "";

        try
        {
            PunnyCode.decode(GetExtensionFromURL);
            FormattedExtension = GetExtensionFromURL;
        }

        catch(error)
        {
            FormattedExtension = "xn--" + PunnyCode.encode(GetExtensionFromURL).toString();
        }
       
        if(ArrayOfExtensions.includes(FormattedExtension))
        {
            return true;
        }

        else
        {
            return false;
        }
    } 
    
    catch(error)
    {
        throw error.message;
    }
};