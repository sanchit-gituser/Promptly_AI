import ReactDOM from "react-dom";

const ConfirmModal = ({ onCancel, onConfirm,threadToDelete }) => {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[2000]">

            {/* Modal Box */}
            <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-80 shadow-xl">

                <h2 className="text-white text-lg font-semibold mb-2">
                    Delete the thread ?
                </h2>

                <h2 className="text-white text-lg font-semibold mb-2 text-center">
                     "{threadToDelete?.title}"
                </h2>

                <p className="text-gray-400 text-sm mb-6">
                    This action cannot be undone.
                </p>

                {/* Buttons */}
                <div className="flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 cursor-pointer transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-500/80 text-white hover:bg-red-500 cursor-pointer transition"
                    >
                        Delete
                    </button>

                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmModal;