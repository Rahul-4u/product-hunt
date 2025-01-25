import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ManageUser() {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  const handleMakeAdmin = async (user) => {
    const confirmAdmin = confirm(
      `Are you sure you want to make ${user.name} an Admin?`
    );

    if (confirmAdmin) {
      try {
        const token = localStorage.getItem("access-token");
        if (!token) {
          alert("No access token found!");
          refetch();
          return;
        }

        const res = await axiosSecure.patch(
          `/users/admin/${user._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.modifiedCount > 0) {
          refetch();
          alert(`${user.name} has been made an Admin`);
        }
      } catch (error) {
        console.error("Error making admin:", error.message);
      }
    }
  };

  const handleMakeModerator = async (user) => {
    const confirmModerator = confirm(
      `Are you sure you want to make ${user.name} a Moderator?`
    );

    if (confirmModerator) {
      try {
        const token = localStorage.getItem("access-token");
        if (!token) {
          alert("No access token found!");
          refetch();
          return;
        }

        const res = await axiosSecure.patch(
          `/users/moderator/${user._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.modifiedCount > 0) {
          refetch();
          alert(`${user.name} has been made a Moderator`);
        }
      } catch (error) {
        console.error("Error making moderator:", error.message);
      }
    }
  };

  const handleDeleteUser = async (user) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${user.name}?`
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("access-token");
        if (!token) {
          alert("No access token found!");
          return;
        }

        const res = await axiosSecure.delete(`/users/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.deletedCount > 0) {
          refetch();
          alert(`${user.name} has been deleted successfully`);
        }
      } catch (error) {
        console.error("Error deleting user:", error.message);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold bg-orange-400 mx-2 p-4 text-white">
        Manage Users ({users.length})
      </h1>
      <div>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-2 py-2">User Photo</th>
              <th className="border border-gray-300 px-4 py-2">User Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.photoURL || "https://via.placeholder.com/150"}
                    alt={user.name}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Make Admin
                    </button>
                  )}
                  {user.role !== "moderator" && user.role !== "admin" && (
                    <button
                      onClick={() => handleMakeModerator(user)}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Make Moderator
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
