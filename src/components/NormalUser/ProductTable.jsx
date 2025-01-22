import React from "react";

export default function ProductTable({ product, onUpdate, onDelete }) {
  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">Product Name</th>
          <th className="border border-gray-300 px-4 py-2">Number of Votes</th>
          <th className="border border-gray-300 px-4 py-2">Status</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-gray-50">
          <td className="border border-gray-300 px-4 py-2">{product.name}</td>
          <td className="border border-gray-300 px-4 py-2">{product.votes}</td>
          <td className="border border-gray-300 px-4 py-2">{product.status}</td>
          <td className="border border-gray-300 px-4 py-2">
            <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
              Update
            </button>
            <button className="bg-red-500 text-white px-3 py-1 rounded">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
