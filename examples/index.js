const domainsearcher = require("../index.js");

(async () => {
  const domainName = "google.com";

  const domainWhois = await domainsearcher.search(domainName);

  console.log(domainWhois);
})();

/* Result for domainName = 'google.com'

in console:

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



in const domainWhois variable:

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
*/
