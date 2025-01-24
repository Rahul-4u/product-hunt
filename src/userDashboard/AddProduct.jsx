import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Predefined tags
  const predefinedTags = [
    "Productivity",
    "Tech",
    "Developer Tools",
    "Marketing",
    "Finance",
    "Education",
    "Health",
    "Artificial Intelligence",
    "Design Tools",
    "Internet of Things",
  ];

  // State to manage selected tags
  const [selectedTags, setSelectedTags] = useState([]);

  // Handle tag selection
  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      // Remove tag if already selected
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      // Add tag to the list (limit to 3 tags)
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
      } else {
        alert("You can select up to 3 tags only!");
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const price = form.price.value;
    const description = form.description.value;
    const websiteLink = form.websiteLink.value;

    // Validate that at least one tag is selected
    if (selectedTags.length === 0) {
      alert("Please select at least one tag.");
      return;
    }

    const productItem = {
      name,
      photo,
      price,
      description,
      ownerName: user?.displayName,
      ownerImage: user?.photoURL,
      email: user?.email,
      tags: selectedTags,
      websiteLink,
      timestamp: new Date(),
      status: "Pending",
      votes: 0,
      Featured: false,
      repot: "false",
    };

    try {
      const response = await axiosSecure.post("/product", productItem);
      if (response.data.success) {
        alert("Product added successfully!");
        form.reset();
        setSelectedTags([]);
        toast.success("your product post success");
        navigate("/my-products");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-11/12 mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-6">Add Product</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter product name"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Product Image */}
          <div>
            <label htmlFor="photo" className="block text-sm font-medium mb-1">
              Product Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="photo"
              id="photo"
              placeholder="Enter image URL"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm font-medium mb-1">
              Product price <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="price"
              placeholder="Enter price"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter product description"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-1">
              Select up to 3 Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {predefinedTags.map((tag) => (
                <label
                  key={tag}
                  className={`cursor-pointer border px-3 py-1 rounded ${
                    selectedTags.includes(tag)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                    className="hidden"
                  />
                  {tag}
                </label>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Selected Tags: {selectedTags.join(", ") || "None"}
            </p>
          </div>

          {/* External Links */}
          <div>
            <label
              htmlFor="websiteLink"
              className="block text-sm font-medium mb-1"
            >
              External Link (Website or Landing Page)
            </label>
            <input
              type="url"
              name="websiteLink"
              id="websiteLink"
              placeholder="Enter website or landing page link"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
