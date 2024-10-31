import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async(
    req: Request,
    res: Response,

): Promise<void> => {
    try{
        const search = req.query.search?.toString();
        const library = await prisma.library.findMany({
            where: {
                title: {
                    contains: search
                },
            },
        })
        res.json(library);
    } catch (error) {
        res.status(500).json({message: "Error retrieving library"});
    }
};

export const createBook = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { title, author, page, status } = req.body;
  
      // Prisma will auto-generate the ID, so you don't need to include it
      const library = await prisma.library.create({
        data: {
          title,
          author,
          page,
          status,
        },
      });
  
      await prisma.$disconnect(); // Disconnect Prisma after the request
      return res.status(201).json(library);
    } catch (error) {
      console.error("Error creating book:", error); // Log the error
      await prisma.$disconnect(); // Disconnect Prisma in case of an error
      return res.status(500).json({ message: "Error creating book" });
    }
  };

  export const updateBook = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id, title, author, page, status } = req.body;
  
      // Ensure the ID is provided
      if (!id) {
        return res.status(400).json({ message: "Book ID is required" });
      }
  
      // Use Prisma to update the book in the database
      const updatedBook = await prisma.library.update({
        where: { id: id }, // No need to convert, since the ID is a string
        data: {
          title,
          author,
          page,
          status,
        },
      });
  
      await prisma.$disconnect(); // Disconnect Prisma after the request
  
      return res.status(200).json(updatedBook);
    } catch (error) {
      console.error("Error updating book:", error); // Log the error
      await prisma.$disconnect(); // Disconnect Prisma in case of an error
      return res.status(500).json({ message: "Error updating book" });
    }
  };
  

  export const deleteBook = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Book ID is required" });
      }

      const deletedBook = await prisma.library.delete({
        where: { id: id},
      });

      await prisma.$disconnect();

      return res.status(200).json(deletedBook); // Return the deleted book info
    } catch (error) {
      console.error("Error deleting book:", error); // Log the error
      await prisma.$disconnect(); // Disconnect Prisma in case of an error
      return res.status(500).json({ message: "Error deleting book" });
    }
  };