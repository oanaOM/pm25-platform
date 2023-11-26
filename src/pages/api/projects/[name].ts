// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mockProjectDetails } from "@/utils/conts";
import { ErrorAPI, Project } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project | ErrorAPI>
) {
  const { name } = req.query;
  try {
    const response = await fetch(
      `https://pm25.lass-net.org/API-1.0.0/project/${name}/latest/`,
      {
        method: "GET",
      }
    );

    // const result = await response.json();

    return res.status(200).json(mockProjectDetails);
  } catch (error) {
    console.error("Error:", error);
    return res.status(402).json({
      error: {
        message: "Oops, something went wrong when retrieving data",
      },
    });
  }
}

export default handler;
