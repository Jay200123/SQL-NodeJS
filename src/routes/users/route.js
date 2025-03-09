import express from "express";
import { UserController } from "./controllers.js";

const router = express.Router();

router.get("/users", UserController.getAllUsers);
router.get("/user/:id", UserController.getOneUser);
router.post("/users", UserController.createUser);
router.put("/user/edit/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

export default router;
