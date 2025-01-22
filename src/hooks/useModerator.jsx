import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useModerator = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isModerator, isLoading: isModeratorLoading } = useQuery({
    queryKey: [user?.email, "isModerator"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/moderator/${user.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data?.moderator;
    },
    enabled: !!user?.email, // Prevent query if email is undefined
  });

  return [isModerator, isModeratorLoading];
};

export default useModerator;
