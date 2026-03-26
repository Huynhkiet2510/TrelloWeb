import { useRef } from "react";
import { Paperclip } from "lucide-react";
import { useAttachment } from "../../../hooks/useAttachment";

const Attachment = ({ taskId, showList, showUpload }) => {
    const { attachments, createAttachment, deleteAttachment } = useAttachment(taskId);

    const fileInputRef = useRef(null);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            await createAttachment(file);
            e.target.value = null;
        } catch (err) {
            console.error(err);
            alert("Upload thất bại");
        }
    };

    return (
        <div>
            {showUpload && (<>
                <button
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center w-full gap-2 p-2 rounded text-sm transition bg-gray-200 hover:bg-gray-300"
                >
                    <Paperclip size={16} /> Add attachment
                </button>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    className="hidden"
                />
            </>)}

            {showList && (<div className="mt-4 space-y-2">
                {attachments.map((att) => (
                    <div key={att.id} className="flex items-center gap-3 bg-gray-100 p-2 rounded">

                        {att.fileType.startsWith("image/") ? (
                            <img
                                src={att.fileUrl}
                                alt=""
                                className="w-14 h-14 object-cover rounded"
                            />
                        ) : (
                            <div className="w-14 h-14 flex items-center justify-center bg-gray-300 rounded">
                                <Paperclip size={16} />
                            </div>
                        )}

                        <div className="flex-1">
                            <a
                                href={att.fileUrl}
                                target="_blank"
                                className="text-sm font-medium text-blue-600"
                            >
                                {att.fileName}
                            </a>
                        </div>

                        <button
                            onClick={() => deleteAttachment(att)}
                            className="text-red-500 text-sm"
                        >
                            Xóa
                        </button>
                    </div>
                ))}
            </div>)}

        </div>
    );
};

export default Attachment;