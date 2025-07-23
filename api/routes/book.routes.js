import express from "express";
import { Book } from "../models/Book.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Error fetching book" });
  }
});

export default router;
