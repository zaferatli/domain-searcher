const assert = require("assert");
const sinon = require("sinon");
const domainsearch = require("../index.js");
const testDomainString = "google";

describe("#domainsearch.search()", function () {
  describe("Basic domain search options", function () {
    it("returns solely domain query", async function () {
      const queryResult = await domainsearch.search(testDomainString, {
        hideLogs: true,
      });
      assert.equal(queryResult.length, 15, "Not enough domain queried");
      assert.equal(
        queryResult[0].status,
        "Active",
        "Google domains should registered"
      );
    });
    it("returns domain query without log", async function () {
      let spy = sinon.spy(console, "log");
      await domainsearch.search(testDomainString, { hideLogs: true });
      assert(spy.notCalled);
      spy.restore();
    });
    it("returns domain query with whois response", async function () {
      let spy = sinon.spy(console, "log");
      await domainsearch.search(testDomainString, {
        hideLogs: false,
        showWhoisQuery: true,
      });
      assert(spy.calledWithMatch("please contact your registrar"));
      spy.restore();
    });
    it("returns only queried domain without suggests", async function () {
      const queryResult = await domainsearch.search(testDomainString, {
        hideLogs: true,
        hideSuggestedDomains: true,
      });
      assert.equal(queryResult.length, 1, "Overflow domain queried");
      assert.equal(
        queryResult[0].status,
        "Active",
        "Google domains should registered"
      );
    });
    it("returns only queried domain with specified suggests", async function () {
      const queryResult = await domainsearch.search(testDomainString, {
        hideLogs: true,
        suggestedDomainArray: "org,club",
      });
      assert.equal(queryResult.length, 3, "Overflow domain queried");
      assert.equal(
        queryResult[0].status,
        "Active",
        "Google domains should registered"
      );
    });
    it("returns domain query with whois response", async function () {
      let spy = sinon.spy(console, "log");
      await domainsearch.search(testDomainString, {
        hideLogs: false,
        showWhoisQuery: true,
      });
      assert(spy.calledWithMatch("please contact your registrar"));
      spy.restore();
    });
    it("returns domain query with specified fields", async function () {
      const queryResult = await domainsearch.search(testDomainString, {
        hideLogs: true,
        responseFields: "Last update of whois database,status",
      });
      assert.match(
        queryResult[0]["Last update of whois database"],
        /<<</g,
        "Couldnt find last update of whois database"
      );
      assert.match(
        queryResult[0]["status"],
        /^(Active|Passive)$/g,
        "Couldnt find status field"
      );
    });
    it("returns domain query without cachedWhoisServers", async function () {
      const queryResult = await domainsearch.search(testDomainString, {
        hideLogs: true,
        disableCachedWhoisServers: true,
      });
      assert.equal(queryResult.length, 15, "Not enough domain queried");
      assert.equal(
        queryResult[0].status,
        "Active",
        "Google domains should registered"
      );
    });
  });
  describe("Override options", function () {
    it("hidelog override to showWhoisQuery", async function () {
      let spy = sinon.spy(console, "log");
      await domainsearch.search(testDomainString, {
        hideLogs: true,
        showWhoisQuery: true,
      });
      assert.equal(spy.calledWithMatch("please contact your registrar"), false);
      spy.restore();
    });
    it("hideSuggestedDomain override suggestedDomainArray", async function () {
      const queryResult = await domainsearch.search(testDomainString, {
        hideLogs: true,
        hideSuggestedDomains: true,
        suggestedDomainArray: "org,club",
      });
      assert.notEqual(queryResult.length, 3, "Overflow domain queried");
      assert.equal(queryResult.length, 1, "Overflow domain queried");
    });
  });
});

describe("#domainsearch failed scenarios", function () {
  describe("Wrong inputs", function () {
    it("wrong url message", async function () {
      const queryResult = await domainsearch.search("-?-google", {
        hideLogs: true,
      });
      assert.equal(
        queryResult,
        'Opps! Wrong domain, check domain string => "-?-google"',
        "Wrong URL error"
      );
    });
    it("strings enabled parameters instead of boolean", async function () {
      let spy = sinon.spy(console, "log");
      const queryResult = await domainsearch.search("google", {
        hideLogs: "string",
        hideSuggestedDomains: "string",
      });
      assert(spy.notCalled);
      assert.equal(queryResult.length, 1, "Overflow domain queried");
      assert.equal(
        queryResult[0].status,
        "Active",
        "Google domains should registered"
      );
      spy.restore();
    });
    it("wrong suggest domain array", async function () {
      const queryResult = await domainsearch.search(testDomainString, {
        hideLogs: true,
        suggestedDomainArray: "[org,sclub]",
      });
      assert.equal(
        queryResult.length,
        1,
        "Should be queried only for .com domain because wrong suggestedDomainArray"
      );
    });
  });
});
