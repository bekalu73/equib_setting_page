import mongoose, { Document, Schema } from "mongoose";

interface ISetting extends Document {
  name: string;
  numericValue: number;
}

const settingSchema = new Schema<ISetting>({
  name: { type: String, required: true },
  numericValue: { type: Number, required: true },
});

const Setting = mongoose.model<ISetting>("Setting", settingSchema);

export default Setting;
