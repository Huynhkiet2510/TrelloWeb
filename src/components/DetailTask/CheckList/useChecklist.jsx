import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";

export const useChecklist = (taskId) => {
  const [checklists, setChecklists] = useState([]);

  useEffect(() => {
    if (!taskId) return;

    const qTitle = query(
      collection(db, "checklists"),
      where("taskId", "==", taskId),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(qTitle, (snapshot) => {
      const titles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const qItems = query(
        collection(db, "checklistItems"),
        where("taskId", "==", taskId)
      );

      const unsubscribeItems = onSnapshot(qItems, (itemSnapshot) => {
        const allItems = itemSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const merged = titles.map(title => ({
          ...title,
          items: allItems.filter(item => item.checklistId === title.id)
        }));

        setChecklists(merged);
      });

      return () => unsubscribeItems();
    });

    return () => unsubscribe();
  }, [taskId]);

  return { checklists };
};