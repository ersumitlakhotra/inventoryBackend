import express from "express";
import { getAllUsers, getUserAuth } from "../controllers/userController.js";

const router = express.Router();

router.get("/user/auth/:username/:password", getUserAuth);
router.get("/user/:cid", getAllUsers);

export default router;