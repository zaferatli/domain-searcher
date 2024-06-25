# 🔍 DomainSearcher

**DomainSearcher** is a domain status checker.

<img width="656" alt="Ekran Resmi 2024-06-25 11 58 24" src="https://github.com/zaferatli/domainseacher/assets/54990817/db4bcb24-be71-4b04-811c-e6d9a6e6f60d">

### Motivation

Most of time we need to browser and some shitty hosting firm's domain search page to check availabity domain.
I think its aproxmatically takes 10-15 seconds to check single domain, DomainSearcher package takes 1.5s to query including 15 domain extension.

### Highlights

-   Returns domains status
-   Requires zero config, but configurable when needed
-   Recognises queries and responses
-   Uses WHOIS servers from IANA, if not provided
-   Discover all available TLDs

→ See it in action here https://dmns.app


## Getting Started

#### Installation
```bash

npm i @zaferatli/domainchecker -g
```

#### Usage

From terminal:
```bash

domainSearch google.com --disableCachedWhoisServers=false
```

From JS module:
```js
const domainsearcher = require('@zaferatli/domainchecker')

const domainInfo = domainsearcher.search('google.com')
```

→ [See all examples](https://github.com/zaferatli/domainsearcher/tree/main/examples)

### Domain whois

Get WHOIS info for domains.

`domainsearcher.search(domain, options): Promise<Object<whoisServer>>`

-   `domain` - Domain name, excluding any subdomain. Ex: 'google.com'
-   `options` - Object of options to use, all optional:
    -   `hideLogs` - Hide all console include table log.
    -   `disableCachedWhoisServers` - We cache most used 15 TLDs whoisServer, when set `true` its get from whois.iana.org
    -   `hideSuggestedDomains` - When query domain we add 15 more domain extension to check, when set `true` its get only you queried
    -   `showWhoisQuery` - Return whoisQuery result as well, `responseFields` can  be modified according this result.
    -   `responseFields` - Response could be modified with `"Last update of whois database,status,created,expiry"`
    -   `suggestedDomainArray` - Can be specify auto suggested domain with `com,net,org`



```js
const domainsearcher = require('@zaferatli/domainchecker')

;(async () => {
    const domainName = 'google.com'

    const domainWhois = await domainsearcher.search(domainName)

    console.log(domainWhois)
})()
```

Returns a promise which resolves with an `Object` of WHOIS servers checked:

```js
{
    [
    [
        domainName: 'google.net',
        status: 'Active',
        created: '1999-03-15T05:00:00Z',
        expiry: '2025-03-15T04:00:00Z'
    ],
    [
        domainName: 'google.com',
        status: 'Active',
        created: '1997-09-15T04:00:00Z',
        expiry: '2028-09-14T04:00:00Z'
    ],
    [
        domainName: 'google.app',
        status: 'Active',
        created: '2018-03-29T16:02:13Z',
        expiry: '2025-03-29T16:02:13Z'
    ],
    [
        domainName: 'google.ai',
        status: 'Active',
        created: 'N/A',
        expiry: 'N/A'
    ],
    [
        domainName: 'google.dev',
        status: 'Active',
        created: '2018-06-13T22:30:20Z',
        expiry: '2025-06-13T22:30:20Z'
    ],
    [
        domainName: 'google.org',
        status: 'Active',
        created: '1998-10-21T04:00:00Z',
        expiry: '2024-10-20T04:00:00Z'
    ],
    [
        domainName: 'google.co',
        status: 'Active',
        created: '2010-02-25T01:04:59Z',
        expiry: '2025-02-24T23:59:59Z'
    ],
    [
        domainName: 'google.it',
        status: 'Active',
        created: '1999-12-10 00:00:00',
        expiry: 'N/A'
    ],
    [
        domainName: 'google.us',
        status: 'Active',
        created: '2002-04-19T23:16:01Z',
        expiry: '2025-04-18T23:59:59Z'
    ],
    [
        domainName: 'google.space',
        status: 'Active',
        created: '2015-01-19T11:57:06.0Z',
        expiry: '2025-01-19T23:59:59.0Z'
    ],
    [
        domainName: 'google.me',
        status: 'Active',
        created: '2008-06-13T17:17:40Z',
        expiry: '2025-06-13T17:17:40Z'
    ],
    [
        domainName: 'google.club',
        status: 'Active',
        created: '2014-03-29T15:15:13Z',
        expiry: '2025-03-28T23:59:59Z'
    ],
    [
        domainName: 'google.biz',
        status: 'Active',
        created: '2002-03-27T16:03:44Z',
        expiry: '2025-03-26T23:59:59Z'
    ],
    [
        domainName: 'google.info',
        status: 'Active',
        created: '2001-07-31T23:57:50Z',
        expiry: '2024-07-31T23:57:50Z'
    ],
    [
        domainName: 'google.pro',
        status: 'Active',
        created: '2008-07-22T00:00:00Z',
        expiry: '2024-09-08T00:00:00Z'
    ]
    ]

    /*
    in console.log:

    ┌─────────┬────────────────┬──────────┬──────────────────────────┬──────────────────────────┐
    │ (index) │   domainName   │  status  │         created          │          expiry          │
    ├─────────┼────────────────┼──────────┼──────────────────────────┼──────────────────────────┤
    │    0    │  'google.net'  │ 'Active' │  '1999-03-15T05:00:00Z'  │  '2025-03-15T04:00:00Z'  │
    │    1    │  'google.com'  │ 'Active' │  '1997-09-15T04:00:00Z'  │  '2028-09-14T04:00:00Z'  │
    │    2    │  'google.app'  │ 'Active' │  '2018-03-29T16:02:13Z'  │  '2025-03-29T16:02:13Z'  │
    │    3    │  'google.ai'   │ 'Active' │          'N/A'           │          'N/A'           │
    │    4    │  'google.dev'  │ 'Active' │  '2018-06-13T22:30:20Z'  │  '2025-06-13T22:30:20Z'  │
    │    5    │  'google.org'  │ 'Active' │  '1998-10-21T04:00:00Z'  │  '2024-10-20T04:00:00Z'  │
    │    6    │  'google.co'   │ 'Active' │  '2010-02-25T01:04:59Z'  │  '2025-02-24T23:59:59Z'  │
    │    7    │  'google.it'   │ 'Active' │  '1999-12-10 00:00:00'   │          'N/A'           │
    │    8    │  'google.us'   │ 'Active' │  '2002-04-19T23:16:01Z'  │  '2025-04-18T23:59:59Z'  │
    │    9    │ 'google.space' │ 'Active' │ '2015-01-19T11:57:06.0Z' │ '2025-01-19T23:59:59.0Z' │
    │   10    │  'google.me'   │ 'Active' │  '2008-06-13T17:17:40Z'  │  '2025-06-13T17:17:40Z'  │
    │   11    │ 'google.club'  │ 'Active' │  '2014-03-29T15:15:13Z'  │  '2025-03-28T23:59:59Z'  │
    │   12    │  'google.biz'  │ 'Active' │  '2002-03-27T16:03:44Z'  │  '2025-03-26T23:59:59Z'  │
    │   13    │ 'google.info'  │ 'Active' │  '2001-07-31T23:57:50Z'  │  '2024-07-31T23:57:50Z'  │
    │   14    │  'google.pro'  │ 'Active' │  '2008-07-22T00:00:00Z'  │  '2024-09-08T00:00:00Z'  │
    └─────────┴────────────────┴──────────┴──────────────────────────┴──────────────────────────┘
    Domains searched in: 1.521s

    */
}
```

## Disclaimer

This may not work correctly because i coded :/

## Thanks to Whoiser

I inspired and forked from https://github.com/LayeredStudio/whoiser

## Unsupported TLDs

-   `.ch` - WHOIS server for .ch doesn't return WHOIS info, works only in browser https://www.nic.ch/whois/. This library can be used only to check .ch domain availability, example here https://runkit.com/andreiigna/5efdeaa8e4f2d8001a00312d

## More

Please report any issues here on GitHub.
[Any contributions are welcome](CONTRIBUTING.md)

## License

[MIT](LICENSE)

Copyright (c) ATLI, ZAFER

