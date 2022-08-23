import dbConnect from "../../../lib/dbConnect.js";
import type { NextApiRequest, NextApiResponse } from "next";
import Products from "../../../models/Products.js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      res.status(200).json({
        message: "Get all products",
        products: await Products.find(),
      });
      break;
    case "POST":
      res.status(200).json({
        message: "Create new product",
        product: await Products.create(req.body),
      });
      break;
    default:
      res.status(405).json({
        message: "Method not allowed",
      });
      break;
  }
}
