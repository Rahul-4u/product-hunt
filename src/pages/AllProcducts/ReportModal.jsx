import React, { useState } from "react";

const ReportModal = ({ isOpen, onClose, onSubmit }) => {
  const [reportReason, setReportReason] = useState("");

  const handleSubmit = () => {
    if (!reportReason.trim()) {
      alert("Please enter a reason for reporting.");
      return;
    }
    onSubmit(reportReason); // Pass the reason back to the parent
    setReportReason(""); // Clear the input
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Report Product</h3>
        <textarea
          className="w-full border border-gray-300 rounded p-2 mb-4"
          rows="5"
          placeholder="Enter your reason for reporting..."
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
