"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const settingController_1 = require("../controllers/settingController");
const router = express_1.default.Router();
router.get("/setting", settingController_1.getSettings);
router.get("/setting/:id", settingController_1.getSettingById);
router.post("/setting", settingController_1.addSetting);
router.patch("/setting/:id", settingController_1.updateSetting);
router.delete("/setting/:id", settingController_1.deleteSetting);
exports.default = router;
