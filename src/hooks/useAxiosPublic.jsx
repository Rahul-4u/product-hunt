import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://b10-a12-server-topaz.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
