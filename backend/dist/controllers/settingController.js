"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSetting = exports.updateSetting = exports.addSetting = exports.getSettingById = exports.getSettings = void 0;
const settingModel_1 = __importDefault(require("../models/settingModel"));
// Get all settings
const getSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _page = 1, _limit = 10 } = req.query;
        const settings = yield settingModel_1.default.find()
            .skip((Number(_page) - 1) * Number(_limit))
            .limit(Number(_limit));
        return res.status(200).json(settings);
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching settings" });
    }
});
exports.getSettings = getSettings;
// Get setting by ID
const getSettingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const setting = yield settingModel_1.default.findById(req.params.id);
        if (!setting) {
            return res.status(404).json({ message: "Setting not found" });
        }
        return res.status(200).json(setting);
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching setting" });
    }
});
exports.getSettingById = getSettingById;
// Add new setting
const addSetting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, numericValue } = req.body;
        const newSetting = new settingModel_1.default({ name, numericValue });
        const savedSetting = yield newSetting.save();
        return res.status(201).json(savedSetting);
    }
    catch (error) {
        return res.status(500).json({ message: "Error creating setting" });
    }
});
exports.addSetting = addSetting;
// Update setting by ID
const updateSetting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedSetting = yield settingModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSetting) {
            return res.status(404).json({ message: "Setting not found" });
        }
        return res.status(200).json(updatedSetting);
    }
    catch (error) {
        return res.status(500).json({ message: "Error updating setting" });
    }
});
exports.updateSetting = updateSetting;
const deleteSetting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedSetting = yield settingModel_1.default.findByIdAndDelete(id);
        if (!deletedSetting) {
            return res.status(404).json({ message: "Setting not found" });
        }
        return res.status(200).json({ message: "Setting deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Error deleting setting", error });
    }
});
exports.deleteSetting = deleteSetting;
