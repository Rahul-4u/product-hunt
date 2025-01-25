import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

export default function ReviewForm({ daynamicId, refetch }) {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

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
        alert("Review added successfully!");
        form.reset();

        // Trigger refetch to update the review list
        refetch();
      }
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to add review. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Leave a Review</h2>
      <form onSubmit={handleReview}>
        <textarea
          placeholder="Enter your review"
          className="border-2 md:w-1/3 md:h-32 p-2"
          name="comment"
        ></textarea>
        <div>
          <label className="block my-2 text-gray-600">Rating</label>
          <select
            name="rating"
            className="mt-4 mb-6 p-2 border"
            placeholder="Select your rating"
            required
          >
            <option value="" disabled>
              Enter your Rating
            </option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <button className="btn bg-sky-600 px-4 py-2 rounded-sm text-white">
          Submit Review
        </button>
      </form>
    </div>
  );
}
