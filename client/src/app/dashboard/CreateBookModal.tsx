import React, { ChangeEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "@/app/(components)/Header";
import { FormEvent } from "react";

type BookFormData = {
  id: string;
  title: string;
  author: string;
  page: number;
  status: boolean;
};

type CreateBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: BookFormData) => void;
};

const CreateBookModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateBookModalProps) => {
  const [formData, setFormData] = useState<BookFormData>({
    id: v4(),
    title: "",
    author: "",
    page: 0,
    status: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked // Handles checkbox
          : name === "page"
          ? parseFloat(value) // Ensures "page" is a number
          : value, // Handles other text inputs
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("FormData before submission:", formData);
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md bg-white";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Add New Book" />
        <form onSubmit={handleSubmit} className="mt-5">
          <label htmlFor="bookTitle" className={labelCssStyles}>
            Book Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="title"
            onChange={handleChange}
            value={formData.title}
            className={inputCssStyles}
            required
          />

          <label htmlFor="author" className={labelCssStyles}>
            Author
          </label>
          <input
            type="text"
            name="author"
            placeholder="Author"
            onChange={handleChange}
            value={formData.author}
            className={inputCssStyles}
            required
          />

          <label htmlFor="page" className={labelCssStyles}>
            Current Page
          </label>
          <input
            type="number"
            name="page"
            placeholder="Page"
            onChange={handleChange}
            value={formData.page}
            className={inputCssStyles}
            required
          />
          {/* <label htmlFor="status" className={labelCssStyles}>
            Read Status
          </label>
          <div className="flex flex-row">
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
          <span className="ml-2">Finished Reading</span>
          </div> */}

          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add Book
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookModal;
