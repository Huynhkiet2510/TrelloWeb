import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';

export const useLabelAction = (task) => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [labelTitle, setLabelTitle] = useState("");
    const [labelColor, setLabelColor] = useState("#3b82f6");
    const [editingLabelId, setEditingLabelId] = useState(null);

    const { boardId } = useParams();

    const allLabels = useSelector((state) => state.label.items);
    const currentTaskLabelIds = task.labels || [];

    const resetForm = () => {
        setIsEditorOpen(false);
        setEditingLabelId(null);
        setLabelTitle("");
        setLabelColor("#3b82f6");
    };

    const handleSaveLabel = async () => {
        if (!labelTitle.trim()) return;

        const labelData = {
            boardId: boardId,
            text: labelTitle.trim(),
            color: labelColor,
            updatedAt: Date.now()
        };

        try {
            if (editingLabelId) {
                const labelRef = doc(db, "labels", editingLabelId);
                await updateDoc(labelRef, {
                    text: labelTitle.trim(),
                    color: labelColor,
                });
            } else {
                await addDoc(collection(db, "labels"), {
                    ...labelData,
                    createdAt: Date.now()
                });
            }
            resetForm();
        } catch (error) {
            console.error("Failed to save label:", error);
            alert("Đã xảy ra lỗi khi lưu nhãn!");
        }
    };

    const handleEditClick = (label) => {
        setIsEditorOpen(true);
        setEditingLabelId(label.id);
        setLabelColor(label.color);
        setLabelTitle(label.text);
    };

    const handleRemove = async (labelId) => {
        try {
            await deleteDoc(doc(db, "labels", labelId));
        } catch (error) {
            console.error("Failed to delete label:", error);
        }
    };
    return {
        handleEditClick, handleRemove, handleSaveLabel, resetForm, editingLabelId, labelTitle, setLabelTitle, labelColor, setLabelColor,
        isEditorOpen, allLabels, currentTaskLabelIds, setIsEditorOpen
    }
}
