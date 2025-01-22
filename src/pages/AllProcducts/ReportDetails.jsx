import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function ReportDetails() {
  const { id } = useParams(); // Fetch the product ID from URL parameters
  const axiosPublic = useAxiosPublic();

  // Fetch all reports
  const { data: reports = [], isLoading: reportsLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/all-report`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  // Fetch the main product
  const { data: mainProduct = {}, isLoading: productLoading } = useQuery({
    queryKey: ["report-details", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/pending-products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Filter reports for the current product
  const filteredReports = reports.filter(
    (rep) => rep.productId === mainProduct._id
  );

  // Handle loading states
  if (reportsLoading || productLoading) {
    return (
      <div className="bg-slate-600 min-h-screen flex items-center justify-center">
        <h1 className="text-white text-2xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-slate-600 min-h-screen p-5">
      <div className="border-b-2 py-5">
        <h1 className="text-3xl text-white font-semibold">
          Report Details for Product
        </h1>
        <h2 className="text-xl text-gray-300 mt-2">
          Product Name: {mainProduct.name || "No Name Available"}
        </h2>
        <p className="text-gray-400">Product ID: {mainProduct._id}</p>
      </div>

      <div className="mt-5">
        {filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredReports.map((rep, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-5 border border-gray-300"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={rep.ownerImage || "https://via.placeholder.com/150"}
                    alt="Owner"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {rep.ownerName || "Anonymous"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {rep.email || "No Email Provided"}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <h4 className="text-gray-800 font-medium">
                    Report Text: {rep.repotext || "No Text Provided"}
                  </h4>
                  <p className="text-gray-600">
                    Description: {rep.description || "No Description Provided"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="text-white text-lg">
            No reports found for this product.
          </h2>
        )}
      </div>
    </div>
  );
}
