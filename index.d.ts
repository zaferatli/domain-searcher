declare module "domain-search" {
  export interface Options {
    /**
     * Domain name to query.
     */
    domain: string;

    /**
     * Hide to console.table and others console logs.
     *
     * @default: false
     */
    hideLogs?: boolean;

    /**
     * We added statically most used 15 domain's Whois server url, if you enable then its query for every TLD to whois.iana.org.
     *
     * @default: false
     */
    disableCachedWhoisServers?: boolean;

    /**
     * When query to domain its add most used 9 domain more, when you want solely your domain enable this.
     *
     * @default: false
     */
    hideSuggestedDomains?: boolean;

    /**
     * We parse 6 field as a response of query, when you want to see all response query enable this. (When enable probably break to table lines because so long)
     *
     * @default false
     */
    showWhoisQuery?: boolean;

    /**
     * We query 15 more domain (com, net, app, dev etc.) when you want change this you can use like --suggestedDomainArray=org,club
     *
     * @default undefined
     */
    suggestedDomainArray?: string;

    /**
     * We show 4 field from whois query, when you want to change you can use this like --responseFields="Last update of whois database,status"
     *
     * @default undefined
     */
    responseFields?: string;
  }

  export type OptionsType = Options;

  export interface WhoisSearchResult {
    [key: string]: string | Array<string> | WhoisSearchResult;
  }

  /**
   * Tries to guess query type and get WHOIS data
   *
   * @param {string} domain
   * @param {OptionsType} options
   * @returns {Promise<WhoisSearchResult>} Parsed WHOIS server response
   */
  export function domainsearch(
    domain: string,
    options?: OptionsType
  ): Promise<WhoisSearchResult>;

  export default domainsearch;
}
