"use client";

import React, { useState } from "react";
import { useCreateBookMutation } from "@/state/api"; // Adjust the import to point to your API
import Modal from "./AddBook";

const AddBookPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    page: 0,
    status: false,
  });
  const [showModal, setShowModal] = useState(false); // For handling modal visibility
  const [createBook] = useCreateBookMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "page" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBook(formData);
      setShowModal(true); // Show modal after successful submission
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
        <div className="w-full bg-blue-200 p-6">
          <h1 className="text-3xl font-semibold text-center">BookTrail</h1>
          <p className="mt-4 text-center text-sm">
            Welcome to BookTrail, an app created to help readers keep track of
            their books! Start by adding a book.
          </p>
        </div>

        {/* Add Book Form */}
        <form onSubmit={handleSubmit} className="p-4">
          <h1 className="text-3xl font-semibold mb-4">Add Books</h1>

          <div className="w-full mb-4 px-4">
            <label className="font-semibold mb-1 text-lg">Book Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full py-3 px-4 rounded-lg border-2 bg-white border-gray-300 focus:outline-none focus:border-blue-500 transition"
              placeholder="Book Title..."
              required
            />
          </div>

          <div className="w-full mb-4 px-4">
            <label className="font-semibold mb-1 text-lg">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full py-3 px-4 rounded-lg border-2 bg-white border-gray-300 focus:outline-none focus:border-blue-500 transition"
              placeholder="Author..."
              required
            />
          </div>

          <div className="w-full mb-4 px-4">
            <label className="font-semibold mb-1 text-lg">Page Number</label>
            <input
              type="number"
              name="page"
              value={formData.page}
              onChange={handleChange}
              className="w-full py-3 px-4 rounded-lg border-2 bg-white border-gray-300 focus:outline-none focus:border-blue-500 transition"
              placeholder="Page Number..."
              required
            />
          </div>

          <div className="mb-4 px-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Book Added Successfully"
          content="Your book has been successfully added to the library!"
        />
      </div>
    </div>
  );
};

export default AddBookPage;
