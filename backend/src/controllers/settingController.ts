import { Request, Response } from "express";
import Setting from "../models/settingModel";

// Get all settings
export const getSettings = async (req: Request, res: Response) => {
  try {
    const { _page = 1, _limit = 10 } = req.query;
    const settings = await Setting.find()
      .skip((Number(_page) - 1) * Number(_limit))
      .limit(Number(_limit));
    return res.status(200).json(settings);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching settings" });
  }
};

// Get setting by ID
export const getSettingById = async (req: Request, res: Response) => {
  try {
    const setting = await Setting.findById(req.params.id);
    if (!setting) {
      return res.status(404).json({ message: "Setting not found" });
    }
    return res.status(200).json(setting);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching setting" });
  }
};

// Add new setting
export const addSetting = async (req: Request, res: Response) => {
  try {
    const { name, numericValue } = req.body;
    const newSetting = new Setting({ name, numericValue });
    const savedSetting = await newSetting.save();
    return res.status(201).json(savedSetting);
  } catch (error) {
    return res.status(500).json({ message: "Error creating setting" });
  }
};

// Update setting by ID
export const updateSetting = async (req: Request, res: Response) => {
  try {
    const updatedSetting = await Setting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSetting) {
      return res.status(404).json({ message: "Setting not found" });
    }
    return res.status(200).json(updatedSetting);
  } catch (error) {
    return res.status(500).json({ message: "Error updating setting" });
  }
};
export const deleteSetting = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedSetting = await Setting.findByIdAndDelete(id);

    if (!deletedSetting) {
      return res.status(404).json({ message: "Setting not found" });
    }

    return res.status(200).json({ message: "Setting deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting setting", error });
  }
};
