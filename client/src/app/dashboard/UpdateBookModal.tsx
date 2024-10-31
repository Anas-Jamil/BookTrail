import React, { ChangeEvent, useState, useEffect, FormEvent } from "react";
import Header from "@/app/(components)/Header";

type BookFormData = {
  id: string;
  title: string;
  author: string;
  page: number;
  status: boolean;
};

type UpdateBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (formData: BookFormData) => void;
  initialData: BookFormData; // Existing data passed in when editing
};

const UpdateBookModal = ({
  isOpen,
  onClose,
  onUpdate,
  initialData,
}: UpdateBookModalProps) => {
  // Initialize formData with default values
  const [formData, setFormData] = useState<BookFormData>({
    id: "",
    title: "",
    author: "",
    page: 0,
    status: false,
  });

  // Populate the form with initial data when the modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
    }
  }, [isOpen, initialData]);

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
    console.log("FormData before update submission:", formData);
    onUpdate(formData); // Call the onUpdate function to send data back to parent
    onClose(); // Close the modal after updating
  };

  if (!isOpen || !formData) return null; // Ensure formData is not null before rendering

  const labelCssStyles = "block text-sm font-medium text-gray-700 ";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md bg-white";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20 ">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Update Book" />
        <form onSubmit={handleSubmit} className="mt-5">
          <label htmlFor="bookTitle" className={labelCssStyles}>
            Book Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={formData.title || ""} // Default to empty string if formData.title is undefined
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
            value={formData.author || ""} // Default to empty string if formData.author is undefined
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
            value={formData.page || 0} // Default to 0 if formData.page is undefined
            className={inputCssStyles}
            required
          />

          <label htmlFor="status" className={labelCssStyles}>
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
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update Book
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookModal;
