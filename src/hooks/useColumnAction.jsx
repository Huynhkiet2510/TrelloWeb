import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, doc, updateDoc, writeBatch, where, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setLabels } from '../stores/labelSlice';
import { useParams } from 'react-router-dom';

export const useColumnAction = () => {
    const [columns, setColumns] = useState([]);
    const [newColumnTitle, setNewColumnTitle] = useState("");
    const [isAddColumnModal, setIsAddColumnModal] = useState(false);
    const [board, setBoard] = useState(null);

    const { boardId } = useParams();
    const dispatch = useDispatch();


    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, "boards", boardId),
            (docSnap) => {
                if (docSnap.exists()) {
                    setBoard({ id: docSnap.id, ...docSnap.data() });
                }
            }
        );

        return () => unsubscribe();
    }, [boardId]);

    useEffect(() => {
        if (!boardId) return;
        setColumns([]);

        const qColumns = query(
            collection(db, "columns"),
            where("boardId", "==", boardId),
            orderBy("order", "asc")
        );

        const unsubscribeColumns = onSnapshot(qColumns, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setColumns(data);
        });

        const qLabels = query(
            collection(db, "labels"),
            where("boardId", "==", boardId)
        );

        const unsubscribeLabels = onSnapshot(qLabels, (snapshot) => {
            const labelData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            dispatch(setLabels(labelData));
        });

        return () => {
            unsubscribeColumns();
            unsubscribeLabels();
        };
    }, [boardId, dispatch]);


    const handleAddColumn = async (e) => {
        if (e) e.preventDefault();
        if (!newColumnTitle.trim()) return;

        setIsAddColumnModal(false);
        setNewColumnTitle("");

        try {
            await addDoc(collection(db, "columns"), {
                title: newColumnTitle,
                order: Date.now(),
                boardId: boardId,
            });
            
        } catch (error) {
            console.error("Lỗi thêm cột:", error);

        }
    };

    const handleRemoveColumn = async (columnId) => {
        if (window.confirm("Xóa cột này sẽ xóa sạch các thẻ bên trong. Chắc chắn chứ?")) {
            try {
                const batch = writeBatch(db);
                const tasksQuery = query(collection(db, "tasks"), where("columnId", "==", columnId));
                const taskSnapshots = await getDocs(tasksQuery);

                taskSnapshots.forEach((taskDoc) => batch.delete(taskDoc.ref));
                batch.delete(doc(db, "columns", columnId));

                await batch.commit();
            } catch (error) { console.error("Lỗi xóa cột:", error); }
        }
    };

    const handleUpdateColumnTitle = async (columnId, newTitle) => {
        try {
            await updateDoc(doc(db, "columns", columnId), { title: newTitle });
        } catch (error) { console.error("Lỗi cập nhật:", error); }
    };

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;

        await updateDoc(doc(db, "tasks", draggableId), {
            columnId: destination.droppableId,
            order: Date.now()
        });
    };

    return {
        board,
        columns,
        newColumnTitle,
        setNewColumnTitle,
        isAddColumnModal,
        setIsAddColumnModal,
        handleAddColumn,
        handleRemoveColumn,
        handleUpdateColumnTitle,
        onDragEnd
    };
}