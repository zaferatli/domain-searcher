const net = require("net");
const punycode = require("punycode/");
const https = require("https");
const { parserWhoisQuery, parserWhoisQueryResult } = require("./parser");

const requestGetBody = (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => (data += chunk));
        resp.on("end", () => resolve(data));
        resp.on("error", reject);
      })
      .on("error", reject);
  });
};

const domainParser = (domain) => {
  if (domain.endsWith(".")) {
    domain = domain.reverse().shift();
  }
  if (!domain.includes(".")) {
    domain = domain + ".com";
  }
  const labels = punycode.toASCII(domain).split(".").reverse();
  const labelTest =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

  let domainStatus = labelTest.test(domain);
  if (domainStatus) {
    return {
      NS: labels[0].toUpperCase(),
      domain: domain,
      domainPunnyCode: punycode.toASCII(domain),
      domainArr: labels,
    };
  } else {
    return domainStatus;
  }
};

const whoisQuery = ({
  host = null,
  port = 43,
  timeout = 15000,
  query = "",
  querySuffix = "\r\n",
} = {}) => {
  return new Promise((resolve, reject) => {
    let data = "";
    const socket = net.connect({ host, port }, () =>
      socket.write(query + querySuffix)
    );
    socket.setTimeout(timeout);
    socket.on("data", (chunk) => (data += chunk));
    socket.on("close", (hadError) => resolve(data));
    socket.on("timeout", () => socket.destroy(new Error("Timeout")));
    socket.on("error", (err) => {
      resolve("Error");
    });
  });
};

const extractValueFromQuery = async (
  whoisQueryResult,
  values,
  domainType,
  domain,
  showWhoisQuery
) => {
  var resArray = [];
  if (domainType) {
    whoisQueryResult = await parserWhoisQuery(whoisQueryResult, domainType);
  }
  await Promise.all(
    values.map(
      (value) =>
        new Promise(async (res) => {
          const whoisPattern = new RegExp(`${value}\\.*:\\s*(.+)$`, "im");
          const match = whoisPattern.exec(whoisQueryResult);
          const whois = match ? match[1] : "N/A";
          resArray[value] = whois;
          res(value);
        })
    )
  );
  resArray = await parserWhoisQueryResult(
    whoisQueryResult,
    domainType,
    resArray,
    domain,
    showWhoisQuery
  );
  return resArray;
};

module.exports.requestGetBody = requestGetBody;
module.exports.domainParser = domainParser;
module.exports.whoisQuery = whoisQuery;
module.exports.extractValueFromQuery = extractValueFromQuery;
