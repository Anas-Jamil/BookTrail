# BookTrail

BookTrail is a full-stack web application for managing personal book collections. It provides users with an interactive, organized way to keep track of the books they've read or plan to read. Originally developed as a Python-based library management system, BookTrail has evolved into a comprehensive web application with robust backend support, real-time data updates, and a responsive user interface.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **CRUD Operations**: Users can add, view, update, and delete books from their personal collection.
- **Personalized Book Management**: Track and categorize books as read, currently reading, or to-read.
- **Search Functionality**: Search for books within the user's collection by title or author.
- **Responsive Design**: Built with mobile-first design principles, ensuring accessibility across devices.
- **Cloud Storage and Deployment**: Temporarily deployed on AWS, utilizing EC2 for application hosting, RDS for database storage, and S3 for asset storage during the learning phase.

## Technology Stack

### Frontend
- **Next.js**: Used for server-side rendering and optimized performance.
- **TypeScript**: Adds type safety to JavaScript for better error handling and readability.
- **Tailwind CSS**: For modern, responsive styling.
- **Material UI**: Used for component library and DataGrid for efficient data handling.

### Backend
- **Node.js with Express**: Provides a scalable backend API.
- **PostgreSQL**: Manages user and book data.

## Project Structure

This project follows a modular directory structure for code organization and maintainability:

```plaintext
BookTrail/
│
├── src/
│   ├── client/           # Frontend code (Next.js)
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Next.js pages and routing
│   │   ├── styles/       # Tailwind CSS and global styles
│   │   └── redux/        # Redux Toolkit state management
│   │
│   ├── server/           # Backend code (Node.js with Express)
│   │   ├── controllers/  # API route controllers
│   │   ├── models/       # Database models and schema definitions
│   │   ├── routes/       # Express route definitions
│   │   └── services/     # Helper services and utility functions
│
├── config/               # Database and server configuration files
├── .env                  # Environment variables
├── README.md             # Documentation file
└── package.json          # Project dependencies and scripts
```

## Setup and Installation

To get started with BookTrail, follow these steps:

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/download/) (v14.x or later)
- [PostgreSQL](https://www.postgresql.org/download/) (v12.x or later)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Anas-Jamil/BookTrail.git
   cd BookTrail
   ```

2. **Install dependencies**:
   - Install backend dependencies:
     ```bash
     cd src/server
     npm install
     ```
   - Install frontend dependencies:
     ```bash
     cd ../client
     npm install
     ```

3. **Set up environment variables**:
   - Create a `.env` file in the `src/server` directory with the following variables:
     ```env
     DATABASE_URL=your_database_url
     ```
   - Update these values with your actual credentials.

4. **Set up the database**:
   - Create a PostgreSQL database for BookTrail.
   - Use an ORM tool or SQL scripts to initialize the tables according to your models.

5. **Run the app locally**:
   - Start the backend server:
     ```bash
     cd src/server
     npm start
     ```
   - Start the frontend client:
     ```bash
     cd ../client
     npm run dev
     ```

6. **View in Browser**: The application will be available at `http://localhost:3000`.

## Usage

1. **Add Books**: Go to the dashboard and add new books with details like title, author, and status.
2. **View and Edit**: Access your personal library, search for books, and edit details as needed.
3. **Delete**: Remove books from your collection to keep it organized.

## Future Enhancements

Here are a few planned improvements for BookTrail:
- **Enhanced Filtering and Sorting**: Additional ways to filter and sort books by genre, rating, or publication date.
- **Social Sharing**: Allow users to share their reading list with friends or followers.
- **Book Recommendations**: Integrate an API for suggesting similar books.
- **Progress Tracking**: A feature to track progress in currently reading books.

## Contributing

If you would like to contribute to BookTrail, feel free to fork the repository, make changes, and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
