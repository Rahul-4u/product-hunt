import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data?.admin;
    },
    enabled: !!user?.email, // Prevent query if email is undefined
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
