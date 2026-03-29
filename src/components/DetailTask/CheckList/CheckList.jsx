import React, { useState } from "react";
import { X } from "lucide-react";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase";

const CheckList = ({ taskId, onClose }) => {
  const [newCheckList, setNewCheckList] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!newCheckList.trim() || loading) return;

    try {
      setLoading(true);

      await addDoc(collection(db, "checklists"), {
        taskId: taskId || null,
        title: newCheckList.trim(),
        isDone: false,
        createdAt: serverTimestamp(),
      });

      setNewCheckList(""); 
    } catch (error) {
      console.log("Lỗi khi thêm checklist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="absolute top-0 right-0 ml-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-3 animate-in fade-in zoom-in duration-150">
      
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h3 className="text-sm font-semibold text-gray-600 flex-1 text-center">
          Check List
        </h3>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      </div>

      {/* Input */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-500">CheckList</label>

        <input
          type="text"
          value={newCheckList}
          onChange={(e) => setNewCheckList(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập nội dung..."
          className="border p-2 rounded outline-none focus:border-blue-500 text-sm"
        />

        {/* Button */}
        <button
          onClick={handleAdd}
          disabled={!newCheckList.trim() || loading}
          className={`p-2 rounded text-sm font-medium transition ${
            !newCheckList.trim() || loading
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
};

export default CheckList;