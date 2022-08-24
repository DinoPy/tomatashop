import dbConnect from "../../../lib/dbConnect.js";
import type { NextApiRequest, NextApiResponse } from "next";
import Products from "../../../models/Products.ts";

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
      const { title, price, description, image, category, rating } = req.body;
      if (!title || !price || !description || !image || !category || !rating) {
        res.status(400).json({ message: "Please provide all fields" });
      }
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

//  todo: complete implemntation of typescript in schema and model.

//  todo: add pagination
