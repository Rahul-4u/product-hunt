import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

export default function ReviewForm({ daynamicId }) {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  // const { displayName, photoURL, email } = user;

  const handleReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;
    const rating = form.rating.value;

    const addReview = {
      comment,
      rating,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      email: user?.email,
      daynamicId,
    };
    try {
      const response = await axiosPublic.post("/reviews", addReview);
      if (response.data.success) {
        alert("Product added successfully!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div>
      ReviewForm
      <form onSubmit={handleReview}>
        <textarea
          placeholder="Enter your review"
          className=" border-2  md:w-1/3 md:h-32"
          name="comment"
        ></textarea>
        <div>
          <label className="block my-2 text-gray-600">Rating</label>
          <select
            name="rating"
            className=" mt-4 mb-6"
            placeholder="Select your rating"
          >
            <option className=" disabled">Enter yor Rating</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <button className="btn bg-sky-600 px-4 p-2 rounded-sm">
          Review Submit
        </button>
      </form>
    </div>
  );
}
