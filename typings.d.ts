declare module 'is-valid-domain-extension' {
    function isValidDomainExtension(url?: string | null): Promise<boolean>;
    export = isValidDomainExtension;
}
