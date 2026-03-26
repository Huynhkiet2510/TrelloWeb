import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
    collection, query, orderBy, onSnapshot, addDoc,
    doc, updateDoc, writeBatch, where, getDocs
} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setLabels } from '../stores/labelSlice';
import { useParams } from 'react-router-dom';

export const useColumnAction = () => {
    const { boardId } = useParams();
    const dispatch = useDispatch();

    const [columns, setColumns] = useState([]);
    const [newColumnTitle, setNewColumnTitle] = useState("");
    const [isAddColumnModal, setIsAddColumnModal] = useState(false);
    const [colsLoading, setColsLoading] = useState(true);


    useEffect(() => {
        if (!boardId) return;
        setColsLoading(true);

        const qColumns = query(
            collection(db, "columns"),
            where("boardId", "==", boardId),
            orderBy("order", "asc")
        );

        const qLabels = query(
            collection(db, "labels"),
            where("boardId", "==", boardId)
        );

        const unsubscribeColumns = onSnapshot(qColumns,
            (snapshot) => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setColumns(data);
                setColsLoading(false);
            },
            (err) => {
                console.error("Column Error:", err);
                setColsLoading(false);
            }
        );

        const unsubscribeLabels = onSnapshot(qLabels,
            (snapshot) => {
                const labelData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                dispatch(setLabels(labelData));
            },
            (err) => console.error("Label Error:", err)
        );

        return () => {
            unsubscribeColumns();
            unsubscribeLabels();
        };
    }, [boardId, dispatch]);

    const handleAddColumn = async (e) => {
        if (e) e.preventDefault();
        const title = newColumnTitle.trim();
        if (!title) return;

        try {
            setNewColumnTitle("");
            setIsAddColumnModal(false);

            await addDoc(collection(db, "columns"), {
                title: title,
                order: Date.now(),
                boardId: boardId,
            });
        } catch (err) {
            alert("Không thể thêm cột. Vui lòng thử lại!");
            console.error(err);
        }
    };

    const handleRemoveColumn = async (columnId) => {
        try {
            const batch = writeBatch(db);

            const tasksQuery = query(collection(db, "tasks"), where("columnId", "==", columnId));
            const taskSnapshots = await getDocs(tasksQuery);
            taskSnapshots.forEach((taskDoc) => batch.delete(taskDoc.ref));

            batch.delete(doc(db, "columns", columnId));

            await batch.commit();
        } catch (err) {
            console.error("Lỗi xóa cột:", err);
            alert("Lỗi khi xóa dữ liệu!");
        }
    };

    const handleUpdateColumnTitle = async (columnId, newTitle) => {
        if (!newTitle.trim()) return;
        try {
            await updateDoc(doc(db, "columns", columnId), { title: newTitle });
        } catch (err) {
            console.error(err);
        }
    };

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;

        try {
            await updateDoc(doc(db, "tasks", draggableId), {
                columnId: destination.droppableId,
                order: Date.now()
            });
        } catch (err) {
            console.error("Lỗi kéo thả:", err);
        }
    };

    return {
        columns,
        colsLoading,
        newColumnTitle,
        setNewColumnTitle,
        isAddColumnModal,
        setIsAddColumnModal,
        handleAddColumn,
        handleRemoveColumn,
        handleUpdateColumnTitle,
        onDragEnd
    };
};