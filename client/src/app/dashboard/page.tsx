"use client";
import {
  useCreateBookMutation,
  useDeleteBookMutation,
  useGetDashboardMetricsQuery,
  useUpdateBookMutation,
} from "@/state/api";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import CreateBookModal from "./CreateBookModal";
import UpdateBookModal from "./UpdateBookModal";
import DeleteBookModal from "./DeleteBookModal";
import {
  Check,
  Ellipsis,
  Library,
  PlusCircle,
  PlusCircleIcon,
  SearchIcon,
  Trash2,
  X,
} from "lucide-react";

type BookFormData = {
  id: string;
  title: string;
  author: string;
  page: number;
  status: boolean;
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookFormData | null>(null);

  const {
    data: dashboard,
    isError,
    isLoading,
  } = useGetDashboardMetricsQuery(searchTerm);
  const [createBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    await deleteBook(id);
    setSelectedBook(null);
  };

  const handleCreateBook = async (dashboard: BookFormData) => {
    await createBook(dashboard);
  };

  const handleUpdateBook = async (updatedBook: BookFormData) => {
    await updateBook(updatedBook);
    setSelectedBook(null); // Close modal after update
  };

  if (isLoading) {
    return <div className="py-4">Loading Your Books!</div>;
  }
  if (isError || !dashboard) {
    return (
      <div className="text-center text-red-500 py-4">Failed to Fetch Data</div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search Books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Books" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Add Book
        </button>
      </div>

      {/* BODY BOOKS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg-grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading..</div>
        ) : (
          dashboard?.map((library) => (
            <div
              key={library.id}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto bg-white"
            >
              <div className="flex flex-col items-center">
                <div className="flex flex-row items-end justify-between w-full">
                  <Trash2
                    color="#F28779"
                    className="p-0.5"
                    cursor="pointer"
                    onClick={() => handleDelete(library.id)}
                  ></Trash2>
                  <Ellipsis
                    className="ml-auto"
                    cursor="pointer"
                    onClick={() => setSelectedBook(library)} // Open modal with selected book data
                  ></Ellipsis>
                </div>
                <h3 className="text-center text-lg text-gray-900 font-semibold">
                  {library.title}
                </h3>
                <h2 className="text-lg text-gray-900 font-semibold">
                  {library.author}
                </h2>
                <h2 className="text-sm text-blue-500 font-semibold">
                  Page: {library.page}
                </h2>
                <h2 className="flex flex-row text-sm text-blue-500 font-semibold">
                  Finished:{" "}
                  {library.status ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <X className="w-5 h-5" />
                  )}
                </h2>
              </div>
            </div>
          ))
        )}
      </div>

      <CreateBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateBook}
      />

      <UpdateBookModal
        isOpen={!!selectedBook} // Modal opens if a book is selected
        onClose={() => setSelectedBook(null)} // Close modal and reset state
        onUpdate={handleUpdateBook} // Function to update the book
        initialData={selectedBook!} // Pass the selected book data as initialData
      />

      <DeleteBookModal
        isOpen={!!selectedBook} // Pass a boolean indicating if the modal should be open
        onClose={() => setSelectedBook(null)} // Properly reset the selected book
        onDelete={(id) => handleDelete(id)} // Ensure handleDelete receives an ID
        selectedBook={selectedBook} // Pass the book data
      />
    </div>
  );
};

export default Dashboard;
