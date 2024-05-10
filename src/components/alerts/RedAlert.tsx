import React from "react";
import { FiAlertCircle } from "react-icons/fi";

const RedAlert: React.FC<{
  show: boolean;
  onClose: () => void;
  onProceed: () => void;
}> = ({ show, onClose, onProceed }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        show ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
      <div
        className={`bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full ${
          show ? "sm:p-8" : "sm:p-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mx-auto sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-4 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
            Delete Item
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete <span className="font-bold">Sample Item</span>?
              This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={onProceed}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Proceed
          </button>
          <button
            onClick={onClose}
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedAlert