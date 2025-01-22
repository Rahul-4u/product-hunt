import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://b10-a12-server-topaz.vercel.app",
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
