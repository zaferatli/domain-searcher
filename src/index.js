const { parse } = require('./utils/getParameters.js')
const { search } = require('./domainSearch.js')

const parameters = ['domain', 'showWhoisQuery', 'hideSuggestedDomains', 'hideLogs', 'suggestedDomainArray', 'responseFields', 'disableCachedWhoisServers']
const [, , ...args] = process.argv
const cliParameters = parse(args)
let _domain = cliParameters['domain']
var domain = ''
if (!_domain) {
	let d = ''
	for (const [index, [x, y]] of Object.entries(Object.entries(cliParameters))) {
		if (!parameters.includes(x)) {
			d = x
		}
	}
	domain = d
} else {
	domain = _domain
}
const showWhoisQuery = cliParameters['showWhoisQuery'] === 'true' ? true : undefined
const hideSuggestedDomains = cliParameters['hideSuggestedDomains'] === 'true' ? true : undefined
const disableCachedWhoisServers = cliParameters['disableCachedWhoisServers'] === 'true' ? true : undefined
const hideLogs = cliParameters['hideLogs'] === 'true' ? true : undefined
const suggestedDomainArray = cliParameters['suggestedDomainArray'] ? cliParameters['suggestedDomainArray'].split(',') : undefined
const responseFields = cliParameters['responseFields'] ? cliParameters['responseFields'].split(',') : undefined

if (domain) {
	search(domain, { showWhoisQuery, hideSuggestedDomains, hideLogs, suggestedDomainArray, responseFields, disableCachedWhoisServers })
}

module.exports = require('./domainSearch.js')
