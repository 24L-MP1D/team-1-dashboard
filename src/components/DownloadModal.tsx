import React from "react";

interface DownloadModalProps {
  onClose: () => void;
  onDownloadExcel: () => void;
  onDownloadPDF: () => void;
}

const DownloadModal: React.FC<DownloadModalProps> = ({
  onClose,
  onDownloadExcel,
  onDownloadPDF,
}) => {
  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white rounded-lg p-4">
        <h2 className="font-bold text-center">Сонгох</h2>
        <div className="flex space-x-4 mt-4">
          <button
            className="bg-blue-500 text-white px-4 p-2 rounded"
            onClick={() => {
              onDownloadExcel();
              onClose();
            }}
          >
            Excel
          </button>
          <button
            className="bg-green-500 text-white px-4 p-2 rounded"
            onClick={() => {
              onDownloadPDF();
              onClose();
            }}
          >
            PDF
          </button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
