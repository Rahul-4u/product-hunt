import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

export default function MyProfile() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // const { data: mens = [], refetch } = useQuery({
  //   queryKey: ["sub"],
  //   queryFn: async () => {
  //     try {
  //       const res = await axiosPublic.get(`/all-users`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("access-token")}`,
  //         },
  //       })
  //       if (res.status === 200) {
  //         alert("Subscription status updated!");
  //         refetch(); // Automatically refresh the data
  //       }
  //     } catch (error) {
  //       console.error("Failed to update subscription:", error.message);
  //       alert("Failed to update subscription. Please try again.");
  //     }
  //   },
  // });
  const { data: mens = [], refetch } = useQuery({
    queryKey: ["sub"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/all-users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  const handlsubs = async () => {
    try {
      const res = await axiosPublic.patch(
        `/user-sub`,
        { email: user.email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      if (res.status === 200) {
        alert("Product status updated to Accepted!");
        refetch();
      }
    } catch (error) {
      console.error("Failed to update status:", error.message);
      alert("Failed to accept the product. Please try again.");
    }
  };

  const curentSubs = mens.find((item) => item?.email === user?.email);

  return (
    <div className="bg-slate-300 mx-6 p-5 min-h-screen">
      <h1 className="text-2xl font-bold text-center">My Profile</h1>
      <div className="divider"></div>
      <div className="flex items-center justify-center">
        {/* User Information */}
        <div className="text-center">
          <img
            src={user?.photoURL}
            alt="User Profile"
            className="w-32 h-32 rounded-full mx-auto border-2 border-gray-500"
          />
          <h1 className="text-xl font-semibold mt-3">{user?.displayName}</h1>
          <h1 className="text-sm text-gray-600">{user?.email}</h1>
        </div>
      </div>

      {/* Conditional Rendering for Subscription */}
      <div className="mt-10 text-center">
        <div>
          <NavLink onClick={handlsubs}>{curentSubs?.subs}</NavLink>
        </div>
      </div>
    </div>
  );
}
