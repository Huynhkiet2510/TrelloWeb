import { useRef } from "react";
import { Paperclip } from "lucide-react";
import { useAttachment } from "../../../hooks/useAttachment";

const Attachment = ({ taskId, showList, showUpload, uploadingFile, setUploadingFile }) => {
    const { attachments, createAttachment, deleteAttachment } = useAttachment(taskId);
    const fileInputRef = useRef(null);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // BƯỚC 1: Tạo URL tạm để hiện ảnh ngay lập tức (Skeleton)
        const previewUrl = URL.createObjectURL(file);
        setUploadingFile({
            id: 'temp-id',
            fileName: file.name,
            fileUrl: previewUrl,
            fileType: file.type,
            isUploading: true
        });

        try {
            // BƯỚC 2: Chạy upload thật (mất 3-5s)
            await createAttachment(file);
            e.target.value = null;
        } catch (err) {
            alert("Upload thất bại");
        } finally {
            // BƯỚC 3: Dọn dẹp bản ghi tạm
            setUploadingFile(null);
            URL.revokeObjectURL(previewUrl); // Giải phóng bộ nhớ
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

            {showList && (
                <div className="mt-4 space-y-2">
                {uploadingFile && (
                    <div className="flex items-center gap-3 bg-gray-50 p-2 rounded border-2 border-dashed border-blue-200 animate-pulse">
                        <div className="relative">
                            <img
                                src={uploadingFile.fileUrl}
                                alt="preview"
                                className="w-14 h-14 object-cover rounded opacity-40" // Làm mờ để biết đang đợi
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-500 italic">
                                Đang tải lên: {uploadingFile.fileName}...
                            </p>
                        </div>
                    </div>
                )}

                {attachments.filter(att => att.fileName !== uploadingFile?.fileName).map((att) => (
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
            </div>
            )}

        </div>
    );
};

export default Attachment;