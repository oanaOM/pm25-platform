// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ErrorAPI } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * TODO: handle the case when a non GET method request it's made
 */

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | ErrorAPI>
) {
  try {
    const response = await fetch(
      "https://pm25.lass-net.org/API-1.0.0/project/all/",
      {
        method: "GET",
        headers: {
          Accept: "text/plain",
        },
      }
    );

    const result = await response.text();
    res.status(200).json(result);
  } catch (error) {
    return res.status(402).json({
      error: {
        message: "Oops, something went wrong when retrieving data",
      },
    });
  }
}

export default handler;
