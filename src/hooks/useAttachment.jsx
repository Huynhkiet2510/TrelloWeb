import {
    addDoc,
    collection,
    onSnapshot,
    query,
    where,
    deleteDoc,
    doc,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';

import { useEffect, useState } from 'react';
import { db } from '../firebase';

export const useAttachment = (taskId) => {
    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        if (!taskId) return;

        const q = query(
            collection(db, "attachments"),
            where("taskId", "==", taskId),
            orderBy("createdAt", "desc")
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const results = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));

            setAttachments(results);
        });

        return () => unsub();
    }, [taskId]);

    const uploadFile = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "unsigned_upload");

            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dxw0h92na/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();

            if (!data.secure_url) {
                throw new Error("Upload failed from Cloudinary");
            }

            return {
                url: data.secure_url,
                path: data.public_id,
            };
        } catch (error) {
            console.error("Upload failed:", error);
            throw error;
        }
    };

    const createAttachment = async (file) => {
        try {
            const { url, path } = await uploadFile(file);

            const docRef = await addDoc(collection(db, "attachments"), {
                taskId,
                fileName: file.name,
                fileUrl: url,
                fileType: file.type,
                size: file.size,
                storagePath: path,
                createdAt: Date.now()
            });

            return docRef;
        } catch (error) {
            console.error("Create attachment failed:", error);
            throw error;
        }
    };

    const deleteAttachment = async (attachment) => {
        try {
            await deleteDoc(doc(db, "attachments", attachment.id));
        } catch (error) {
            console.error("Delete failed:", error);
            throw error;
        }
    };

    return {
        attachments,
        createAttachment,
        deleteAttachment
    };
};