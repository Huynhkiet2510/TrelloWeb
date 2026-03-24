import React from 'react';
import Column from '../Column/Column';
import ColumnSkeleton from "../Skeleton/ColumnSkeletion";

const ColumnList = ({ loading, columns }) => {
    if (loading) {
        return (
            <>
                {Array.from({ length: 4 }).map((_, i) => (
                    <ColumnSkeleton key={i} />
                ))}
            </>
        );
    }

    return (
        <>
            {columns?.map((col) => (
                <div key={col.id} className="shrink-0">
                    <Column column={col} />
                </div>
            ))}
        </>
    );
};

export default ColumnList;