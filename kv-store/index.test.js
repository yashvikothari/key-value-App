const request = require("supertest");
const app = require("../app"); // Adjust the path according to your app's structure

describe("Key-Value Store API Tests", () => {
  it("Set Key-Value Pairs", async () => {
    let keyValues = [
      { key: "abc-1", value: "value1 for abc-1 added by yashviapp" },
      { key: "abc-2", value: "value2 for abc-2 added by yashviapp" },
      { key: "xyz-1", value: "value3 for xyz-1 added by yashviapp" },
      { key: "xyz-2", value: "value4 for xyz-2 added by yashviapp" },
    ];

    for (const kv of keyValues) {
      const response = await request(app).post("/set").send(kv).expect(200);
      expect(response.text).toEqual("Key-Value pair added successfully");
    }
  });

  it("Retrieve Set Values", async () => {
    let tests = [
      { key: "abc-1", expectedValue: "value1 for abc-1 added by yashviapp" },
      { key: "xyz-2", expectedValue: "value4 for xyz-2 added by yashviapp" },
    ];

    for (const test of tests) {
      const response = await request(app).get(`/get/${test.key}`).expect(200);
      expect(response.body).toEqual({ [test.key]: test.expectedValue });
    }
  });

  it("Search by Prefix and Suffix", async () => {
    const prefixResponse = await request(app)
      .get(`/search?prefix=abc`)
      .expect(200);
    expect(prefixResponse.body).toEqual({
      "abc-1": "value1 for abc-1 added by yashviapp",
      "abc-2": "value2 for abc-2 added by yashviapp",
    });

    const suffixResponse = await request(app)
      .get(`/search?suffix=-1`)
      .expect(200);
    expect(suffixResponse.body).toEqual({
      "abc-1": "value1 for abc-1 added by yashviapp",
      "xyz-1": "value3 for xyz-1 added by yashviapp",
    });
  });
});
