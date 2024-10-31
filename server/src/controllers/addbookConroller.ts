import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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