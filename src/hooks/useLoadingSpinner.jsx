import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const useLoadingSpinner = (isLoading, size = 50, color = "#4B5563") => {
  const [isDelayComplete, setIsDelayComplete] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsDelayComplete(true);
    }, 3000);

    return () => clearTimeout(delay);
  }, []);

  if (isLoading || !isDelayComplete) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={size} color={color} loading={isLoading} />
        <span className="ml-3 text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  return null;
};

export default useLoadingSpinner;
