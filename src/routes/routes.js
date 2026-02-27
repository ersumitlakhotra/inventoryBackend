import express from "express";
import { createUsers, getAllUsers, getAllUsersById, getUserAuth, updateUsers } from "../controllers/userController.js";
import { createInventory, getAllInventory, getAllInventoryById, updateInventory } from "../controllers/inventoryController.js";
import { createEquipment, getAllEquipment, getAllEquipmentById, updateEquipment } from "../controllers/equipmentController.js";
import { createRepair, getAllRepair, getAllRepairByEquipmentId, getAllRepairById, updateRepair } from "../controllers/repairController.js";
import { getAllLogsById } from "../controllers/logsController.js";
import { createItems, getAllItems, getAllItemsById } from "../controllers/itemsController.js";

const router = express.Router();

router.get("/user/auth/:username/:password", getUserAuth);
router.get("/user/:cid", getAllUsers);
router.get("/user/:cid/:id",getAllUsersById);
router.post("/user/:cid",createUsers);
router.put("/user/:cid/:id",updateUsers);

router.get("/inventory/:cid", getAllInventory);
router.get("/inventory/:cid/:id",getAllInventoryById);
router.post("/inventory/:cid",createInventory);
router.put("/inventory/:cid/:id",updateInventory);

router.get("/equipment/:cid", getAllEquipment);
router.get("/equipment/:cid/:id",getAllEquipmentById);
router.post("/equipment/:cid",createEquipment);
router.put("/equipment/:cid/:id",updateEquipment);

router.get("/repair/:cid", getAllRepair);
router.get("/repair/:cid/:id",getAllRepairById);
router.get("/repair/equipment/:cid/:id",getAllRepairByEquipmentId);
router.post("/repair/:cid",createRepair);
router.put("/repair/:cid/:id",updateRepair);

router.post("/logs/:cid/:id",getAllLogsById);

router.get("/items/:cid", getAllItems);
router.post("/items/:cid/:id",getAllItemsById);
router.post("/items/:cid",createItems);

export default router;