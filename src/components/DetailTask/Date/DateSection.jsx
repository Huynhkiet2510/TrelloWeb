import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Clock } from "lucide-react";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const DateSection = ({ taskId, dueDate }) => {

    const handleDateChange = async (date) => {
        try {
            const taskRef = doc(db, "tasks", taskId);
            await updateDoc(taskRef, { dueDate: date.toISOString() });
        } catch (error) {
            console.error("Lỗi cập nhật ngày:", error);
        }
    };

    return (
        <div className="flex flex-col gap-2">

            <DatePicker
                selected={dueDate ? new Date(dueDate) : null}
                onChange={handleDateChange}
                customInput={
                    <button className="flex w-full items-center gap-2 bg-gray-200 p-2 rounded text-sm hover:bg-gray-300">
                        <Clock size={16} /> Date
                    </button>
                }
            />
        </div>
    );
};

export default DateSection;