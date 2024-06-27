import express from "express";
import { createBook, getBook, updateBook, deleteBook, getoneBook } from "../controller/book.controller.js";
const router = express.Router();

router.get("/", getBook);
router.post("/create", createBook);
router.put("/:id", updateBook);
router.delete("/", deleteBook);


export default router;