import express from "express";
import {
  getSettings,
  getSettingById,
  addSetting,
  updateSetting,
  deleteSetting,
} from "../controllers/settingController";

const router = express.Router();

router.get("/setting", getSettings);
router.get("/setting/:id", getSettingById);
router.post("/setting", addSetting);
router.patch("/setting/:id", updateSetting);
router.delete("/setting/:id", deleteSetting);

export default router;
