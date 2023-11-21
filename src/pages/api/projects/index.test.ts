import { describe, expect, it, jest } from "@jest/globals";
import { RequestMethod, createMocks } from "node-mocks-http";
import handler from "../projects/index";
import { NextApiRequest, NextApiResponse } from "next";

describe("GET /api/projects", () => {
  it("returns a list of projects", async () => {
    function mockRequestResponse(method: RequestMethod = "GET") {
      const { req, res }: { req: NextApiRequest; res: NextApiResponse } =
        createMocks({ method });
      return { req, res };
    }

    const { req, res } = mockRequestResponse();

    await handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.statusMessage).toBe("OK");
  });
});
