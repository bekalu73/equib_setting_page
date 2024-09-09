export interface SettingRow {
  id: number;
  setting: string;
  value: string;
  isActive: boolean;
}

export interface Setting {
  _id?: string;
  name: string;
  numericValue: number;
  __v?: number;
}

export interface SettingsState {
  settings: Setting[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
