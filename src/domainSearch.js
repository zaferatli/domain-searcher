const { whoisQuery, extractValueFromQuery, domainParser } = require('./utils')
const domainParserJSON = require('./utils/pattern.json')

const findWhoisServer = async (query, disableCachedWhoisServers) => {
	let whois = []
	if (domainParserJSON.cachedWhoisServers[query] && !disableCachedWhoisServers) {
		whois['whois'] = domainParserJSON.cachedWhoisServers[query]
	} else {
		const res = await whoisQuery({ host: 'whois.iana.org', query }) //TODO: Whois servers could be cache, whois.iana.org goes down some monday nights
		whois = await extractValueFromQuery(res, ['whois'])
	}
	return whois
}

const checkDomainAvailability = async (parsedDomain, nsServers, { responseFields, showWhoisQuery, hideLogs, disableCachedWhoisServers }) => {
	let domainResults = []
	await Promise.allSettled(
		nsServers.map(
			(nsServer, index) =>
				new Promise(async (res) => {
					let whoisServer = await findWhoisServer(nsServer, disableCachedWhoisServers)
					if (whoisServer === 'Invalid input' || whoisServer.whois === 'N/A') {
						if (!hideLogs) {
							console.log("Whois server couldn't find: " + nsServer)
						}
						res("Whois server couldn't find: " + nsServer)
					}
					let domainName = index === 0 ? parsedDomain.domain : parsedDomain.domainArr[parsedDomain.domainArr.length - 1] + '.' + nsServer
					let domainWhoisQueryResult = await whoisQuery({
						host: whoisServer.whois,
						query: domainName.toLowerCase(),
					})
					let domainStatus = await extractValueFromQuery(
						domainWhoisQueryResult,
						responseFields ? responseFields : ['domainName', 'status', 'created', 'expiry'],
						index === 0 ? parsedDomain.NS : nsServer,
						domainName,
						showWhoisQuery
					)
					domainResults.push(domainStatus)
					res(nsServer)
				})
		)
	)
	if (!hideLogs) {
		console.table(domainResults)
		console.timeEnd('Domains searched in')
	}
	return domainResults
}

const search = async (domain, options) => {
	var { hideSuggestedDomains, showWhoisQuery, hideLogs, suggestedDomainArray, responseFields, disableCachedWhoisServers } = options || {}
	if (suggestedDomainArray && suggestedDomainArray.includes(',')) {
		suggestedDomainArray = suggestedDomainArray.split(',')
	}
	if (responseFields && responseFields.includes(',')) {
		responseFields = responseFields.split(',')
	}
	if (!hideLogs) console.time('Domains searched in')
	let parsedDomain = domainParser(domain)
	if (parsedDomain) {
		let domainResult = await checkDomainAvailability(
			parsedDomain,
			hideSuggestedDomains
				? [parsedDomain.NS]
				: suggestedDomainArray
				? [parsedDomain.NS].concat(suggestedDomainArray)
				: [parsedDomain.NS, 'NET', 'ORG', 'APP', 'AI', 'CO', 'DEV', 'US', 'IT', 'ME', 'INFO', 'CLUB', 'SPACE', 'BIZ', 'PRO'].concat(
						parsedDomain.NS === 'COM' ? [] : ['COM']
				  ),
			{ responseFields, showWhoisQuery, hideLogs, disableCachedWhoisServers }
		)
		return domainResult
	} else {
		// Wrong domain
		if (!hideLogs) {
			console.timeEnd('Domains searched in')
			console.log('Opps! Wrong domain, check domain string => ' + JSON.stringify(domain))
		}
		return 'Opps! Wrong domain, check domain string => ' + JSON.stringify(domain)
	}
}

module.exports.search = search
