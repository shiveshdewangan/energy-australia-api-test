const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const API = require("../api/request");
const jsonSchema = require("../data/jsonSchema");
const JSONSchema = require("../data/jsonSchema");
let response;

describe("E2E - Energy Australia Festivals", () => {
  test("should send a GET request", async () => {
    response = await API.getResponse();
    assert.isNotNull(response);
  });

  test("should check if the API network has been throttled", () => {
    if (response.statusCode === 429) {
      throw new Error("API has been throttled");
    } else {
      return;
    }
  });

  test("should return a response with HTTP status code of 200", () => {
    assert.equal(response.statusCode, 200, "HTTP Status Code is 200");
  });

  test("should have a valid headers - application/json", () => {
    assert.equal(
      response.headers["content-type"],
      "application/json; charset=utf-8",
      "Header is application/json; charset=utf-8"
    );
  });

  test("should have valid data", () => {
    const responseBody = response._body;
    responseBody.forEach(r => {
      assert.isTrue(r.hasOwnProperty("bands") === true);
    });
  });

  test("should populate cookies", () => {
    assert.isTrue(response.headers["set-cookie"] !== undefined);
  });
});
