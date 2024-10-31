type BookFormData = {
  id: string;
  title: string;
  author: string;
  page: number;
  status: boolean;
};

type DeleteBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (bookId: string) => void;
  selectedBook: BookFormData | null;
};

const DeleteBookModal = ({
  isOpen,
  onClose,
  onDelete,
  selectedBook,
}: DeleteBookModalProps) => {
  const handleDelete = () => {
    if (selectedBook) {
      onDelete(selectedBook.id);
      onClose();
    }
  };

  if (!isOpen || !selectedBook) return null;

  return null;
};

export default DeleteBookModal;
