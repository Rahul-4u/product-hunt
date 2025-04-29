import { useQuery } from "@tanstack/react-query";
import React from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Statistics = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch statistics data using React Query
  const { data: statis = {}, refetch } = useQuery({
    queryKey: ["admin-stat"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/admin-stat`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      const { acceptProduct, totalUser, pendingProduct, totalRevies } = statis;
      console.log("Fetched admin statistics data:", res.data); // Log fetched data
      return res.data;
    },
  });

  // Map API data to Pie Chart data format
  const chartData = [
    {
      name: "totalProduct",
      value: statis.acceptProduct || 0,
      color: "#4CAF50",
    }, // Green
    {
      name: "Pending Products",
      value: statis.totalUser || 0,
      color: "#FF9800",
    }, // Orange
    {
      name: "Total Reviews",
      value: statis.totalRevies || 0,
      color: "#2196F3",
    }, // Blue
    { name: "Total Users", value: statis.totalUser || 0, color: "#9C27B0" }, // Purple
  ];

  return (
    <div className="statistics-page p-6">
      {/* Title */}
      <h1 className="text-center text-3xl font-bold mb-8">Admin Statistics</h1>

      {/* Chart Section */}
      <div className="flex justify-center">
        <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Legend Section */}
      <div className="legend-section mt-8 text-center">
        <ul className="inline-block">
          {chartData.map((item, index) => (
            <li key={index} className="flex items-center mb-2">
              <span
                className="w-4 h-4 inline-block mr-2"
                style={{ backgroundColor: item.color }}
              ></span>
              {item.name}: {item.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Statistics;
