import {
  GetVersion,
  SaveUser,
  GetSelectedUser,
  UpdateUser,
  DeleteUser,
  GetAllUsers
} from "../controllers/userController";
import express from "express";
const router = express.Router();

// User routes -->
router.get("/", GetVersion);
router.post("/api/Users/Save", SaveUser);
router.get("/api/Users/GetAll", GetAllUsers);
router.get("/api/Users/GetUser/:id", GetSelectedUser);
router.post("/api/Users/Update/:id", UpdateUser);
router.get("/api/Users/Delete/:id", DeleteUser);

export default router;
