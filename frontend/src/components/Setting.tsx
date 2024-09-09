import { useEffect, useState } from "react";
import { FiChevronDown, FiEdit, FiTrash, FiSettings } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { RootState, AppDispatch } from "../Redux/store";
import {
  fetchSettings,
  deleteSetting,
  addSetting,
  updateSetting,
} from "../Redux/features/settings/settingsSlice";
import { useDispatch, useSelector } from "react-redux";

const Setting = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedSetting, setSelectedSetting] = useState<string>("");
  const [inputValue, setInputValue] = useState<number | "">("");
  const [customOption, setCustomOption] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [customOptions, setCustomOptions] = useState<string[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const settingsFetched = useSelector(
    (state: RootState) => state.settings.settings
  );
  // const fetchStatus = useSelector((state: RootState) => state.settings.status);
  // const fetchError = useSelector((state: RootState) => state.settings.error);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    const uniqueOptions = Array.from(
      new Set(settingsFetched.map((setting) => setting.name))
    );
    setCustomOptions(uniqueOptions);
  }, [settingsFetched]);

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    if (value === "Add Custom Option") {
      setSelectedSetting(value);
      setCustomOption("");
    } else {
      setSelectedSetting(value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
  };

  const handleCustomOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomOption(e.target.value);
  };

  const handleAddSetting = () => {
    if (selectedSetting === "Add Custom Option") {
      // Handle adding custom option
      if (customOption && inputValue && inputValue > 0) {
        const newSetting = {
          name: customOption,
          numericValue: Number(inputValue),
        };
        dispatch(addSetting(newSetting));
        setCustomOptions([...customOptions, customOption]);
        setSelectedSetting("");
        setCustomOption("");
        setInputValue("");
        setShowPopup(false);
      }
    } else {
      // Handle existing setting
      if (selectedSetting && inputValue && inputValue > 0) {
        const newSetting = {
          name: selectedSetting,
          numericValue: Number(inputValue),
        };

        if (isEditing && editingRowId) {
          dispatch(updateSetting({ _id: editingRowId, ...newSetting }));
          setIsEditing(false);
        } else {
          dispatch(addSetting(newSetting));
        }

        setSelectedSetting("");
        setInputValue("");
        setShowPopup(false);
      }
    }
  };

  const handleEditSetting = (id: string) => {
    const settingToEdit = settingsFetched.find((setting) => setting._id === id);
    if (settingToEdit) {
      setSelectedSetting(settingToEdit.name);
      setInputValue(settingToEdit.numericValue);
      setEditingRowId(id);
      setIsEditing(true);
      setShowPopup(true);
    }
  };

  const handleDeleteSetting = (id: string) => {
    if (id) {
      dispatch(deleteSetting(id));
    }
  };

  return (
    <div className="flex flex-col items-center p-10 min-h-screen bg-pink-50">
      <div className="w-4/5 mb-8 flex items-center">
        <FiSettings size={28} className="text-pink-600 mr-3" />
        <h1 className="text-4xl font-bold text-pink-600">Settings</h1>
      </div>
      <div className="w-4/5 mb-6 flex justify-end">
        <button
          onClick={() => setShowPopup(true)}
          className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 transition flex space-x-2 items-center justify-center"
        >
          <p className="text-x">Add</p>
          <MdAdd size={20} />
        </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-white p-8 rounded-md shadow-lg w-96 relative">
            <h2 className="text-xl font-bold text-pink-600 mb-4">
              {isEditing ? "Edit Setting" : "Add Setting"}
            </h2>
            <div className="relative mb-4">
              <label className="block text-pink-600 mb-2">Setting Type</label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-white border border-pink-300 text-gray-700 py-2 px-4 pr-10 rounded leading-tight focus:outline-none focus:border-pink-500"
                  value={selectedSetting}
                  onChange={handleDropdownChange}
                >
                  <option value="">Select a setting</option>
                  {customOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                  <option value="Add Custom Option">Add Custom Option</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <FiChevronDown className="text-pink-500" />
                </div>
              </div>
            </div>
            {selectedSetting === "Add Custom Option" && (
              <div className="mb-4">
                <label className="block text-pink-600 mb-2">
                  Custom Option
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={customOption}
                  onChange={handleCustomOptionChange}
                  placeholder="Enter custom option"
                />
              </div>
            )}
            {(selectedSetting && selectedSetting !== "Add Custom Option") ||
            selectedSetting === "Add Custom Option" ? (
              <>
                <div className="mb-4">
                  <label className="block text-pink-600 mb-2">
                    Enter Value
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter value"
                    min="1"
                  />
                </div>
              </>
            ) : null}
            <div className="flex justify-end space-x-3 mt-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSetting}
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
              >
                {isEditing ? "Save Changes" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-4/5 flex justify-center">
        <table className="table-auto border-collapse border border-pink-300 w-full text-center shadow-lg">
          <thead className="bg-pink-200">
            <tr>
              <th className="border border-pink-300 px-6 py-3 text-lg">
                Setting Type
              </th>
              <th className="border border-pink-300 px-6 py-3 text-lg">
                Value
              </th>
              <th className="border border-pink-300 px-6 py-3 text-lg">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-pink-100">
            {settingsFetched.map((setting) => (
              <tr key={setting._id}>
                <td className="border border-pink-300 px-6 py-3">
                  {setting.name}
                </td>
                <td className="border border-pink-300 px-6 py-3">
                  {setting.numericValue}
                </td>
                <td className="border border-pink-300 px-6 py-3">
                  <div className="flex justify-center space-x-4">
                    <FiEdit
                      size={22}
                      className="text-green-500 cursor-pointer"
                      onClick={() => handleEditSetting(setting._id || "")}
                    />{" "}
                    <FiTrash
                      size={22}
                      className="text-pink-500 cursor-pointer"
                      onClick={() => handleDeleteSetting(setting._id || "")}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Setting;
