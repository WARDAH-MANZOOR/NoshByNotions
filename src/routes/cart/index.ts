
import { cartController } from "../../controllers/index.js";
import { Router } from "express";

const express = Router();

express.post("/add", cartController.addItem);
express.put("/update", cartController.updateItem);
express.delete("/remove/:id", cartController.removeItem);
express.get("/", cartController.getCart);
express.delete("/clear", cartController.clearCart);

export default express;
