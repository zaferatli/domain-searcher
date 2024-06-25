const domainParser = require("./pattern.json");

const allReplaceWithArrayFunc = async (str, obj) => {
  return new Promise((resolve, reject) => {
    for (const [index, [x, y]] of Object.entries(Object.entries(obj))) {
      y.map((pattern) => {
        str = str.replaceAll(pattern, x);
      });
      if (Number(index) === Object.entries(obj).length - 1) {
        resolve(str);
      }
    }
  });
};

const setValueWithArrayFunc = async (str, array, modifiedText) => {
  return new Promise((resolve, reject) => {
    array.map((obj, index) => {
      if (str.includes(obj)) {
        str = modifiedText;
      }
      if (Number(index) === array.length - 1) {
        resolve(str);
      }
    });
  });
};

const parserWhoisQuery = async (whoisQuery, TLD) => {
  let fields = domainParser.domain;
  return await allReplaceWithArrayFunc(whoisQuery, fields);
};

const parserWhoisQueryResult = async (
  whoisQuery,
  TLD,
  resArray,
  domain,
  showWhoisQuery
) => {
  if (resArray.domainName === "N/A") {
    resArray.domainName = domain.toLowerCase();
  }
  if (resArray.domainName) {
    resArray.domainName = resArray.domainName.toLowerCase();
  }
  if (resArray.status) {
    resArray.status = await setValueWithArrayFunc(
      resArray.status,
      domainParser.statusActiveKeywords,
      "Active"
    );
    resArray.status = await setValueWithArrayFunc(
      resArray.status,
      domainParser.statusPassiveKeywords,
      "Passive"
    );
  }
  if (showWhoisQuery) {
    resArray.whoisQuery = JSON.stringify(whoisQuery, null, 2);
  }

  return resArray;
};

module.exports.parserWhoisQuery = parserWhoisQuery;
module.exports.parserWhoisQueryResult = parserWhoisQueryResult;
