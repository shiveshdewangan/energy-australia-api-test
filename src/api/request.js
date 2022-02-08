const request = require("supertest");

const BASE_URL = "https://eacp.energyaustralia.com.au";
const PATH = "/codingtest/api/v1/festivals";

class API {
  constructor() {
    this.BASE_URL = BASE_URL;
    this.PATH = PATH;
  }

  async getResponse() {
    try {
      return await request(this.BASE_URL).get(this.PATH);
    } catch (error) {
      throw new Error("Something went wrong during GET request");
    }
  }
}

module.exports = new API();
